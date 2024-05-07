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
    style: StyleType
}

export interface IListDataProps{
    data: Data[],
}

const RouletteWheel: React.FC<IListDataProps> = ({data}) => {
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

  return (
    <>
      <div className={styles.roulette_div}>
        <div className={styles.check_resto}>
          <input type="checkbox" onChange={handleCheckboxChange} />
          <label htmlFor="Subway">Must spin: </label>
          <select onChange={(e) => setSelectedIndex(e.target.selectedIndex)}>
            {data.map(resto => (
              <option value={resto.option}>{resto.option}</option>
            ))}
          </select>
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
            setMustSpin(false);
          }}
        />
        <button onClick={handleSpinClick}>SPIN</button>
      </div>
    </>
  );
};

export default RouletteWheel;