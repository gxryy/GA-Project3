import { nanoid } from "@reduxjs/toolkit";
import {useState, useEffect} from "react";
import FetchAPI from "./FetchAPI";

export default async function Destinations():Promise<void> {
  
  const [apiData,setApiData]= useState('')

useEffect(()=>{
console.log(apiData)
},[apiData])


  const API_KEY=process.env.REACT_APP_Destinations_KEY
  const API_SECRET=process.env.REACT_APP_Destinations_SECRET

// Destinations
console.log(`The Destinations Response:`)
const url:string ='https://apigw.singaporeair.com/api/uat/v1/destinations/get';
const signature = await hash(API_KEY.concat(API_SECRET,(Math.round(Date.now()/1000)).toString()))
console.log(signature)

function hash(string:string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }

const params = {
    headers: {
      "Content-Type": "application/json",
      "x-csl-client-uuid": `${nanoid()}`,
      "x-signature":signature,
      api_key: API_KEY,
    },
    method: "POST",
  };

FetchAPI(url,params,setApiData)


}

