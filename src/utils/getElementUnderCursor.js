import { isItemUndercoordinates } from "./isItemUndercoordinates";

export function getElementUnderCursor({ x, y, elements }) {
  return elements.find((item) => isItemUndercoordinates(x, y, item));
}
