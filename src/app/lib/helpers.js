import prisma from "../../../prisma";

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected! to MongoDB Database");

    } catch (e) {

        console.log("Error ", e)
        throw new Error("Failed to connect to DB");
    }

}

export const paths={
    home(){
        return "/"
    },
    topicShow:(topicSlug)=>{
      return   `/topics/${topicSlug}`
    },
    postCreate:(topicSlug)=>{
        return `/topics/${topicSlug}/posts/new`
    },
    postShow:(topicSlug,postId)=>{
        return `/topics/${topicSlug}/posts/${postId}`
    },
}





