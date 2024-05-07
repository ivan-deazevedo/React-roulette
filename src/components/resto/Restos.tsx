import { Resto } from "../../models/restaurants";
import styles from './Restos.module.css'
import axios from "axios";
import { ApiURL } from "../../models/apiLink";

interface IRestosProps {
    resto: Resto;
    fetchDataCallBack: () => void;
}

const Restos: React.FC<IRestosProps> = ({ resto, fetchDataCallBack }) => {
    
    const handleDelete = (id:string)=>{
        axios.delete(`${ApiURL}/${id}`)
            .then(resp => fetchDataCallBack())
            .catch(error => {console.error('error deleting item');});
    }

    resto.isChecked = false;

    return(
        <>
            <div className={styles.restos}>
                <label htmlFor="resto">{resto.naam}</label>
                <input type="checkbox" id={resto.id} name={resto.naam} value={resto.naam} onChange={(e) => resto.isChecked = e.target.checked} />
                <button onClick={() => handleDelete(resto.id)}>X</button>
            </div>
        </>
    )
}

export default Restos;
