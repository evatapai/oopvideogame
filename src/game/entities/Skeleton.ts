import { Enemy } from './Enemy';
import type { Scene } from '../types';
import { Projectile } from './Projectile';

// Skeleton: Ranged enemy that shoots at the player from a distance
export class Skeleton extends Enemy {
  attackCooldown: number;
  attackRate: number;
  attackRange: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 80;
    this.maxHp = 70;
    this._hp = this.maxHp;
    this.attackCooldown = 0;
    this.attackRate = 1.5; // Shoots every 1.5 seconds
    this.attackRange = 300;
  }

  think(dt: number, scene: Scene): void {
    const p = scene.player;
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const dist = Math.hypot(dx, dy);

    // Update attack cooldown
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);

    // Keep distance from player
    if (dist < this.attackRange) {
      // Move away from player if too close
      if (dist < 150) {
        const len = dist || 1;
        this.vx = (-dx / len) * this.speed;
        this.vy = (-dy / len) * this.speed;
      } else {
        // Stop moving when in good range
        this.vx = 0;
        this.vy = 0;
      }

      // Shoot at player
      if (this.attackCooldown <= 0) {
        this.attackCooldown = this.attackRate;

        const len = dist || 1;
        const speed = 200;
        scene.projectiles.push(
          new Projectile(
            this.x,
            this.y,
            (dx / len) * speed,
            (dy / len) * speed,
            8,
            15, // Damage
            true // fromEnemy
          )
        );
      }
    } else {
      // Chase player if too far
      const len = dist || 1;
      this.vx = (dx / len) * this.speed;
      this.vy = (dy / len) * this.speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Skeleton appearance - bone white
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    // Skull features
    ctx.fillStyle = '#424242';
    // Eyes
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y - 3, 3, 0, Math.PI * 2);
    ctx.arc(this.x + 5, this.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 2);
    ctx.lineTo(this.x - 2, this.y + 5);
    ctx.lineTo(this.x + 2, this.y + 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 48, 5);
  }
}
