import { Weapon } from './Weapon';
import type { Scene } from '../types';
import { Projectile } from '../entities/Projectile';
import type { Player } from '../entities/Player';

// Staff: Shoots slower but larger, more powerful projectiles
export class Staff extends Weapon {
  constructor(owner?: Player) {
    super(owner);
    this.rate = 0.6; // Slowest attack rate
    this.name = 'Staff';
  }

  tryAttack(scene: Scene): void {
    if (this.cooldown > 0) return;
    this.cooldown = this.rate;

    const aimx = scene.mouse.x;
    const aimy = scene.mouse.y;
    const dx = aimx - this.owner.x;
    const dy = aimy - this.owner.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 300; // Slower than wand

    // Create a bigger, more powerful projectile
    const projectile = new Projectile(
      this.owner.x,
      this.owner.y,
      (dx / len) * speed,
      (dy / len) * speed,
      20, // Larger radius
      40  // Higher damage
    );

    // Override the projectile's draw method for a different appearance
    const originalDraw = projectile.draw.bind(projectile);
    projectile.draw = function (ctx: CanvasRenderingContext2D) {
      // Draw a glowing orb
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      gradient.addColorStop(0, '#ffeb3b');
      gradient.addColorStop(0.5, '#ffc107');
      gradient.addColorStop(1, '#ff9800');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    scene.projectiles.push(projectile);
  }
}
