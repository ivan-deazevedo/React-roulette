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
            <div>
                {restos.map(resto => <Restos key={resto.id} resto={resto} />)}
            </div>
        </>
    );
};

export default ListResto;