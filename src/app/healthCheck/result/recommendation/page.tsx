"use client"

import Image from "next/image"

export default function Component() {
    return (
        <div className="min-h-screen bg-[#f8ffe6]">
            {/* Header */}
            <header className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-2">
                    <span className="text-gray-900">Health </span>
                    <span className="text-[#bcd374]">Check</span>
                </h1>
                <p className="text-gray-600">check your daily health here</p>
            </header>

            {/* Recommendations */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Food Recommendations */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-[#000000] font-bold mb-6 border-b-2 border-[#47715a] pb-2">
                            Food Recommendations
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">1. Complex Carbohydrates</h3>
                                <p className="text-gray-500">
                                    Choose complex carbohydrates such as brown rice, quinoa, oatmeal, and sweet potatoes.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">2. High Quality Protein</h3>
                                <p className="text-gray-500">
                                    Consume protein from quality sources such as fish (especially salmon, tuna and sardines which are rich in omega-3 fatty acids), skinless chicken, eggs, nuts and tempeh/tofu.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">3. Healthy Fats</h3>
                                <p className="text-gray-500">
                                    Healthy fats from avocados, olive oil, nuts, and seeds help support heart health.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">4. Colorful Vegetables</h3>
                                <p className="text-gray-500">
                                    Vegetables such as spinach, broccoli, carrots, peppers and tomatoes.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">5. Fruits with Natural Sugar</h3>
                                <p className="text-gray-500">
                                    Fruits such as apples, oranges, bananas and berries contain many vitamins and minerals.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lifestyle Recommendations */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-[#000000] font-bold mb-6 border-b-2 border-[#47715a] pb-2">
                            lifestyle recommendations
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">1. Regular Exercise</h3>
                                <p className="text-gray-500">
                                    Type of exercise: Combine cardio (such as jogging, cycling or swimming), recommended for a minimum of 150 minutes or 75 minutes.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">2. Get enough and quality sleep</h3>
                                <p className="text-gray-500">
                                    Sleep duration: Try to get 7-8 hours of sleep every night. Put away electronic devices at least 30 minutes before bed, and be consistent.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">3. Limit sugar and salt consumption</h3>
                                <p className="text-gray-500">
                                    Reduce consumption of sweet foods, fizzy drinks, and foods high in sodium such as processed foods and fast food.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">4. Routine health checks</h3>
                                <p className="text-gray-500">
                                    Have an annual health check.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#000000] mb-2">5. Avoid Bad Habits</h3>
                                <p className="text-gray-500">
                                    If you smoke, consider quitting, and limit alcohol consumption.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Images */}
                <div className="mt-12 grid md:grid-cols-2 gap-0">
                    <div className="w-full">
                        <Image
                            src="/Image (3).png"
                            alt="Healthy fruits and vegetables"
                            width={600}
                            height={300}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full">
                        <Image
                            src="/Image (3).png"
                            alt="Healthy snacks"
                            width={600}
                            height={300}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    </div>
                </div>
            </main>
            <button
                className="fixed bottom-4 right-4 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-lg
                        hover:from-green-400 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
                onClick={() => window.location.href = '/'}
            >
                Back to Home
            </button>
        </div>
    )
}