import type { Scene } from '../types';
import type { Player } from '../entities/Player';

export class Weapon {
  owner!: Player;
  cooldown: number;
  rate: number;
  name: string;

  constructor(owner?: Player) {
    if (owner) this.owner = owner;
    this.cooldown = 0;
    this.rate = 0.4;
    this.name = 'Weapon';
  }

  update(dt: number): void {
    this.cooldown = Math.max(0, this.cooldown - dt);
  }

  tryAttack(scene: Scene): void {
    // Abstract method - to be overridden
  }
}
