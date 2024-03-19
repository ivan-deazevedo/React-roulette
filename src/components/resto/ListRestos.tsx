import React from "react";
import { Resto } from "../../models/restaurants";
import Restos from "./Restos";
import styles from "./ListRestos.module.css"

interface IListRestoProps{
    restos: Resto[],
}

const ListResto: React.FC<IListRestoProps> = ({restos}) => {

    return (      
        <>
            <h2>Restaurants</h2>
            <table className={styles.table}>
                {restos.map(resto => <Restos key={resto.id} resto={resto} />)}
            </table>
        </>
    );
};

export default ListResto;