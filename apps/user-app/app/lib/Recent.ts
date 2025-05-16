'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import  db  from '@repo/db/client';

export const getRecentTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const userIdInt = Number(userId); // 🛠️ Fix: convert string to integer

  // Fetch P2P transactions where the user is sender or receiver
  const p2pTxns = await db.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userIdInt },
        { toUserId: userIdInt }
      ]
    },
    include: {
      fromUser: true,
      toUser: true
    },
    orderBy: {
      timestamp: 'desc'
    },
    take: 20
  });

  // Fetch OnRamp (bank top-up) transactions
  const bankTxns = await db.onRampTransaction.findMany({
    where: {
      userId: userIdInt
    },
    orderBy: {
      startTime: 'desc'
    },
    take: 20
  });

  // Normalize both types to a common structure
  const normalizedP2P = p2pTxns.map(txn => ({
    id: `p2p-${txn.id}`,
    time: txn.timestamp,
    amount: txn.amount,
    type: "P2P" as const,
    direction: txn.fromUserId === userIdInt ? "Sent" : "Received",
    counterparty: txn.fromUserId === userIdInt ? txn.toUser.number : txn.fromUser.number
  }));

  const normalizedBank = bankTxns.map(txn => ({
    id: `bank-${txn.id}`,
    time: txn.startTime,
    amount: txn.amount,
    type: "BANK" as const,
    direction: "Top-up" as const,
    counterparty: txn.provider,
    status: txn.status
  }));

  const all = [...normalizedP2P, ...normalizedBank];
  all.sort((a, b) => b.time.getTime() - a.time.getTime());

  return all.slice(0, 15); // Return top 15
};