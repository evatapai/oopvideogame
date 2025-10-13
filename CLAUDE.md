# OOP Game Showcase - React TypeScript

## Project Overview

This is a React TypeScript recreation of an OOP (Object-Oriented Programming) game originally built in vanilla HTML/JavaScript. The game demonstrates key OOP concepts including inheritance, polymorphism, composition, and encapsulation.

## Game Description

**Video Arena** - A wave-based survival game where the player battles increasing waves of enemies using different weapons.

### Features
- Canvas-based rendering with game loop using `requestAnimationFrame`
- Player movement (WASD/Arrow keys)
- Attack system (Space bar)
- Two weapon types demonstrating polymorphism
- Two enemy types with different AI behaviors
- Wave-based spawning system
- Particle effects
- Health bars and HUD

## Architecture

### Directory Structure

```
src/
├── components/
│   ├── Game.tsx       # Main game component with canvas and game loop
│   ├── HUD.tsx        # Heads-up display component
│   └── App.tsx        # Root application component
├── game/
│   ├── entities/
│   │   ├── Entity.ts      # Base entity class
│   │   ├── Character.ts   # Base character with health
│   │   ├── Player.ts      # Player character
│   │   ├── Enemy.ts       # Base enemy class
│   │   ├── Chaser.ts      # Enemy that pursues player
│   │   ├── Wanderer.ts    # Enemy that wanders randomly
│   │   ├── Projectile.ts  # Projectile entity
│   │   └── Particle.ts    # Visual effect particle
│   ├── weapons/
│   │   ├── Weapon.ts      # Base weapon class
│   │   ├── Sword.ts       # Melee weapon
│   │   └── Wand.ts        # Ranged weapon
│   ├── utils/
│   │   └── helpers.ts     # Utility functions
│   └── types.ts           # TypeScript interfaces
```

### OOP Concepts Demonstrated

#### 1. Inheritance Hierarchy
```
Entity
  └─ Character
      ├─ Player
      └─ Enemy
          ├─ Chaser
          └─ Wanderer

Weapon
  ├─ Sword
  └─ Wand
```

#### 2. Polymorphism
- **Weapon Behavior**: Both `Sword` and `Wand` override `tryAttack()` method
  - `Sword`: Melee arc damage
  - `Wand`: Fires projectiles toward mouse cursor
- **Enemy AI**: Both `Chaser` and `Wanderer` override `think()` method
  - `Chaser`: Pursues player directly
  - `Wanderer`: Moves in random directions

#### 3. Composition
- `Player` has-a `Weapon` (composition over inheritance)
- Weapons can be swapped to demonstrate different behaviors

#### 4. Encapsulation
- Health managed via getters/setters in `Character` class
- Private `_hp` field with public `hp` getter

## Key Files

### Game.tsx
Main component containing:
- Canvas setup and rendering
- Game loop implementation
- Input handling (keyboard + mouse)
- Collision detection
- Wave spawning logic
- Scene interface definition

### Entity Classes

**Entity** (`entities/Entity.ts`)
- Base class with position (`x`, `y`) and velocity (`vx`, `vy`)
- `update(dt)` for physics
- `draw(ctx)` for rendering (overridden by subclasses)

**Character** (`entities/Character.ts`)
- Extends `Entity`
- Adds health system (`maxHp`, `_hp`, `takeDamage()`, `heal()`)
- Hit flash effect (`hitTimer`)
- Health bar rendering

**Player** (`entities/Player.ts`)
- Extends `Character`
- Input handling (`handleInput()`)
- Movement with acceleration and friction
- Weapon management
- Composition: has-a `Weapon`

**Enemy** (`entities/Enemy.ts`)
- Extends `Character`
- Abstract `think()` method for AI
- Bounded within game world

**Chaser** & **Wanderer** (`entities/Chaser.ts`, `entities/Wanderer.ts`)
- Extend `Enemy`
- Override `think()` for different behaviors

### Weapon System

**Weapon** (`weapons/Weapon.ts`)
- Base class with cooldown system
- Optional owner pattern to avoid circular dependencies
- Abstract `tryAttack(scene)` method

**Sword** (`weapons/Sword.ts`)
- Short-range arc damage
- Creates particle effects on attack
- Damages all enemies in range

**Wand** (`weapons/Wand.ts`)
- Fires projectiles toward mouse position
- Creates `Projectile` entities

### Utility Functions (`utils/helpers.ts`)
- `rand(a, b)`: Random number between a and b
- `clamp(v, a, b)`: Clamp value between min and max
- `dist2(x1, y1, x2, y2)`: Squared distance (avoids sqrt for performance)

## Technical Notes

### Circular Dependency Resolution

The project initially had circular dependency issues between:
- `types.ts` → imports entity classes
- Entity classes → import `Scene` from `types.ts`

**Solution**:
1. Moved `Scene` interface directly into `Game.tsx` where it's used
2. Used `import type` for type-only imports in weapon/entity files
3. Made weapon `owner` optional with definite assignment assertion (`owner!: Player`)

### TypeScript Patterns

- **Type-only imports**: `import type { ... }` for avoiding circular dependencies
- **Definite assignment assertion**: `owner!: Player` when we know it will be set before use
- **Optional parameters**: Weapon constructors accept optional `owner` parameter
- **Interface definitions**: Strong typing for `Scene`, game props, etc.

## Running the Game

```bash
cd game-react
npm install
npm run dev
```

Open http://localhost:5173/

## Controls

- **Move**: WASD or Arrow keys
- **Attack**: Space bar
- Mouse position aims the Wand weapon

## Customization Ideas

### Switching Weapons
In `Game.tsx` around line 90, change:
```typescript
const weapon = new Wand();
// to
const weapon = new Sword();
```

### Extension Ideas (from original comments)
1. Add new Enemy subclass (e.g., "Shooter" that fires at player)
2. Add new Weapon subclass (e.g., "Bow" with slower, stronger arrows)
3. Add Boss class with more health and special behavior
4. Introduce "Pickup" class for healing or weapon switching
5. Track and render cooldown UI for current weapon

## Migration Notes (Vanilla → React)

### What Changed
- Game loop moved from global scope to React `useEffect`
- Canvas and context managed via React refs
- State management via React hooks (`useState`)
- Event listeners properly cleaned up in effect cleanup
- HUD separated into its own React component
- Scene interface defined for type safety

### What Stayed The Same
- All OOP class structure
- Game logic and physics
- Rendering code
- Input handling (keyboard/mouse)
- Collision detection

## Development Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Canvas API** - Rendering
- **requestAnimationFrame** - Game loop

## Learning Outcomes

This project demonstrates:
- Converting vanilla JS to React TypeScript
- Managing canvas in React with refs
- Proper TypeScript typing with classes
- Avoiding circular dependencies
- OOP principles in TypeScript
- Game loop patterns in React
- React cleanup patterns (event listeners, animation frames)

---

**Original**: Single HTML file with inline JavaScript
**React Version**: Modular TypeScript with proper separation of concerns
