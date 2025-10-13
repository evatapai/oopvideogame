export const rand = (a: number, b: number): number => a + Math.random() * (b - a);

export const clamp = (v: number, a: number, b: number): number =>
  Math.max(a, Math.min(b, v));

export const dist2 = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
};
