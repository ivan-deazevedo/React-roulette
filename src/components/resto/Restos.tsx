import { Resto } from "../../models/restaurants";
import styles from './Restos.module.css'
import { HandleDelete } from "../../api_functions/apiFunctions";

interface IRestosProps {
    resto: Resto;
    fetchDataCallBack: () => void;
}

const Restos: React.FC<IRestosProps> = ({ resto, fetchDataCallBack }) => {
    
    resto.isChecked = false;

    return(
        <>
            <div className={styles.restos}>
                <label htmlFor="resto">{resto.naam}</label>
                <input type="checkbox" id={resto.id} name={resto.naam} value={resto.naam} onChange={(e) => resto.isChecked = e.target.checked} />
                <button onClick={() => HandleDelete(resto.id, fetchDataCallBack )}>X</button>
            </div>
        </>
    )
}

export default Restos;
