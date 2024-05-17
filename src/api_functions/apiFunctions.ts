import axios from "axios";
import { ApiURL } from "../models/apiLink";

export async function fetchData() {
    try {
      const res = await fetch(ApiURL, { mode: 'cors' });
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error(err);
      return [];
    }
}

export async function UpdateRestaurantTeller(id: string, updateTeller: number){
    const response = await fetch(`${ApiURL}/${id}`, 
    { mode: 'cors', method: 'PUT', headers:{'Content-Type': 'application/json',}, 
    body: JSON.stringify({teller : updateTeller}),});

    const result = await response.json();
    return result
}

export async function HandleDelete(id:string, callBack: () => void) {
    axios.delete(`${ApiURL}/${id}`).then(callBack);
}


// POST api handleSubmit blijft in AddForm.tsx file