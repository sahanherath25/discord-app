import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "@/components/SignInButton";



async function BlogPage() {

    const session=await getServerSession(authOptions)

    const {user}=session

    console.log("Session ",session)
    return (
        <div>
            <h1>Blogs Page</h1>
            {user?.name ? <h2>You are logged in as {user.name}</h2>:null}

            <SignInButton/>
        </div>
    );
}

export default BlogPage;


