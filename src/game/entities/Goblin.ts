import { Chaser } from './Chaser';

// Goblin: Fast and aggressive enemy that chases the player
export class Goblin extends Chaser {
  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 145; // Faster than base Chaser
    this.maxHp = 50;  // Less HP than base
    this._hp = this.maxHp;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Goblin appearance - greenish
    ctx.fillStyle = '#8bc34a';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(this.x - 4, this.y - 3, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 4, this.y - 3, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 40, 4);
  }
}
