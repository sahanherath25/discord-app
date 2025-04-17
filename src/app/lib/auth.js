import NextAuth from "next-auth";
import {authOptions} from "@/app/lib/auth-config";

export const { auth, signIn, signOut } = NextAuth(authOptions);



