import prisma from "../../../prisma";
import slugify from "slugify";

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected! to MongoDB Database");

    } catch (e) {

        console.log("Error ", e)
        throw new Error("Failed to connect to DB");
    }

}

export const paths = {
    home() {
        return "/"
    },
    topicShow: (topicSlug) => {
        return `/topics/${topicSlug}`
    },
    postCreate: (topicSlug) => {
        return `/topics/${topicSlug}/posts/new`
    },
    postShow: (topicSlug, postId) => {
        return `/topics/${topicSlug}/posts/${postId}`
    },
}


export const generateSlug = (name) => {

    return slugify(name, {lower: true})
}


export const verifyUserExists = async (user) => {

    console.log("We have reced a request to CHekc user Existancce ",user)


    try {
        await connectDB()
        const userFound = await prisma.user.findFirst({where: {email: user.email}})

        console.log("User Already Exists",userFound)

        if (userFound) {
            return null;

        } else {
            //     User Not Found
            //     TODO Create a New User and Save in DB

            const newUser = await prisma.user.create({
                data: {email: user.email, name: user.name,}
            })
            console.log("NEW USDER CREATED ",newUser)
            return newUser
        }

    } catch (e) {
        console.log("Error ", e)
    }
}




