"use server"
import prisma from "../../../prisma";
import {connectDB} from "@/app/lib/helpers";

export const getAllTopics = async () => {

    try {
        await connectDB()
        return await prisma.topic.findMany()

    } catch (e) {
        console.log("Error ", e)

    }
}