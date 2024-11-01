import { Facebook, Twitter } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Component() {
    return (
        <>
            <Navbar />
            <section className="w-full bg-white px-4 py-12 md:py-24">
                <div className="container mx-auto max-w-6xl px-4 py-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <svg
                                className="h-6 w-6 text-blue-500"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-blue-500">Food Articles</h2>
                    </div>

                    {/* Article Grid */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left Column - Main Image */}
                        <div className="relative">
                            <Image
                                alt="Grilled meat skewers with rice"
                                className="rounded-lg object-cover"
                                height={600}
                                src="/placeholder.svg"
                                width={800}
                            />
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Healthy food choices are happy food choices
                            </h1>

                            <p className="text-gray-600">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                                enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
                                ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                consequat sunt nostrud amet.
                            </p>

                            {/* Image Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <Image
                                    alt="Healthy bowl"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/placeholder.svg"
                                    width={200}
                                />
                                <Image
                                    alt="Smoothie bowl"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/placeholder.svg"
                                    width={200}
                                />
                                <Image
                                    alt="Matcha drinks"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/placeholder.svg"
                                    width={200}
                                />
                            </div>

                            <p className="text-gray-600">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                                enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
                                ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
                                mollit. Exercitation veniam consequat sunt nostrud amet.
                            </p>

                            {/* Share Buttons */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Share with</span>
                                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                                    <Facebook className="h-5 w-5 text-gray-600" />
                                </button>
                                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                                    <Twitter className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}