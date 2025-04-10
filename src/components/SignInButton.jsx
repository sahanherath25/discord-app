"use client"
import React from 'react';
import {Button} from "@nextui-org/react";
import * as actions from "@/app/actions/index";
import {signIn} from "next-auth/react";


function SignInButton(props) {
 return (

     <form action={signIn} >
         <Button type={"submit"}>
             SignIn
         </Button>
     </form>

 );}

export default SignInButton;