import { Enemy } from './Enemy';
import type { Scene } from '../types';

export class Chaser extends Enemy {
  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 130;
  }

  think(dt: number, scene: Scene): void {
    const p = scene.player;
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const len = Math.hypot(dx, dy) || 1;
    this.vx = (dx / len) * this.speed;
    this.vy = (dy / len) * this.speed;
  }
}
