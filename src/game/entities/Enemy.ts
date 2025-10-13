import { Character } from './Character';
import { clamp } from '../utils/helpers';
import type { Scene } from '../types';

export class Enemy extends Character {
  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 110;
    this.maxHp = 60;
    this._hp = this.maxHp;
  }

  think(dt: number, scene: Scene): void {
    // Abstract method - to be overridden by subclasses
  }

  update(dt: number, scene: Scene): void {
    this.think(dt, scene);
    super.update(dt);

    // Bounds
    this.x = clamp(this.x, 12, scene.w - 12);
    this.y = clamp(this.y, 12, scene.h - 12);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    ctx.fillStyle = '#ff6b8b';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 48, 5);
  }
}
