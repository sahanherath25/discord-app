'use server'

import {signIn} from "next-auth/react";


export  async function signInUser() {

    return  signIn("github")
}

