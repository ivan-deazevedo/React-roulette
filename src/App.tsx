import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import ListResto from './components/resto/ListRestos';
import { Resto } from './models/restaurants';


function App() {
  const [restos, setResto] = useState<Resto[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/opties', {mode: 'cors'})
    .then((res) => res.json())
    .then((data) => setResto(data))
    .catch((err) => console.log(err));
    console.log(restos);
  })

  return (
    <>
      <Header />
      <div>
        <ListResto restos={restos} />
      </div>
    </>   
  );
}

export default App;
