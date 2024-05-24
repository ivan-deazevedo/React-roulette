import React from "react";
import { Resto } from "../../models/restaurants";
import Restos from "./Restos";
import styles from "./ListRestos.module.css"

interface IListRestoProps{
    restos: Resto[],
    fetchCallBack: () => void;
}

const ListResto: React.FC<IListRestoProps> = ({restos, fetchCallBack}) => {

    return (      
        <>
            <div className={styles.table_div}>
                <h2>Restaurants</h2>
                <div className={styles.table}>
                    {restos.map(resto => <Restos key={resto.id} resto={resto} fetchDataCallBack={fetchCallBack} />)}
                </div>
            </div>
        </>
    );
};

export default ListResto;