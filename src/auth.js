import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
// import {db} from "@/db"


const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;
const AUTH_SECRET=process.env.AUTH_SECRET;


console.log("",GITHUB_CLIENT_SECRET)
console.log("",GITHUB_CLIENT_ID)
console.log("",AUTH_SECRET)

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("MIssuing github oauth credentials")
}

//Returning a Object TODO
 const handlers=NextAuth({
    providers:[
        Github({
            clientId:GITHUB_CLIENT_ID,
            clientSecret:GITHUB_CLIENT_SECRET
        })
    ],
    callbacks:{
    //    TODO Will be called when we try to validate
    //    TODO Not Usually Need
        async session({session,user}){
           if(session && user){
               session.user.id=user.id;
           }
           return session;
        }
    },
    secret:AUTH_SECRET

})

export {handlers as GET};
export {handlers as POST};