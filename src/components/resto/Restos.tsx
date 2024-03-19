import React from "react";
import { Resto } from "../../models/restaurants";
import "./Restos.css"

interface IRestosProps {
    resto: Resto,
}

const Restos: React.FC<IRestosProps> = ({ resto }) => {

    return(
        <>
            <label htmlFor="resto">{resto.naam}</label>
            <input type="checkbox" id={resto.id} name={resto.naam} value={resto.naam} />
            <br />
        </>
    )
}

export default Restos;
