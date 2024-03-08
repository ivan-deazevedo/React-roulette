import { Resto } from "../../models/restaurants";
import "./Restos.css"

interface IRestosProps {
    resto: Resto,
}

const Restos: React.FC<IRestosProps> = ({ resto }) => {
    return(
        <div>
            <h3>{resto.naam}</h3>
            <p>{resto.omschrijving}</p>
        </div>
    )
}

export default Restos;
