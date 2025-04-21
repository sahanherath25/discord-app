import prisma from "../../../../prisma/index"
import {cache} from "react";


export const fetchCommentsByPostId = cache(async (postId) => {

        console.log("Function is calling ")

//     TODO Getting all the comments with provided postId
        return prisma.comment.findMany({
            where:{postId:postId},
            include: {
                user:{
                    select: {
                        name: true,
                        image:true
                    }
                }
            }
        })
    }
)



