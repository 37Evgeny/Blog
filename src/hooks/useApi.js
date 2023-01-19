import { useEffect, useState } from "react";

export const useApi = (handler) =>{
    const [data,setData]= useState(null);
    const [error,setError]= useState(null);

    useEffect(()=>{
        handler()
        .then((result)=>{
            setData(result);
        })
        .catch((err)=>{
            setError(err);
        })
    }, [handler])
    return {data,setData, error}
}