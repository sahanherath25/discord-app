"use client"
import React from 'react';

import {useFormStatus} from "react-dom"
import {Button, CircularProgress} from "@mui/material";

function FormButton({children}) {

    const {pending}=useFormStatus();
    return (
        <Button type={"submit"} >
            {pending ? <CircularProgress size={20} /> : null}
            {children}
        </Button>
    );
}

export default FormButton;


