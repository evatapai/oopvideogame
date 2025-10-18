import { Entity } from './Entity';

export class Projectile extends Entity {
  r: number;
  damage: number;
  life: number;
  isEnemyProjectile: boolean;

  constructor(x: number, y: number, vx: number, vy: number, radius: number, damage: number, isEnemyProjectile = false) {
    super(x, y);
    this.vx = vx;
    this.vy = vy;
    this.r = radius * 0.35;
    this.damage = damage;
    this.life = 1.4;
    this.isEnemyProjectile = isEnemyProjectile;
  }

  update(dt: number): void {
    super.update(dt);
    this.life -= dt;
    if (this.life <= 0) this.dead = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Enemy projectiles are red/orange, player projectiles are blue
    ctx.fillStyle = this.isEnemyProjectile ? '#ff6b35' : '#b5c2ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect for enemy projectiles
    if (this.isEnemyProjectile) {
      ctx.fillStyle = 'rgba(255, 107, 53, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
