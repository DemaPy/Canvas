export function Selection({ onClick, isActive }) {
  return (
    <button
      style={{
        background: isActive ? "#ececec" : "#404040",
        color: !isActive ? "#ececec" : "#404040",
        width: "3rem",
        height: "3rem",
      }}
      onClick={onClick}
    >
      S
    </button>
  );
}
