"use server"
import {z} from "zod";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../prisma";
import {revalidatePath} from "next/cache";

const createCommentSchema = z.object({
    content: z.string().min(3),
});

export async function createComment({postId, parentId}, formState, formData) {
    console.log("Creating comment...")

    const comment = formData.get("content");

    console.log("Creating comment...",comment)

    const currentState = {content: comment};

    const result = createCommentSchema.safeParse({
        content: formData.get("content"),
    });

    console.log("CREATING COMMEN POSTID T ", postId)
    console.log("CREATING COMMENT PARENT ID ", parentId)
    console.log("CREATING COMMENT  ", result.data)

    if (!result.success) {
        return {
            ...currentState,
            errors: result.error.flatten().fieldErrors
        }
    }

    // TODO Check If User is LoggedIn or Not
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {

        return {
            ...currentState,
            errors: {
                _form: "You must Login to the System to create topics"
            }
        }
    }

    const data = {
        postId,
        parentId,
        content: comment,
        userId: session.user.id,
    }

    console.log("COMMENT DATA ", data)
    console.log("USER  ", session.user)


    try {
        const comment = await prisma.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                parentId: parentId,
                userId: session.user.id,
            }
        })

    } catch (err) {

        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ["Something went wrong..."],
                },
            };
        }
    }


    // const  topic=await prisma.topic.findFirst({where:{slug}})

    const topic = await prisma.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });

    console.log("Topic Found")


    if (!topic) {
        return {errors: {_form: "Cannot find the Topic"}}
    }
    //
    //
    if (!topic) {
        return {
            errors: {
                _form: ["Failed to revalidate topic"],
            },
        };
    }




//  TODO Revalidate Post Show Page

    revalidatePath(`/topics/${topic.slug}/${postId}`)

    return {
        errors: {},
        success: true,
    };
}

