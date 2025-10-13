import { Weapon } from './Weapon';
import type { Scene } from '../types';
import { Projectile } from '../entities/Projectile';
import type { Player } from '../entities/Player';

export class Wand extends Weapon {
  constructor(owner?: Player) {
    super(owner);
    this.rate = 0.28;
    this.name = 'Wand';
  }

  tryAttack(scene: Scene): void {
    if (this.cooldown > 0) return;
    this.cooldown = this.rate;

    const aimx = scene.mouse.x;
    const aimy = scene.mouse.y;
    const dx = aimx - this.owner.x;
    const dy = aimy - this.owner.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 380;

    scene.projectiles.push(
      new Projectile(
        this.owner.x,
        this.owner.y,
        (dx / len) * speed,
        (dy / len) * speed,
        12,
        26
      )
    );
  }
}
