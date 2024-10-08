import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
    }));

    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((previous) => {
      const newGuesses = [...previous];
      newGuesses[turn] = formattedGuess;

      return newGuesses;
    });
    setHistory((previous) => [...previous, currentGuess]);
    setTurn((previous) => previous + 1);
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("you already tried that word");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((previous) => previous.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((previous) => previous + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
