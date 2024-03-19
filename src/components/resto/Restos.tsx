import React from "react";
import { Resto } from "../../models/restaurants";
import styles from './Restos.module.css'

interface IRestosProps {
    resto: Resto,
}

const Restos: React.FC<IRestosProps> = ({ resto }) => {
    resto.isChecked = false;

    return(
        <>
            <div className={styles.restos}>
                <label htmlFor="resto">{resto.naam}</label>
                <input type="checkbox" id={resto.id} name={resto.naam} value={resto.naam} onChange={(e) => resto.isChecked = e.target.checked} />
            </div>
        </>
    )
}

export default Restos;
