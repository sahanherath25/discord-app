import prisma from "../../../../prisma/index"

export const fetchCommentsByPostId = async (postId) => {

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

