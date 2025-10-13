import type { Player } from './entities/Player';
import type { Enemy } from './entities/Enemy';
import type { Projectile } from './entities/Projectile';
import type { Particle } from './entities/Particle';

export interface Scene {
  w: number;
  h: number;
  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  fx: Particle[];
  spawnTimer: number;
  wave: number;
  score: number;
  mouse: { x: number; y: number };
}
