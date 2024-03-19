import React from "react";
import { Resto } from "../../models/restaurants";
import Restos from "./Restos";

interface IListRestoProps{
    restos: Resto[],
}

const ListResto: React.FC<IListRestoProps> = ({restos}) => {

    return (      
        <>
            <h2>Restaurants</h2>
            <table>
                {restos.map(resto => <Restos key={resto.id} resto={resto} />)}
            </table>
        </>
    );
};

export default ListResto;