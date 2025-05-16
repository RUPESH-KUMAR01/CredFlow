"use client";

import { useEffect, useState } from "react";
import { getRecentTransactions } from "..//../lib/Recent";
import RecentTransactions from "@repo/ui/Recent";
import { Card } from "@repo/ui/card";

export default function TransactionsPage() {
  const [txns, setTxns] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getRecentTransactions();
        setTxns(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Card title="Recent Transactions">
        <div className="pt-2 max-h-80 overflow-y-auto space-y-4 pr-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex justify-between items-center border-b pb-2 animate-pulse"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-24"></div>
                </div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return <RecentTransactions transactions={txns} />;
}