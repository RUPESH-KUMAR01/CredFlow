import { p2pTxn } from '../../../apps/user-app/app/lib/p2ptxn';
import { redirect } from 'next/navigation';

export async function Form() {
  async function handleTransfer(formData: FormData) {
    'use server';

    const recipient = formData.get('recipient') as string;
    const amount = Number(formData.get('amount'));

    const res = await p2pTxn(recipient, amount);

    if (!res.ok) {
      throw new Error(res.message);
    }

    redirect('/dashboard'); // Or wherever
  }

  return (
    <form action={handleTransfer} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="recipient" className="block mb-1 font-medium">
          Recipient Phone Number
        </label>
        <input
          id="recipient"
          name="recipient"
          type="text"
          className="w-full p-2 border rounded text-slate-900"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block mb-1 font-medium">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          className="w-full p-2 border rounded text-slate-900"
          min="1"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 my-2"
      >
        Send Money
      </button>
    </form>
  );
}
