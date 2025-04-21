import prisma from "../../../../prisma/index"
import {connectDB} from "@/app/lib/helpers";


export const fetchPostBySearchTerm=async(term)=>{

    return prisma.post.findMany({
        where:{
            OR:[
                {title:{contains:term}},
                {content:{contains:term}}
            ]
        },
        include:{
            topic:{select:{slug:true}},
            user:{select:{name:true,image:true}},
            _count:{select:{comments:true}},
        }
    })
}


export const fetchTopPost = async () => {

    return prisma.post.findMany({
        orderBy:[
            {
                comments:{
                    _count:"desc"
                }
            }
        ],
        include:{
            topic: {select: {slug: true}},
            user: {select: {name: true}},
            _count: {select: {comments: true}}
        }
        // only take 5
        , take:5

    })
}

// TODO To get all the data
export const fetchPostBySlug = async (slug) => {

    try {
        await connectDB();
        // TODO return a promise
        return prisma.post.findMany({
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

