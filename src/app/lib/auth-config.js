import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB} from "@/app/lib/helpers";
import prisma from "../../../prisma";


export const authOptions = {

    providers: [
        GithubProvider({clientId:process.env.GITHUB_CLIENT_ID , clientSecret: process.env.GITHUB_CLIENT_SECRET}),
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
        async session({session, user}) {
            if (session && user) {
                session.user.id = user.id
            }
            return session;
        },


    }
}
