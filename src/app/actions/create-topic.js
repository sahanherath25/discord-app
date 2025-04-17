"use server"

import {z} from "zod";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

import {getServerSession} from "next-auth";
import {connectDB, generateSlug} from "@/app/lib/helpers";
import prisma from "../../../prisma";
import {navigate} from "next/dist/client/components/segment-cache/navigation";
import {redirect} from "next/navigation";
import axios from "axios";
import {revalidatePath} from "next/cache";

// TODO Created Schema
const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {message: "Must Be Lowercase or With Dashes"}),
    description: z.string().min(10)
})


export async function createTopic(formState, formData) {


    console.log("server action in Server")

    const name = formData.get("name");
    const description = formData.get("description");
    const currentState = {name, description};

    //
    // console.log("current Form State ",currentState)
    // console.log("FormData ",formData)


//     TODO Revalidate Home  Page

    const result = createTopicSchema.safeParse(
        {
            name: formData.get("name"),
            description: formData.get("description")
        }
    )

    if (!result.success) {
        return {
            ...currentState,
            errors: result.error.flatten().fieldErrors
        }
    }

    // TODO Check If User is LoggedIn or Not
    const session = await getServerSession(authOptions)

    // console.log("SESSIONS ", session)
    // const session=await getServerSession(authOptions);
    if (!session || !session.user) {

        return {
            ...currentState,
            errors: {
                _form: "You must Login to the System to create topics"
            }
        }
    }

    // TODO Saving user to the DataBase

    // console.log("Data to Submit ", result)

    // const createdSlug=generateSlug(result.data.name)


    try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`,{data:{
            ...result.data, slug:result.data.name
            }})



    } catch (e) {

        console.log("Error ", e)

        if(e instanceof Error) {
            return {
                errors: {
                    _form:e.message,
                }
            }
        }else {
            return {
                errors: {
                    _form:"Something Went Wrong",
                }
            }

        }

    }


    revalidatePath("/")
    redirect("/profile")


    // console.log("Result ", result)

    // return {
    //     errors: {},
    //
    // }


}


