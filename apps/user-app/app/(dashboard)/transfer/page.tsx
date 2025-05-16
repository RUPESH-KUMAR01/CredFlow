import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import  db  from "@repo/db/client";
import { AddMoney } from "@repo/ui/Addmoney";
import { BalanceCard } from "@repo/ui/BalanceCard";
import { OnRampTransactions } from "@repo/ui/OnRampTransactions";
async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance  = await db.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    }
}

async function getonRampTransactions(){
    const session = await getServerSession(authOptions);
    const transactions = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return transactions.map((transaction) => ({
        time: transaction.startTime,
        amount: transaction.amount,
        status: transaction.status,
        provider: transaction.provider,
    }));
}
export default async function TransferPage(){
    const balance = await getBalance();
    const transactions = await getonRampTransactions();
    return (
        <div>
            <div className="text-2xl text"> 
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}