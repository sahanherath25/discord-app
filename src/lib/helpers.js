import prisma from "../../prisma";

const connectDB = async () => {

    try {
        await prisma.$connect();
        console.log("Connected! to MongoDB Database");

    } catch (e) {

        console.log("Error ", e)
        throw new Error("Failed to connect to DB");
    }

}


