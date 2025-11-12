import { Entity } from './Entity';

export class Companion extends Entity {
  angle: number = 0;
  distance: number = 40;
  rotationSpeed: number = 2;

  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 0;
  }

  update(dt: number, playerX: number, playerY: number): void {
    // Orbit around player
    this.angle += this.rotationSpeed * dt;
    this.x = playerX + Math.cos(this.angle) * this.distance;
    this.y = playerY + Math.sin(this.angle) * this.distance;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Draw star
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? 8 : 4;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}
