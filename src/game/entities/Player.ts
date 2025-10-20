import { Character } from './Character';
import type { Weapon } from '../weapons/Weapon';
import { clamp, dist2, rand } from '../utils/helpers';
import type { Scene } from '../types';
import { Particle } from './Particle';

export class Player extends Character {
  weapon: Weapon; // Primary ranged weapon
  meleeWeapon: Weapon; // Secondary melee weapon
  accel: number;
  friction: number;
  maxMove: number;
  experience: number;
  experienceToNextLevel: number;
  level: number;
  facingDirection: number; // 1 for right, -1 for left
  isShielding: boolean; // Whether shield is active
  shieldReduction: number; // Damage reduction percentage when shielding
  ultimateCooldown: number; // Cooldown timer for ultimate ability
  ultimateMaxCooldown: number; // Max cooldown time
  ultimateRange: number; // Range in pixels (200cm = 200 pixels)
  smallAoeCooldown: number; // Cooldown timer for small AoE
  smallAoeMaxCooldown: number; // Max cooldown time for small AoE
  smallAoeRange: number; // Range in pixels (4cm = 40 pixels)

  constructor(x: number, y: number, weapon: Weapon, meleeWeapon: Weapon) {
    super(x, y);
    this.weapon = weapon;
    this.meleeWeapon = meleeWeapon;
    this.accel = 900;
    this.friction = 8;
    this.maxMove = this.speed;
    this.experience = 0;
    this.experienceToNextLevel = 100;
    this.level = 1;
    this.facingDirection = 1; // Start facing right
    this.isShielding = false;
    this.shieldReduction = 0.7; // Reduce damage by 70% when shielding
    this.ultimateCooldown = 0;
    this.ultimateMaxCooldown = 5; // 5 seconds cooldown
    this.ultimateRange = 200; // 200 pixels = 200cm
    this.smallAoeCooldown = 0;
    this.smallAoeMaxCooldown = 1.5; // 1.5 seconds cooldown
    this.smallAoeRange = 40; // 40 pixels = 4cm
  }

  gainExperience(amount: number): boolean {
    this.experience += amount;
    if (this.experience >= this.experienceToNextLevel) {
      this.levelUp();
      return true;
    }
    return false;
  }

  levelUp(): void {
    this.level++;
    this.experience = 0;
    this.experienceToNextLevel = Math.floor(this.experienceToNextLevel * 1.5);

    // Stat boosts on level up
    this.maxHp += 20;
    this._hp = this.maxHp; // Full heal on level up
    this.speed += 5;
    this.maxMove = this.speed;
  }

  getExperienceProgress(): number {
    return this.experience / this.experienceToNextLevel;
  }

  handleInput(keys: Set<string>, dt: number): void {
    let ax = 0;
    let ay = 0;

    if (keys.has('ArrowLeft') || keys.has('a')) ax -= 1;
    if (keys.has('ArrowRight') || keys.has('d')) ax += 1;
    if (keys.has('ArrowUp') || keys.has('w')) ay -= 1;
    if (keys.has('ArrowDown') || keys.has('s')) ay += 1;

    const len = Math.hypot(ax, ay) || 1;
    ax /= len;
    ay /= len;

    this.vx += ax * this.accel * dt;
    this.vy += ay * this.accel * dt;

    // Update facing direction based on horizontal movement
    if (ax < 0) {
      this.facingDirection = -1; // Moving left
    } else if (ax > 0) {
      this.facingDirection = 1; // Moving right
    }

    // Clamp speed
    const sp = Math.hypot(this.vx, this.vy);
    if (sp > this.maxMove) {
      this.vx = (this.vx / sp) * this.maxMove;
      this.vy = (this.vy / sp) * this.maxMove;
    }
  }

  update(dt: number, scene: Scene, keys: Set<string>): void {
    this.handleInput(keys, dt);

    // Friction
    this.vx -= this.vx * this.friction * dt;
    this.vy -= this.vy * this.friction * dt;

    // World bounds
    super.update(dt);
    this.x = clamp(this.x, 16, scene.w - 16);
    this.y = clamp(this.y, 16, scene.h - 16);

    this.weapon.update(dt);
    this.meleeWeapon.update(dt);

    // Update ultimate cooldown
    if (this.ultimateCooldown > 0) {
      this.ultimateCooldown -= dt;
    }

    // Update small AoE cooldown
    if (this.smallAoeCooldown > 0) {
      this.smallAoeCooldown -= dt;
    }
  }

  attack(scene: Scene): void {
    this.weapon.tryAttack(scene);
  }

  meleeAttack(scene: Scene): void {
    this.meleeWeapon.tryAttack(scene);
  }

  smallAoeAttack(scene: Scene): void {
    // Check if small AoE is on cooldown
    if (this.smallAoeCooldown > 0) return;

    // Set cooldown
    this.smallAoeCooldown = this.smallAoeMaxCooldown;

    // Create small explosion of particles
    for (let i = 0; i < 30; i++) {
      scene.fx.push(
        new Particle(
          this.x,
          this.y,
          rand(-200, 200),
          rand(-200, 200),
          rand(0.3, 0.5),
          rand(2, 4)
        )
      );
    }

    // Damage all enemies in small range
    scene.enemies.forEach((enemy) => {
      if (enemy.dead) return;
      const distance = Math.sqrt(dist2(this.x, this.y, enemy.x, enemy.y));
      if (distance <= this.smallAoeRange) {
        enemy.takeDamage(9999); // Instant kill

        // Extra particles for killed enemies
        for (let i = 0; i < 15; i++) {
          scene.fx.push(
            new Particle(
              enemy.x,
              enemy.y,
              rand(-150, 150),
              rand(-150, 150),
              rand(0.2, 0.4),
              rand(2, 3)
            )
          );
        }
      }
    });
  }

  ultimateAttack(scene: Scene): void {
    // Check if ultimate is on cooldown
    if (this.ultimateCooldown > 0) return;

    // Set cooldown
    this.ultimateCooldown = this.ultimateMaxCooldown;

    // Create massive explosion of particles
    for (let i = 0; i < 80; i++) {
      scene.fx.push(
        new Particle(
          this.x,
          this.y,
          rand(-400, 400),
          rand(-400, 400),
          rand(0.4, 0.8),
          rand(3, 6)
        )
      );
    }

    // Damage all enemies in range
    scene.enemies.forEach((enemy) => {
      if (enemy.dead) return;
      const distance = Math.sqrt(dist2(this.x, this.y, enemy.x, enemy.y));
      if (distance <= this.ultimateRange) {
        enemy.takeDamage(9999); // Instant kill

        // Extra particles for killed enemies
        for (let i = 0; i < 20; i++) {
          scene.fx.push(
            new Particle(
              enemy.x,
              enemy.y,
              rand(-200, 200),
              rand(-200, 200),
              rand(0.3, 0.6),
              rand(2, 4)
            )
          );
        }
      }
    });
  }

  takeDamage(amount: number): void {
    // Reduce damage if shield is active
    if (this.isShielding) {
      amount *= (1 - this.shieldReduction);
    }
    super.takeDamage(amount);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Hit flash
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Flip canvas horizontally if facing left
    if (this.facingDirection === -1) {
      ctx.translate(this.x * 2, 0);
      ctx.scale(-1, 1);
    }

    // Body
    ctx.fillStyle = '#6fe0a6';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Face dot (always on the right side, will flip with the canvas)
    ctx.fillStyle = '#18302a';
    ctx.beginPath();
    ctx.arc(this.x + 6, this.y - 4, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw shield if active
    if (this.isShielding) {
      ctx.save();
      ctx.strokeStyle = '#4db8ff';
      ctx.fillStyle = '#4db8ff33';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Shield glow effect
      ctx.strokeStyle = '#ffffff88';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Draw small AoE range indicator when available
    if (this.smallAoeCooldown <= 0) {
      ctx.save();
      ctx.strokeStyle = '#ff0066aa';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.smallAoeRange, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Draw ultimate range indicator when available
    if (this.ultimateCooldown <= 0) {
      ctx.save();
      ctx.strokeStyle = '#ff9900aa';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ultimateRange, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    this.drawHealthBar(ctx, 64, 6);
  }
}
