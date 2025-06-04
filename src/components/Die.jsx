export default function Die(props) {
  return (
    <div className={`die ${props.die.isHeld ? "held" : ""}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.clickToHold();
        }}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
      >
        {props.die.value ?? 1}
      </button>
    </div>
  );
}
