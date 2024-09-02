import { figures } from "./figures";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

export function createElement(id, x, y, w, h, { type }) {
  let element;
  if (type === figures.rectangle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], id, element, type };
  }
  if (type === figures.line) {
    element = generator[type](x, y, w, h);
    return { options: [x, y, w, h], element, id, type };
  }
  if (type === figures.circle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], id, element, type };
  }

  if (type === figures.circle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], id, element, type };
  }
}
