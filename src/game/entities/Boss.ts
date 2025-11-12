import { Enemy } from './Enemy';
import type { Scene } from '../types';

// Boss: Very strong enemy with lots of HP
export class Boss extends Enemy {
  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 60;
    this.maxHp = 1000;
    this._hp = this.maxHp;
  }

  think(dt: number, scene: Scene): void {
    const p = scene.player;
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const dist = Math.hypot(dx, dy);

    // Chase player slowly but steadily
    if (dist > 0) {
      this.vx = (dx / dist) * this.speed;
      this.vy = (dy / dist) * this.speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Large boss - dark red/purple
    ctx.fillStyle = '#8b0000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Darker outer ring
    ctx.strokeStyle = '#4a0000';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Evil eyes
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this.x - 10, this.y - 8, 5, 0, Math.PI * 2);
    ctx.arc(this.x + 10, this.y - 8, 5, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - 10, this.y - 8, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 10, this.y - 8, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 80, 8);
  }
}
