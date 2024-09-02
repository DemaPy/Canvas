import { figures } from "./figures";

export function isItemUndercoordinates(x, y, item) {
  const x1 = item.options[0];
  const x2 = item.options[2];
  const y1 = item.options[1];
  const y2 = item.options[3];

  if (item.type === figures.rectangle) {
    // TODO
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }

  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = difference(a, b) - (difference(a, c) + difference(b, c));

  return Math.abs(offset) < 1;
}

function difference(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
