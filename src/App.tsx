import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import ListResto from './components/resto/ListRestos';
import { Resto } from './models/restaurants';
import RouletteWheel from './components/rouletteWheel/RouletteWheel';
import { Data } from './components/rouletteWheel/RouletteWheel';
import { clear } from 'console';


const colors : string[] = [
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'pink',
  'orange',
  'brown',
]

function convertRestoToData(restos: Resto[]): Data[] {
  return restos.map((resto , key) => ({ option: resto.naam, style: { backgroundColor: colors[key], textColor: 'black'}}));
}


async function fetchData() {
  try {
    const res = await fetch('http://localhost:4000/opties', { mode: 'cors' });
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function App() {
  const [restos, setResto] = useState<Resto[]>([]);
  const [switchToWheel, setSwitchToWheel] = React.useState(false);
  const [naam, setNaam] = React.useState('');
  const [omschrijving, setOmschrijving] = React.useState('');

  const handleSwitch = () => {
    setSwitchToWheel(!switchToWheel);
  };

  useEffect(() => {
    async function fetchRestos() {
      const data = await fetchData();
      setResto(data);
    }

    fetchRestos();
  }, []);

  const wheelData = convertRestoToData(restos);

  return (
    <>
      <Header />
      <button onClick={handleSwitch}>Wheel</button>
      <br />
      <label htmlFor="restoNaam">Restaurant: </label>
      <input value={naam} onChange={e => setNaam(e.target.value)} id="restoNaam"/>
      <br />
      <label htmlFor="restoOmschrijving">Omschrijving: </label>
      <input value={omschrijving} onChange={e => setOmschrijving(e.target.value)} id="restoOmschrijving"/>
      <br />
      <button onClick={() => { setResto([...restos, {id : restos.length.toString(), naam : naam, omschrijving : omschrijving,}])}}>submit</button>
      { !switchToWheel  && <ListResto restos={restos} /> }
      { switchToWheel && wheelData.length > 0 && <RouletteWheel data={wheelData} />}
    </>   
  );
}

export default App;
