export class Entity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dead: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.dead = false;
  }

  update(dt: number): void {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Abstract method - to be overridden
  }
}
