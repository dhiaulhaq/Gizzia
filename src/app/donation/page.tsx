"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, ChangeEvent } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [amount, setAmount] = useState<number>(0.99);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    
    if (isNaN(newAmount) || newAmount <= 0) {
      setError("Amount must be greater than $0.00.");
    } else if (newAmount < 0.5) {
      setError("Amount must be at least $0.50 to proceed.");
    } else {
      setError(null);  // Clear error if valid
      setAmount(newAmount);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Donation</h1>
        <h2 className="text-2xl mb-4">
          has requested
          <span className="font-bold"> ${amount}</span><br />
        </h2>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="p-2 rounded text-black"
          min="0.50"
          step="0.01"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
