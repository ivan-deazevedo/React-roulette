import React, { useState } from "react";
import { PostResto } from "../../models/restaurants";
import axios from "axios";
import { ApiURL } from "../../models/apiLink";

const resto : PostResto =  {
    naam : ""
}

const AddForm : React.FC<{fetchDataCallBack: () => void}> = ({fetchDataCallBack}) => {
    const [data, setData] = useState<PostResto>(resto);

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        axios({
            url: ApiURL,
            method: "POST",
            data: data
        }).then((res) => {fetchDataCallBack(); setData({naam: ''})})
        .catch((err) => console.log(err));
    }

    return(
        <>
            <label>Restaurant:</label>
            <input type="text" name="naam" value={data.naam} onChange={handleData}></input>
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default AddForm