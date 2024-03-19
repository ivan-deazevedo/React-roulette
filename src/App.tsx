import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import ListResto from './components/resto/ListRestos';
import { Resto } from './models/restaurants';
import RouletteWheel from './components/rouletteWheel/RouletteWheel';
import { Data } from './components/rouletteWheel/RouletteWheel';
import './App.css'

const colors : string[] = [
  '#32CD32',
  '#1E90FF',
  '#DC143C',
  '#F0E68C',
  '#9370DB',
  '#D2691E',
  '#00FF7F',
  '#BC8F8F',
  '#7FFFD4',
  '#87CEFA',
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

  function WheelData(){
    const wheelRestos : Resto[] = [];
    restos.forEach(resto => {
      if (resto.isChecked) {
        wheelRestos.push(resto);
      }
    });
    return wheelRestos;
  }

  const wheelData = convertRestoToData(WheelData());

  return (
    <>
      <Header />
      <div className='main_body'>
        <button onClick={handleSwitch}>Wheel</button>
        {!switchToWheel && <div className='input_div'>
          <div>
            <label htmlFor="restoNaam">Restaurant: </label>
            <input value={naam} onChange={e => setNaam(e.target.value)} id="restoNaam"/>
          </div>
          <button onClick={() => { setResto([...restos, {id : (restos.length+1).toString(), naam : naam, isChecked : false}])}}>submit</button>
        </div> }
        { !switchToWheel  && <ListResto restos={restos} /> }
        { switchToWheel && wheelData.length > 0 && <RouletteWheel data={wheelData} />}
      </div>
    </>   
  );
}

export default App;
