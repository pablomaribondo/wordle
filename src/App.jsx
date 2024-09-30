import { useEffect, useState } from 'react';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(response => response.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        console.log(randomSolution.word);
        setSolution(randomSolution.word);
      });
  }, []);

  return (
    <div>
      <h1>Wordle</h1>
      {solution && <div>Solution is: {solution}</div>}
    </div>
  );
}

export default App;
