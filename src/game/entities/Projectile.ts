import { Entity } from './Entity';

export class Projectile extends Entity {
  r: number;
  damage: number;
  life: number;
  fromEnemy: boolean;

  constructor(x: number, y: number, vx: number, vy: number, radius: number, damage: number, fromEnemy: boolean = false) {
    super(x, y);
    this.vx = vx;
    this.vy = vy;
    this.r = radius * 0.35;
    this.damage = damage;
    this.life = 1.4;
    this.fromEnemy = fromEnemy;
  }

  update(dt: number): void {
    super.update(dt);
    this.life -= dt;
    if (this.life <= 0) this.dead = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.fromEnemy ? '#ff4444' : '#b5c2ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
