import { useState, useRef, useEffect} from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateNewDice());

  const newGameBtn = useRef(null);
  useEffect(() => {
    if (isGameWon()) {
      newGameBtn.current.focus();
    }
  });

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateNewDice() {
    return Array.from({ length: 10 }, () => generateNewDie());
  }

  function handleRollDiceClick() {
    if (isGameWon()) {
      setDice(generateNewDice());
    }
    setDice((prev) => prev.map((die) => (die.isHeld ? die : generateNewDie())));
  }

  function handleHoldClick(id) {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const isGameWon = () => {
    return dice.every((die) => die.isHeld && hasSameValue(die));

    function hasSameValue(die) {
      return die.value === dice[0]?.value;
    }
  };

  return (
    <main className="container">
      {isGameWon() && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {isGameWon() && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <div className="heading">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">
        {dice.map((item) => (
          <Die
            die={item}
            key={item.id}
            clickToHold={() => handleHoldClick(item.id)}
          />
        ))}
      </div>
      <button ref={newGameBtn} className="roll-dice-btn" onClick={handleRollDiceClick}>
        {isGameWon() ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
