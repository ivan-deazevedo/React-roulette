import React, { useState } from "react";
import { PostResto } from "../../models/restaurants";
import axios from "axios";
import { ApiURL } from "../../models/apiLink";
import styles from "./AddForm.module.css"

const resto : PostResto =  {
    naam : "",
    weburl: ""
}

const AddForm : React.FC<{fetchDataCallBack: () => void}> = ({fetchDataCallBack}) => {
    const [data, setData] = useState<PostResto>(resto);

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData({...data, [e.target.name]:e.target.value, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        axios({
            url: ApiURL,
            method: "POST",
            data: data
        }).then((res) => {fetchDataCallBack(); setData({naam: '', weburl: ''})})
        .catch((err) => console.log(err));
    }

    return(
        <>
            <div className={styles.input_div}>
                <div className={styles.div}>
                    <label className={styles.label}>Restaurant:</label>
                    <input className={styles.input}  type="text" name="naam" value={data.naam} onChange={handleData}></input>
                </div>
                <div className={styles.div}>
                    <label className={styles.label}>url:</label>
                    <input className={styles.input} type="text" name="weburl" value={data.weburl} onChange={handleData}></input>
                </div>
                <button className={styles.button} onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
};

export default AddForm