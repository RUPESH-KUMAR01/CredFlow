import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import  db  from "@repo/db/client";

export const p2pTxn = async (to: string, amount: number) => {
    const session = await getServerSession(authOptions);
    console.log('Session fetched:', session);
    const from = session?.user?.id;
    amount = amount * 100; 
    if (!from) {
        console.error('No user ID in session');
        return { message: "Error while sending" };
    }

    console.log('Sender user ID:', from);

    const toUser = await db.user.findFirst({
        where: { number: to }
    });
    console.log('Recipient user fetched:', toUser);

    if (!toUser) {
        console.error('Recipient user not found');
        return { message: "User not found" };   
    }

    if (toUser.id === from) {
        console.error("Attempted self-transfer");
        return { message: "Cannot transfer to self" };
    }

    if (amount <= 0) {
        console.error("Invalid amount");
        return { message: "Amount must be greater than 0" };
    }

    try {
    await db.$transaction(async (tx) => {
        console.log('Starting transaction');

        // Lock balances
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${toUser.id} FOR UPDATE`;

        // Fetch balances
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
        });

        const toBalance = await tx.balance.findUnique({
            where: { userId: toUser.id },
        });

        console.log('Sender balance:', fromBalance);
        console.log('Recipient balance:', toBalance);

        if (!fromBalance || fromBalance.amount < amount) {
            console.error('Insufficient funds');
            throw new Error('Insufficient funds');
        }

        // Update balances
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });

        // Record transfer
        await tx.p2pTransfer.create({
        data: {
            fromUserId: Number(from),
            toUserId: toUser.id,
            amount,
            timestamp: new Date()
        }
        });

        console.log('Transfer and balances updated successfully');
    });

        return { ok: true, message: "Transfer successful" };
    } catch (error) {
    console.error('Transaction failed:', error);
        return { message: "Transfer failed", error };
    }
};
