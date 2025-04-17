import prisma from"../../prisma/index"
import {notFound} from "next/navigation";

export  async function PostShow({postId}) {

    const post=await prisma.post.findFirst({where:{id:postId}})

    console.log("POSTS IN DETAIL PAGE FOUND ",post)

    if(!post){
        notFound()
    }


    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold my-2">{post.title}</h1>
            <p className="p-4 border rounded">{post.content}</p>
        </div>
    );
}

export default PostShow
