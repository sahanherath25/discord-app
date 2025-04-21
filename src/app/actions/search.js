"use server"

import {redirect} from "next/navigation";

export const search=async (formData)=>{

    console.log("SERVER ACTON TERM is ",formData)

    // TODO Get the term in the search
    const term=await formData.get("term")

    console.log("SERVER ACTON TERM is ",term)

    if(!term){
        redirect(`/`)
    }else {

    }

    redirect(`/search?term=${term}`)
}