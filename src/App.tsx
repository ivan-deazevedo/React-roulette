import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import ListResto from './components/resto/ListRestos';
import { Resto } from './models/restaurants';
import RouletteWheel from './components/rouletteWheel/RouletteWheel';
import { Data } from './components/rouletteWheel/RouletteWheel';
import './App.css'
import AddForm from './components/addForm/AddForm';
import { ApiURL } from './models/apiLink';

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
    const res = await fetch(ApiURL, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const UpdateRestaurantTeller = async(id: string, updateTeller: number) => {
  const response = await fetch(`${ApiURL}/${id}`, { mode: 'cors', method: 'PUT', headers:{'Content-Type': 'application/json',}, body: JSON.stringify({teller : updateTeller}),});
  const result = await response.json();
  return result
}

function App() {
  const [restos, setResto] = useState<Resto[]>([]);
  const [switchToWheel, setSwitchToWheel] = React.useState(false);

  const handleSwitch = () => {
    setSwitchToWheel(!switchToWheel);
    if(switchToWheel === false){
      var wheelData = WheelData();
      wheelData.forEach(async resto => {
        var teller = resto.teller+1;
          await UpdateRestaurantTeller(resto.id, teller)
      });
    }
    else{
      fetchRestoData()
    }
  };

  useEffect(() => {
    async function fetchRestos() {
      const data = await fetchData();
      setResto(data);
    }

    fetchRestos();
  }, []);

  const fetchRestoData = async () =>{
    const data = await fetchData();
    setResto(data);
  }

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
          <AddForm fetchDataCallBack={fetchRestoData} />
        </div> }
        { !switchToWheel  && <ListResto restos={restos} fetchCallBack={fetchRestoData} /> }
        { switchToWheel && wheelData.length > 0 && <RouletteWheel data={wheelData} />}
      </div>
    </>   
  );
}

export default App;
