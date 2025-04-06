"use server"
import { useSession, signIn, signOut } from "next-auth/react";

export async function signInUser() {
    return signIn("github")
}

export async function signOutUser() {
    return signOut()
}
