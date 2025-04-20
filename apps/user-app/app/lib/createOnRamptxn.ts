"use server";
import db from "@repo/db/client";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";


export async function createOnRamptxn(amount:number,provider:string){
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("Not authenticated");
    }
    const userId = session.user.id;
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const token = randomUUID();
    const onRampTxn = await db.onRampTransaction.create({
        data:{
            userId:Number(userId),
            startTime:new Date(),
            amount:amount,
            status:"Processing",
            provider:provider,
            token:token 
        }
    });
    return onRampTxn;
}
