import { useEffect, useRef, useState } from 'react';
import { Player } from '../game/entities/Player';
import { Enemy } from '../game/entities/Enemy';
import { Goblin } from '../game/entities/Goblin';
import { Slime } from '../game/entities/Slime';
import { Skeleton } from '../game/entities/Skeleton';
import { Wand } from '../game/weapons/Wand';
import { Projectile } from '../game/entities/Projectile';
import { Particle } from '../game/entities/Particle';
import { rand, dist2 } from '../game/utils/helpers';

interface Scene {
  w: number;
  h: number;
  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  fx: Particle[];
  spawnTimer: number;
  wave: number;
  score: number;
  mouse: { x: number; y: number };
}

interface GameProps {
  onScoreChange: (score: number) => void;
  onWaveChange: (wave: number) => void;
  onWeaponChange: (weaponName: string) => void;
  onExperienceChange: (level: number, experience: number, experienceToNextLevel: number) => void;
}

export const Game = ({ onScoreChange, onWaveChange, onWeaponChange, onExperienceChange }: GameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number | undefined>(undefined);

  const [canvasSize] = useState({ width: 960, height: 540 });

  const spawnWave = (scene: Scene, n: number) => {
    for (let i = 0; i < n; i++) {
      const edge = Math.floor(rand(0, 4));
      let x = 0;
      let y = 0;

      if (edge === 0) {
        x = rand(0, scene.w);
        y = -20;
      } else if (edge === 1) {
        x = scene.w + 20;
        y = rand(0, scene.h);
      } else if (edge === 2) {
        x = rand(0, scene.w);
        y = scene.h + 20;
      } else {
        x = -20;
        y = rand(0, scene.h);
      }

      // Spawn a variety of enemy types
      const randVal = Math.random();
      let enemy;
      if (randVal < 0.4) {
        enemy = new Goblin(x, y); // Fast chasers (40%)
      } else if (randVal < 0.7) {
        enemy = new Slime(x, y);  // Slow wanderers (30%)
      } else {
        enemy = new Skeleton(x, y); // Ranged attackers (30%)
      }
      scene.enemies.push(enemy);
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#1c2250';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize scene
    const weapon = new Wand();
    const player = new Player(canvasSize.width / 2, canvasSize.height / 2, weapon);
    weapon.owner = player;

    const scene: Scene = {
      w: canvasSize.width,
      h: canvasSize.height,
      player,
      enemies: [],
      projectiles: [],
      fx: [],
      spawnTimer: 0,
      wave: 1,
      score: 0,
      mouse: { x: canvasSize.width / 2, y: canvasSize.height / 2 },
    };

    sceneRef.current = scene;
    onWeaponChange(player.weapon.name);
    onExperienceChange(player.level, player.experience, player.experienceToNextLevel);
    spawnWave(scene, 6);

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      scene.mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      scene.mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Game loop
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // Input-driven attack
      if (keysRef.current.has(' ') || keysRef.current.has('Space')) {
        scene.player.attack(scene);
      }

      // Update entities
      scene.player.update(dt, scene, keysRef.current);
      scene.enemies.forEach((e) => e.update(dt, scene));
      scene.projectiles.forEach((p) => p.update(dt));
      scene.fx.forEach((p) => p.update(dt));

      // Collisions: player projectiles vs enemies
      for (const p of scene.projectiles) {
        if (p.dead || p.isEnemyProjectile) continue;
        for (const e of scene.enemies) {
          if (e.dead) continue;
          const r = 18;
          if (dist2(p.x, p.y, e.x, e.y) < r * r) {
            e.takeDamage(p.damage);
            p.dead = true;

            // Particles on hit
            for (let i = 0; i < 10; i++) {
              scene.fx.push(
                new Particle(e.x, e.y, rand(-120, 120), rand(-120, 120), rand(0.15, 0.4), rand(1, 2))
              );
            }

            if (e.dead) {
              scene.score += 10;
              onScoreChange(scene.score);

              // Gain experience from kill
              const xpGain = 25;
              const leveledUp = scene.player.gainExperience(xpGain);
              onExperienceChange(scene.player.level, scene.player.experience, scene.player.experienceToNextLevel);

              if (leveledUp) {
                // Level up particles
                for (let i = 0; i < 30; i++) {
                  scene.fx.push(
                    new Particle(scene.player.x, scene.player.y, rand(-200, 200), rand(-200, 200), rand(0.3, 0.6), rand(2, 4))
                  );
                }
              }
            }
            break;
          }
        }
      }

      // Collisions: enemy projectiles vs player
      for (const p of scene.projectiles) {
        if (p.dead || !p.isEnemyProjectile) continue;
        const r = 16;
        if (dist2(p.x, p.y, scene.player.x, scene.player.y) < r * r) {
          scene.player.takeDamage(p.damage);
          p.dead = true;

          // Particles on hit
          for (let i = 0; i < 8; i++) {
            scene.fx.push(
              new Particle(scene.player.x, scene.player.y, rand(-100, 100), rand(-100, 100), rand(0.15, 0.3), rand(1, 2))
            );
          }
          break;
        }
      }

      // Enemies touch player
      for (const e of scene.enemies) {
        if (e.dead) continue;
        if (dist2(e.x, e.y, scene.player.x, scene.player.y) < 26 * 26) {
          scene.player.takeDamage(15 * dt);
        }
      }

      // Cleanup
      scene.enemies = scene.enemies.filter((e) => !e.dead);
      scene.projectiles = scene.projectiles.filter((p) => !p.dead);
      scene.fx = scene.fx.filter((p) => !p.dead);

      // Wave spawning
      if (scene.enemies.length === 0) {
        scene.wave++;
        spawnWave(scene, 6 + Math.floor(scene.wave * 1.5));
        onWaveChange(scene.wave);
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height);

      scene.fx.forEach((p) => p.draw(ctx));
      scene.projectiles.forEach((p) => p.draw(ctx));
      scene.enemies.forEach((e) => e.draw(ctx));
      scene.player.draw(ctx);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasSize, onScoreChange, onWaveChange, onWeaponChange, onExperienceChange]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        background: 'linear-gradient(180deg, #121639, #0c0f2a)',
        border: '1px solid #2a2f63',
        borderRadius: '12px',
        display: 'block',
        margin: '8px 0',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
      }}
    />
  );
};
