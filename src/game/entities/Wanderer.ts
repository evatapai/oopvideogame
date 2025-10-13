import { Enemy } from './Enemy';
import type { Scene } from '../types';
import { rand } from '../utils/helpers';

export class Wanderer extends Enemy {
  timer: number;
  tx: number;
  ty: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.speed = 90;
    this.timer = 0;
    this.tx = 0;
    this.ty = 0;
  }

  think(dt: number, scene: Scene): void {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = rand(0.6, 1.4);
      this.tx = rand(-1, 1);
      this.ty = rand(-1, 1);
      const n = Math.hypot(this.tx, this.ty) || 1;
      this.tx /= n;
      this.ty /= n;
    }
    this.vx = this.tx * this.speed;
    this.vy = this.ty * this.speed;
  }
}
