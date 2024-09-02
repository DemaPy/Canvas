import React from "react";
import { Line } from "./Line";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Selection } from "./Selection";
import { figures } from "../../utils/figures";

const Tools = ({ onSelect, item }) => {
  return (
<div
      style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0.4rem",
        borderRadius: "0.4rem",
        position: "fixed",
        left: "1rem",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Line
        isActive={item === figures.line}
        onClick={() => onSelect(figures.line)}
      />
      <Rectangle
        isActive={item === figures.rectangle}
        onClick={() => onSelect(figures.rectangle)}
      />
      <Circle
        isActive={item === figures.circle}
        onClick={() => onSelect(figures.circle)}
      />
      <Selection
        isActive={item === figures.selection}
        onClick={() => onSelect(figures.selection)}
      />
    </div>
  );
};

export default Tools;
