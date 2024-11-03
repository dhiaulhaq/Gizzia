"use client";

import React from 'react';
import Image from "next/image";
import { Activity, HeartPulse, Scale, Utensils } from 'lucide-react';
import { SectionTitle } from "@/components/Section";

export default function HealthCheck() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid md:grid-cols-2 gap-0 h-full">
                {/* Left Side - Form Section */}
                <div className="bg-white rounded-none shadow-lg p-8 h-full overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">
                        <span className="text-gray-900">Health </span>
                        <span className="text-[#bcd374]">Check</span>
                    </h1>
                    <p className="text-center text-gray-600 mb-8">Check your daily health here</p>

                    <form className="space-y-8">
                        {/* Physical Parameters */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <SectionTitle icon={Scale} title="Physical Parameters" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Body Weight (kg)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Body Height (cm)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Systolic"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="mt-1">/</span>
                                        <input
                                            type="number"
                                            placeholder="Diastolic"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Medical History */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <SectionTitle icon={HeartPulse} title="Medical History" />
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Medical History</label>
                                    <textarea
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mental Health</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="Stable">Stable</option>
                                        <option value="Stressed">Stressed</option>
                                        <option value="Depressed">Depressed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Eating Habits */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <SectionTitle icon={Utensils} title="Eating Habits" />
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Consumption</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="number"
                                            placeholder="Meals per day"
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <select
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="Less">Less</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Extra">Extra</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Foods (e.g., rice, fish, orange)"
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hydration (liters per day)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <SectionTitle icon={Activity} title="Lifestyle" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sleep (hours per day)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Smoking</label>
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="ml-2">Yes, I smoke</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Alcohol Consumption</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="Not Consuming">Not Consuming</option>
                                        <option value="Less">Less</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Extra">Extra</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Submit Health Check
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side - Image Collage */}
                <div className="hidden md:grid grid-cols-2 gap-0 h-screen">
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Healthy fruits"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Fresh vegetables"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Healthy snacks"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-none"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/Image (3).png" // Replace with your actual image path
                            alt="Fresh fruits"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-none"
                        />
                    </div>

                    <button
                        className="fixed bottom-4 right-4 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-lg
                        hover:from-green-400 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
                        onClick={() => window.location.href = '/'}
                    >
                        Back
                    </button>
                </div>
            </div>
            {/* <button
                className="fixed bottom-4 right-4 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg
                    hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105"
                onClick={() => window.location.href = '/'}
            >
                Back to Home
            </button> */}
        </div>
    );
}
