"use server"
import prisma from "../../../prisma";
import {connectDB} from "@/app/lib/helpers";

export const getAllPosts = async () => {

    try {
        await connectDB()
        return await prisma.post.findMany()

    } catch (e) {
        console.log("Error ", e)
    }
}