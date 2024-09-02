import React, { useLayoutEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs/bundled/rough.esm";
import { figures } from "../utils/figures";
import { modes } from "../utils/modes";
import Tools from "./Tools/Tools";
import { getElementUnderCursor } from "../utils/getElementUnderCursor";
import { createElement } from "../utils/createElement";

export const Canvas = () => {
  const [elements, setElemnts] = useState([]);
  const [item, setItem] = useState(figures.line);
  const [mode, setMode] = useState(modes.release);
  const [selected, setSelected] = useState();
  const id = elements.length;

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
      if (element) {
        const offsetX = clientX - element.options[0]
        const offsetY = clientY - element.options[1]
        setSelected({...element, offsetX, offsetY});
        setMode(modes.moving);
      }
      return;
    }
    setMode(modes.drawing);

    const element = createElement(id, clientX, clientY, clientX, clientY, {
      type: item,
    });
    setElemnts((prev) => [...prev, element]);
  };

  const updateElement = (id, x, y, w, h, type) => {
    const element = createElement(id, x, y, w, h, { type });

    const copy = [...elements];
    copy[id] = element;
    setElemnts(copy);
  };

  const handleMouseUp = () => {
    setMode(modes.release);
    setSelected(null);
  };

  const handleMouseMove = (ev) => {
    if (mode === modes.release) return;
    const { clientX, clientY } = ev;

    if (mode === modes.moving) {
      const { id, options, type, offsetX, offsetY } = selected;
      const width = options[2] - options[0];
      const height = options[3] - options[1];
      const x = clientX - offsetX
      const y = clientY - offsetY
      updateElement(
        id,
        x,
        y,
        x + width,
        y + height,
        type
      );
    }
    
    if (mode === modes.drawing) {
      const lastElement = elements[elements.length - 1];
      const element = createElement(
        id - 1,
        lastElement.options[0],
        lastElement.options[1],
        clientX,
        clientY,
        { type: item }
      );

      // On mouse down will be added 1 element
      // On mouse move take last element (LAST ELEMENT WILL WE ALWAYS ELEMENT THAT HAS BEEN ADDED WHEN MOUSE DOWN)
      // Unpack everything
      // Override last element with new x and y values
      // Set elements array
      const copy = [...elements];
      copy[elements.length - 1] = element;
      setElemnts(copy);
    }
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
