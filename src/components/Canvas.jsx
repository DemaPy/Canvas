import React, { useLayoutEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs/bundled/rough.esm";
import { figures } from "../utils/figures";
import { modes } from "../utils/modes";
import Tools from "./Tools/Tools";

const generator = rough.generator();

function createElement(x, y, w, h, { type }) {
  let element;
  if (type === figures.rectangle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], element, type };
  }
  if (type === figures.line) {
    element = generator[type](x, y, w, h);
    return { options: [x, y, w, h], element, type };
  }
  if (type === figures.circle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], element, type };
  }

  if (type === figures.circle) {
    element = generator[type](x, y, w - x, h - y);
    return { options: [x, y, w - x, h - y], element, type };
  }
}

function difference(a, b) {
  return b - a;
}

function isItemUndercoordinates(x, y, item) {
  const x1 = item.options[0];
  const x2 = item.options[2];
  const y1 = item.options[1];
  const y2 = item.options[3];
  const rangeX = difference(x1, x2);
  const rangeY = difference(y1, y2);
  if (item.type === figures.rectangle) {
    // TODO
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }
  return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function getElementUnderCursor({ x, y, elements }) {
  return elements.find((item) => isItemUndercoordinates(x, y, item));
}

export const Canvas = () => {
  const [elements, setElemnts] = useState([]);
  const [item, setItem] = useState(figures.line);
  const [mode, setMode] = useState(modes.release);

  useLayoutEffect(() => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((item) => {
      roughCanvas.draw(item.element);
    });
  }, [elements]);

  const handleMouseDown = (ev) => {
    const { clientX, clientY } = ev;
    if (item === figures.selection) {
      const element = getElementUnderCursor({
        x: clientX,
        y: clientY,
        elements,
      });
      console.log(element);
      return;
    }
    setMode(modes.drawing);

    const element = createElement(clientX, clientY, clientX, clientY, {
      type: item,
    });
    setElemnts((prev) => [...prev, element]);
  };

  const handleMouseUp = () => {
    setMode(modes.release);
  };

  const handleMouseMove = (ev) => {
    if (mode === modes.release) return;
    const { clientX, clientY } = ev;
    const lastElement = elements[elements.length - 1];
    const element = createElement(
      lastElement.options[0],
      lastElement.options[1],
      clientX,
      clientY,
      { type: item }
    );

    // On mouse down will be added 1 element
    // On mouse move take last element
    // Unpack everything
    // Override last element with new x and y values
    // Set elements array
    const copy = [...elements];
    copy[elements.length - 1] = element;
    setElemnts(copy);
  };
  console.log(elements);

  return (
    <div style={{ display: "flex", gap: "0.4rem" }}>
      <Tools onSelect={setItem} item={item} />
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
};
