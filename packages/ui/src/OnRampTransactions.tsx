"use client";

import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: "Success" | "Failure" | "Processing",  // More specific typing
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Success":
                return "✅";
            case "Failure":
                return "❌";
            case "Processing":
                return "⏳";
            default:
                return "❔";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Success":
                return "text-green-600";
            case "Failure":
                return "text-red-600";
            case "Processing":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <Card title="Recent Transactions">
            <div className="pt-2 max-h-80 overflow-y-auto space-y-4 pr-3">
                {transactions.map((t, index) => {
                    const time = new Date(t.time);
                    const statusIcon = getStatusIcon(t.status);
                    const statusColor = getStatusColor(t.status);

                    return (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`text-xl ${statusColor}`}>
                                    {statusIcon}
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        Received INR
                                    </div>
                                    <div className="text-slate-600 text-xs">
                                        {time.toDateString()}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`text-right text-base font-semibold ${statusColor}`}
                            >
                                + ₹{t.amount / 100}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
