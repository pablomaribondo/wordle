import Row from './Row';

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
      {guesses.map((guess, index) => {
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
}
