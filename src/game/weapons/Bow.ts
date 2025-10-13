import { Weapon } from './Weapon';
import type { Scene } from '../types';
import { Projectile } from '../entities/Projectile';
import type { Player } from '../entities/Player';

// Bow: Shoots three arrows in a spread pattern
export class Bow extends Weapon {
  constructor(owner?: Player) {
    super(owner);
    this.rate = 0.5; // Slower than Wand
    this.name = 'Bow';
  }

  tryAttack(scene: Scene): void {
    if (this.cooldown > 0) return;
    this.cooldown = this.rate;

    const aimx = scene.mouse.x;
    const aimy = scene.mouse.y;
    const dx = aimx - this.owner.x;
    const dy = aimy - this.owner.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 400;

    // Base direction
    const baseVx = (dx / len) * speed;
    const baseVy = (dy / len) * speed;

    // Shoot 3 arrows in a spread
    const angles = [-0.15, 0, 0.15]; // -8.5°, 0°, +8.5°

    angles.forEach((angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Rotate the velocity vector
      const vx = baseVx * cos - baseVy * sin;
      const vy = baseVx * sin + baseVy * cos;

      scene.projectiles.push(
        new Projectile(this.owner.x, this.owner.y, vx, vy, 8, 20)
      );
    });
  }
}
