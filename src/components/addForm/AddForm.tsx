import React from "react";
import axios from "axios";
import { ApiURL } from "../../models/apiLink";
import styles from "./AddForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

interface IRestoFormInput {
    naam : string;
    weburl : string;
}

const schema = yup.object().shape({
    naam: yup.string().required("Naam is verplicht"),
    weburl: yup.string().required("Link naar website moet meegegeven worden")
        .url("Moet een web url zijn")
})

const AddForm : React.FC<{fetchDataCallBack: () => void; onFormSubmit: () => void}> = ({fetchDataCallBack, onFormSubmit, }) => {

    const{register, handleSubmit, formState: {errors},} = useForm<IRestoFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (Data: IRestoFormInput)=>{
        axios({
            url: ApiURL,
            method: "POST",
            data: Data
        }).then((res) => {fetchDataCallBack(); onFormSubmit();})
        .catch((err) => console.log(err));
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input_div}>
                    {errors.naam && <p className={styles.error_p}>{errors.naam.message}</p>}
                    <div className={styles.div}>
                        <label className={styles.label}>Restaurant:</label>
                        <input className={styles.input} placeholder="Restaurant naam" {...register("naam")} />
                    </div>
                    {errors.weburl && <p className={styles.error_p}>{errors.weburl.message}</p>}
                    <div className={styles.div}>
                        <label className={styles.label}>url:</label>
                        <input className={styles.input}  placeholder="https://www.voorbeeld.nl" {...register("weburl")} />
                    </div>
                    <input className={styles.button} type="submit" />
                </div>
            </form>
        </>
    );
};

export default AddForm