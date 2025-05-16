"use client";


export const BalanceCard = ({ amount, locked }:{
    amount: number;
    locked: number;
}) => {
    return (
        <div className="w-full p-4 rounded-lg shadow-md border border-slate-300">
            <h2 className="text-xl font-semibold">Balance</h2>
            <div className="flex justify-between mt-4">
                <div>
                    <p className="text-gray-600">Available Balance</p>
                    <p className="text-2xl font-bold">{amount/100}</p>
                </div>
                <div>
                    <p className="text-gray-600">Locked Amount</p>
                    <p className="text-2xl font-bold">{locked/100}</p>
                </div>
            </div>
        </div>
    );
}