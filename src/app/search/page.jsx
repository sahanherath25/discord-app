import React from 'react';
import {redirect} from "next/navigation";
import PostList from "@/components/PostList";
import {fetchPostBySearchTerm} from "@/app/lib/queries/posts";


// TODO Client Component
async function Page({searchParams}) {

    const {term}=await searchParams;

    console.log("TERIM IS ",term)

    if(!term){
        redirect(("/"))
    }
    return (
        <div>
            you are serachign for {term}
            <PostList fetchData={()=>fetchPostBySearchTerm(term)}/>
        </div>
    );
}

export default Page;


