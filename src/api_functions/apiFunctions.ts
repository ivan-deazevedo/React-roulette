import axios from "axios";
import { ApiURL, UserApiURL } from "../models/apiLink";

//#region  Fetch All Data
export async function fetchData() {
    try {
      const res = await fetch(ApiURL, { mode: 'cors' });
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const restaurants = await res.json();
      return restaurants.data;
      
    } catch (err) {
      console.error(err);
      return [];
    }
}

export async function fetchUserData() {
  try {
    const res = await fetch(UserApiURL, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const users = await res.json();
    return users.data;

  } catch (err) {
    console.error(err);
    return [];
  }
}
//#endregion

//#region Update Data
export async function UpdateRestaurantTeller(id: string, updateTeller: number, newUrl: string){
    const response = await fetch(`${ApiURL}/${id}`, 
    { mode: 'cors', method: 'PUT', headers:{'Content-Type': 'application/json',}, 
    body: JSON.stringify({teller : updateTeller, weburl : newUrl})});

    const result = await response.json();
    return result
}

export async function UpdateUser(id: string, Voornaam: string, Achternaam: string){
  const response = await fetch(`${UserApiURL}/${id}`, 
  { mode: 'cors', method: 'PUT', headers:{'Content-Type': 'application/json',}, 
  body: JSON.stringify({voornaam : Voornaam, familienaam : Achternaam})});

  const result = await response.json();
  return result
}

//#endregion

//#region Delete Data
export async function HandleDelete(id:string, callBack: () => void) {
    axios.delete(`${ApiURL}/${id}`).then(callBack);
}

export async function UserDelete(id:number, callBack: () => void) {
  axios.delete(`${UserApiURL}/${id}`).then(callBack);
}

//#endregion

// POST api handleSubmit blijft in AddForm.tsx file