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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <div className={styles.roulette_div}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
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