import { useState } from "react";
import { PostUser } from "../../models/users";
import axios from "axios";
import { UserApiURL } from "../../models/apiLink";
import styles from "./AddForm.module.css"

const user : PostUser =  {
    voornaam : "",
    familienaam : ""
}

const AddForm : React.FC<{fetchUserDataCallBack: () => void}> = ({fetchUserDataCallBack}) => {
    const [data, setData] = useState<PostUser>(user);

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        axios.post(UserApiURL, data).then((res) => { fetchUserDataCallBack(); setData({voornaam: '', familienaam: ''})})
        .catch((err) => console.log(err));
    }

    return(
        <>
            <div className={styles.input_div}>
                <div className={styles.div}>
                    <label className={styles.label}>Voornaam:</label>
                    <input className={styles.input}  type="text" name="voornaam" value={data.voornaam} onChange={handleData}></input>
                </div>
                <div className={styles.div}>
                    <label className={styles.label}>Familienaam:</label>
                    <input className={styles.input} type="text" name="familienaam" value={data.familienaam} onChange={handleData}></input>
                </div>
                <button className={styles.button} onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
};

export default AddForm