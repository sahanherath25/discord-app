"use server"


// TODO Created Schema
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {z} from "zod"
import axios from "axios";
import {connectDB} from "@/app/lib/helpers";
import prisma from "../../../prisma/index";

const createPostSchema = z.object({
    title: z.string().min(3).regex(/[a-z-]/, {message: "Must Be Lowercase or With Dashes"}),
    content: z.string().min(10)
})


export const createPost = async (slug,formState, formData) => {


    console.log("SLUG IH VAE RECEVID IS ",slug)

    const title = formData.get('title');
    const content = formData.get('content');

    const currentFormState = {title, content}

    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    })

    if (!title) {
        return {
            ...currentFormState,
            errors: "Title Cannot Be E,pty"
        }
    }

    if (!content) {
        return {
            ...currentFormState,
            errors: "Content Cannot Be E,pty"
        }
    }

//     TODO if there is any error on schema validateion
    if (!result.success) {
        return {
            ...currentFormState,
            errors: result.error.flatten().fieldErrors
        }
    }

//     Check if user logged In Or Not
    const session=await getServerSession(authOptions);
    if (!session || !session.user) {

        return {
            ...currentFormState,
            errors: {
                _form: "You must Login to the System to create topics"
            }
        }
    }

    // TODO Saving user to the DataBase

    console.log("Data to Submit ", result)

    // TODO Find the Id of Slug Related

    const  topic=await prisma.topic.findFirst({where:{slug}})

    if(!topic) {
        return  { errors:{_form: "Cannot find the Topic"} }
    }

    console.log("WHERE ISTHE OGGY",session.user)

    const data={
        title:result.data.title,
        content:result.data.content,
        userId:session.user.id,
        topicId:topic.id
    }

    console.log("DATA TO SUBMIT IN DB ",data)


    try{

        await connectDB()
        const newPost=await prisma.post.create({
            data:{
                title:result.data.title,
                content:result.data.content,
                userId:session.user.id,
                topicId:topic.id

            }})

    }catch (e) {
        console.log("Error ", e)

    }


//     TODO Revalidate Topics Show Page
    return {
        errors:{}
    }

}

