import axios from "axios";
import { UserApiURL } from "../../models/apiLink";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AddForm.module.css"
import { useForm } from "react-hook-form";

interface IUserFormInput {
    voornaam : string;
    familienaam : string;
}

const schema = yup.object().shape({
    voornaam: yup.string().required("Vooraam is verplicht"),
    familienaam: yup.string().required("Familienaam is verplicht")
})

const AddForm : React.FC<{fetchUserDataCallBack: () => void; onFormSubmit: () => void}> = ({fetchUserDataCallBack, onFormSubmit, }) => {
    
    const{register, handleSubmit, formState: {errors},} = useForm<IUserFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (data: IUserFormInput)=>{
        axios.post(UserApiURL, data).then((res) => { fetchUserDataCallBack(); onFormSubmit();})
        .catch((err) => console.log(err));
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input_div}>
                    {errors.voornaam && <p className={styles.error_p}>{errors.voornaam.message}</p>}
                    <div className={styles.div}>
                        <label className={styles.label}>Voornaam: </label>
                        <input className={styles.input} placeholder="Voornaam" {...register("voornaam")} />
                    </div>
                    {errors.familienaam && <p className={styles.error_p}>{errors.familienaam.message}</p>}
                    <div className={styles.div}>
                        <label className={styles.label}>Familienaam: </label>
                        <input className={styles.input} placeholder="Familienaam" {...register("familienaam")} />
                    </div>
                    <input className={styles.button} type="submit" />
                </div>
            </form>
        </>
    );
};

export default AddForm