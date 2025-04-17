import prisma from "../../../../prisma/index"
import {connectDB} from "@/app/lib/helpers";


export const postWithData = async () => {

}

// TODO To get all the data
export const fetchPostBySlug = async (slug) => {


    try {
        await connectDB();
        // TODO return a promise
        return  prisma.post.findMany({
                where: {topic: {slug: slug}},
                include: {
                    topic: {select: {slug: true}},
                    user: {select: {name: true}},
                    _count: {select: {comments: true}}
                }
            }
        );

    } catch (e) {

        console.log("Error ", e)

    }

}

