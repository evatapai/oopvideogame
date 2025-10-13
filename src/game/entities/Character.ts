import { Entity } from './Entity';
import { clamp } from '../utils/helpers';

export class Character extends Entity {
  maxHp: number;
  protected _hp: number;
  speed: number;
  hitTimer: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.maxHp = 100;
    this._hp = this.maxHp;
    this.speed = 160;
    this.hitTimer = 0;
  }

  get hp(): number {
    return this._hp;
  }

  isAlive(): boolean {
    return this._hp > 0;
  }

  takeDamage(amount: number): void {
    this._hp = clamp(this._hp - amount, 0, this.maxHp);
    this.hitTimer = 0.15; // flash effect
    if (this._hp <= 0) this.dead = true;
  }

  heal(amount: number): void {
    this._hp = clamp(this._hp + amount, 0, this.maxHp);
  }

  update(dt: number): void {
    super.update(dt);
    if (this.hitTimer > 0) this.hitTimer -= dt;
  }

  drawHealthBar(ctx: CanvasRenderingContext2D, w = 48, h = 6): void {
    ctx.fillStyle = '#0008';
    ctx.fillRect(this.x - 24, this.y - 34, w, h);
    ctx.fillStyle = '#3fe07a';
    ctx.fillRect(this.x - 24, this.y - 34, w * (this._hp / this.maxHp), h);
    ctx.strokeStyle = '#203a31';
    ctx.strokeRect(this.x - 24, this.y - 34, w, h);
  }
}
