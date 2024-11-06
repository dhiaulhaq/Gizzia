"use client";

import { useState, ChangeEvent } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Heart, DollarSign } from "lucide-react";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Donation() {
  const [amount, setAmount] = useState<number>(0.5)
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);

    if (isNaN(newAmount) || newAmount <= 0) {
      setError('We kindly request a minimum donation is $0.5')
    } else if (newAmount < 0.5) {
      setError('We kindly request a minimum donation is $0.5')
    } else {
      setError(null);
      setAmount(newAmount);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold text-green-900 flex items-center justify-center">
            <Heart className="mr-2 text-red-500" /> Make a Donation
          </CardTitle>
          <CardDescription className="text-xl text-black">
            Your generosity makes a difference!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="pl-10 text-lg bg-white text-black"
                min="0.50"
                step="0.01"
                placeholder="Enter donation amount"
              />
            </div>
            <Input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="text-lg bg-white text-black"
              placeholder="Enter donation description (optional)"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={amount} description={description} />
          </Elements>
        </CardContent>
      </Card>
    </main>
  );
}
