import { Weapon } from './Weapon';
import type { Scene } from '../types';
import { Particle } from '../entities/Particle';
import { rand, dist2 } from '../utils/helpers';
import type { Player } from '../entities/Player';

export class Sword extends Weapon {
  range: number;
  damage: number;

  constructor(owner?: Player) {
    super(owner);
    this.rate = 0.35;
    this.range = 48;
    this.damage = 30;
    this.name = 'Sword';
  }

  tryAttack(scene: Scene): void {
    if (this.cooldown > 0) return;
    this.cooldown = this.rate;

    // Slash particles
    for (let i = 0; i < 12; i++) {
      scene.fx.push(
        new Particle(
          this.owner.x + rand(-8, 8),
          this.owner.y + rand(-8, 8),
          rand(-80, 80),
          rand(-80, 80),
          rand(0.15, 0.35),
          rand(1, 2)
        )
      );
    }

    // Check enemies in range
    scene.enemies.forEach((e) => {
      if (e.dead) return;
      const d2 = dist2(this.owner.x, this.owner.y, e.x, e.y);
      if (d2 < this.range * this.range) e.takeDamage(this.damage);
    });
  }
}
