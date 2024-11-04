export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="bg-[#f8ffe6] p-5">
      <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-green-600 to-[#113d1e]">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">Successfully sent donation!</h2>
          <h2 className="pt-4">We love you :3</h2>

          <div className="bg-white p-2 rounded-md text-[#113d1e] mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
      </div>
    </main>
  );
}
