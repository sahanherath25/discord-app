"use client"
import {NextUIProvider} from "@nextui-org/react";

// import "../auth"

export default function Providers({children}){

    return(
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )

}