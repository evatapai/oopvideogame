import { clamp } from '../utils/helpers';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  rad: number;
  max: number;

  constructor(x: number, y: number, vx: number, vy: number, life: number, rad: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.rad = rad;
    this.max = life;
  }

  update(dt: number): void {
    this.life -= dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.life <= 0) return;
    ctx.globalAlpha = clamp(this.life / this.max, 0, 1);
    ctx.fillStyle = '#a9b6ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  get dead(): boolean {
    return this.life <= 0;
  }
}
