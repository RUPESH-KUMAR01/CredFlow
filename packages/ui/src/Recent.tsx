"use client";

import { Card } from "@repo/ui/card";

type Transaction =
  | {
      id: string;
      time: Date;
      amount: number;
      type: "P2P";
      direction: "Sent" | "Received";
      counterparty: string;
    }
  | {
      id: string;
      time: Date;
      amount: number;
      type: "BANK";
      direction: "Top-up";
      counterparty: string;
      status: "Success" | "Failure" | "Processing";
    };

export const RecentTransactions = ({ transactions }: { transactions: Transaction[] }) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  const getIcon = (txn: Transaction) => {
    if (txn.type === "BANK") {
      switch (txn.status) {
        case "Success":
          return "✅";
        case "Failure":
          return "❌";
        case "Processing":
          return "⏳";
        default:
          return "❔";
      }
    }
    return txn.direction === "Sent" ? "📤" : "📥";
  };

  const getColor = (txn: Transaction) => {
    if (txn.type === "BANK") {
      switch (txn.status) {
        case "Success":
          return "text-green-600";
        case "Failure":
          return "text-red-600";
        case "Processing":
          return "text-yellow-600";
        default:
          return "text-gray-600";
      }
    }
    return txn.direction === "Sent" ? "text-blue-600" : "text-green-600";
  };

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 max-h-80 overflow-y-auto space-y-4 pr-3">
        {transactions.map((txn) => {
          const color = getColor(txn);
          const icon = getIcon(txn);
          const isCredit = txn.direction === "Received" || txn.direction === "Top-up";

          return (
            <div
              key={txn.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center space-x-2">
                <div className={`text-xl ${color}`}>{icon}</div>
                <div>
                  <div className="text-sm font-medium">
                    {txn.type === "BANK"
                      ? "Bank Top-up"
                      : txn.direction === "Sent"
                      ? "Sent to"
                      : "Received from"}{" "}
                    {txn.counterparty}
                  </div>
                  <div className="text-slate-600 text-xs">
                    {new Date(txn.time).toDateString()}
                  </div>
                </div>
              </div>
              <div className={`text-right text-base font-semibold ${color}`}>
                {isCredit ? "+" : "-"} ₹{txn.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
export default RecentTransactions;