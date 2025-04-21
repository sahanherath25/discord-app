import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import {connectDB, verifyUserExists} from "@/app/lib/helpers";
import prisma from "../../../../../prisma";

// const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;
// const AUTH_SECRET=process.env.AUTH_SECRET;
//
//
// console.log("",GITHUB_CLIENT_SECRET)
// console.log("",GITHUB_CLIENT_ID)
// console.log("",AUTH_SECRET)
//
// if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
//     throw new Error("MIssuing github oauth credentials")
// }


export const authOptions = {

    providers: [
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID ,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization:{
                params:{
                    scope: 'read:user user:email',
                }
            }

        }),
        GoogleProvider({clientId: process.env.GOOGLE_CLIENT_ID, clientSecret:process.env.GOOGLE_CLIENT_SECRET }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {type: "text"},
                password: {type: "password"},
                async authorize(credentials) {

                    if (!credentials || !credentials.email || !credentials.password) {
                        return null;
                    }
                    try {

                        await connectDB()

                        //     TODO find user with email matching
                        const foundUser = await prisma.findFirst({where: {email: credentials.email}});

                        if (!foundUser) return null;
                        if (!foundUser.password) return null;

                        //     TODO comparing user provided password with stored password
                        //     const isPasswordMatching=


                    } catch (e) {
                        console.log("Error ", e)

                    }

                }
            }
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {

            console.log("TOKEN ",token)
            console.log("USER I N JWT  ",user)
            // Runs only on first login
            if (user) {
                token.id = user.id; // Use DB ID
                token.sub = user.id; // Use DB ID
            }
            return token;
        },
        async session({session, token}) {
            // if (session && user) {
            //     session.user.id = user.id
            // }

            if (session && token) {
                session.user.id = token.id

                console.log("Session ID ",session.user.id)
            }
            return session;
        },
        async signIn({account,user,profile}) {

            // Check if user
            if(account?.provider==="github"|| account?.provider==="google"){
                const newUser=await verifyUserExists(user)

                console.log("Before verifyUserExists - user.id:", user?.id);

                if(newUser !==null){
                    user.id=newUser?.id;

                    if(profile && profile.sub){
                        profile.sub=newUser.id;
                        console.log("PROFILE SUB", profile.sub)
                    }
                }
            }
            // TODO SignIn expect boolean to return
            return true

        },
        async redirect(){
            return "/"
        }
    }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}






