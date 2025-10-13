import { Wanderer } from './Wanderer';

// Slime: Slow, wandering enemy with high HP
export class Slime extends Wanderer {
  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 70;  // Slower than base Wanderer
    this.maxHp = 80;  // More HP than base
    this._hp = this.maxHp;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Slime appearance - blob-like with gradient
    const gradient = ctx.createRadialGradient(this.x, this.y - 3, 2, this.x, this.y, 16);
    gradient.addColorStop(0, '#9c27b0');
    gradient.addColorStop(1, '#7b1fa2');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Blob shape (squished circle)
    ctx.ellipse(this.x, this.y + 2, 16, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(this.x - 4, this.y - 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 50, 5);
  }
}
