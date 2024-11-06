import { CircleCheck } from "lucide-react";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="bg-[#f8ffe6] p-5">
      <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-green-600 to-green-800">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Donation success!</h1>
          <div className="flex justify-center m-5">
            <CircleCheck className="h-32 w-32" />
          </div>
          <h2 className="text-1xl">
            Thank you for your contribution, stay tuned for more updates from
            us.
          </h2>

          <div className="bg-white p-2 rounded-md text-[#113d1e] mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
      </div>
    </main>
  );
}
