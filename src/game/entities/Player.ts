import { Character } from './Character';
import type { Weapon } from '../weapons/Weapon';
import { clamp } from '../utils/helpers';
import type { Scene } from '../types';

export class Player extends Character {
  weapon: Weapon;
  accel: number;
  friction: number;
  maxMove: number;

  constructor(x: number, y: number, weapon: Weapon) {
    super(x, y);
    this.weapon = weapon;
    this.accel = 900;
    this.friction = 8;
    this.maxMove = this.speed;
  }

  handleInput(keys: Set<string>, dt: number): void {
    let ax = 0;
    let ay = 0;

    if (keys.has('ArrowLeft') || keys.has('a')) ax -= 1;
    if (keys.has('ArrowRight') || keys.has('d')) ax += 1;
    if (keys.has('ArrowUp') || keys.has('w')) ay -= 1;
    if (keys.has('ArrowDown') || keys.has('s')) ay += 1;

    const len = Math.hypot(ax, ay) || 1;
    ax /= len;
    ay /= len;

    this.vx += ax * this.accel * dt;
    this.vy += ay * this.accel * dt;

    // Clamp speed
    const sp = Math.hypot(this.vx, this.vy);
    if (sp > this.maxMove) {
      this.vx = (this.vx / sp) * this.maxMove;
      this.vy = (this.vy / sp) * this.maxMove;
    }
  }

  update(dt: number, scene: Scene, keys: Set<string>): void {
    this.handleInput(keys, dt);

    // Friction
    this.vx -= this.vx * this.friction * dt;
    this.vy -= this.vy * this.friction * dt;

    // World bounds
    super.update(dt);
    this.x = clamp(this.x, 16, scene.w - 16);
    this.y = clamp(this.y, 16, scene.h - 16);

    this.weapon.update(dt);
  }

  attack(scene: Scene): void {
    this.weapon.tryAttack(scene);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Hit flash
    ctx.save();
    if (this.hitTimer > 0) {
      ctx.filter = 'brightness(220%)';
    }

    // Body
    ctx.fillStyle = '#6fe0a6';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Face dot
    ctx.fillStyle = '#18302a';
    ctx.beginPath();
    ctx.arc(this.x + 6, this.y - 4, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    this.drawHealthBar(ctx, 64, 6);
  }
}
