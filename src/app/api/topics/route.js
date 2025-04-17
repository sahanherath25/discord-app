import {connectDB} from "@/app/lib/helpers";
import prisma from "../../../../prisma";
import {NextResponse} from "next/server";

export const POST = async (req) => {


    console.log("We have Reced Your Data Sahan Fro mAPI ")
    const {data} = await req.json()
    console.log("Request ", data)

    try {

        await connectDB()

        const newTopic = await prisma.topic.create({data: {description: data.description, slug: data.slug}})

        console.log("New Topic", newTopic)
        return NextResponse.json({message: "success"}, {status: 201})

    } catch (e) {

        console.log("Error ", e.message)

        return NextResponse.json({message: "fail", error: e.message}, {status: 403})

    } finally {
        prisma.$disconnect();
    }


}

export const GET =async () => {

    try {

        await connectDB();

        const topicsFound=await prisma.topics.findMany();

        if(topicsFound.length>0){

            return NextResponse.json({message: "success",data:topicsFound},{status:200})
        }else {
            return NextResponse.json({message: "success",data:"No Topics at the Moment"},{status:200})
        }

    } catch (e) {

        console.log("Error ", e)
        return NextResponse.json({message: "fail",error:e.message},{status:403})
    }

}