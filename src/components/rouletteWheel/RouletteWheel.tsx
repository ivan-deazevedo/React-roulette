import React, { useState } from 'react';
import {Wheel} from 'react-custom-roulette';
import styles from './RouletteWheel.module.css'

interface StyleType {
    backgroundColor?: string; // Optional
    textColor?: string; // Optional
    fontFamily?: string; // Optional
    fontSize?: number; // Optional
    fontWeight?: number | string; // Optional
    fontStyle?: string; // Optional
}

export interface Data {
    option: string,
    style: StyleType,
    url: string
}

export interface IListDataProps{
    data: Data[],
    user: string
}

const RouletteWheel: React.FC<IListDataProps> = ({data, user}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSpinClick = () => {
    var newPrizeNumber;
    if (isChecked === true){
      newPrizeNumber = selectedIndex;
    }
    else{
      newPrizeNumber = Math.floor(Math.random() * data.length);
    }
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const openNewUrl = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <>
      <div className={styles.roulette_div}>
        <div className={styles.check_resto}>
          <input type="checkbox" onChange={handleCheckboxChange} />
          <label htmlFor="MustSpin">Must spin: </label>
          <select onChange={(e) => setSelectedIndex(e.target.selectedIndex)}>
            {data.map(resto => (
              <option value={resto.option}>{resto.option}</option>
            ))}
          </select>
        </div>
        <div className={styles.moet_bestellen}>
          <p>@<span>{user}</span> moet deze keer de bestelling doen!</p>
        </div>
      
        <Wheel
          mustStartSpinning={mustSpin}
          outerBorderWidth={3}
          radiusLineWidth={3}
          prizeNumber={prizeNumber}
          data={data}
          fontFamily="Lobster"
          fontSize={25}
          fontWeight={400}
          onStopSpinning={() => { 
            setMustSpin(false); openNewUrl(data[prizeNumber].url);
          }}
        />
        <button onClick={handleSpinClick}>SPIN</button>
      </div>
    </>
  );
};

export default RouletteWheel;