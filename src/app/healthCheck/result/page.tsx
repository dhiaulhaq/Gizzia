"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <div className="min-h-screen bg-white">
            <div className="grid md:grid-cols-2 gap-0 h-full">
                {/* Left Side - Full-Height Image Grid */}
                <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-0 h-screen">
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Healthy fruits"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Fresh vegetables"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Healthy snacks"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Fresh fruits"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-none"
                        />
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex flex-col justify-center items-center p-8 h-screen bg-white space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="text-gray-900">Health </span>
                            <span className="text-[#bcd374]">Check</span>
                        </h1>
                        <p className="text-gray-600">check your daily health here</p>
                    </div>

                    {/* Status */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            The current state of your body
                        </h2>
                        <p className="text-5xl font-bold text-[#47715a] text-center py-8">
                            "Healthy"
                        </p>
                    </div>

                    {/* Recommendation Section */}
                    <div className="space-y-4">
                        <p className="text-gray-600 text-center">
                            Do you need recommendations for healthy eating and living patterns?
                            <a href="/healthCheck/result/recommendation"
                                className="inline-block w-full">
                                <Button
                                    className="bg-[#47715a] hover:bg-[#3a5c48] text-white py-6 text-lg font-medium"
                                >
                                    RECOMMENDATION
                                </Button>
                            </a>
                        </p>
                    </div>
                </div>
                <button
                    className="fixed bottom-4 right-4 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-lg
                        hover:from-green-400 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
                    onClick={() => window.location.href = '/healthCheck'}
                >
                    Back
                </button>
            </div>
        </div>

    )
}