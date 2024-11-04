"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUp, Instagram, Twitter, Youtube } from "lucide-react"

export default function Component() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-[#1B2E20] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Social Section */}
                    <div className="space-y-6"> {/* Kurangi atau hapus `space-y` */}
                        <Link href="/" className="inline-block mb-1"> {/* Gunakan margin yang lebih kecil */}
                            <img src="/logo 3.png" className="w-32" />
                        </Link>
                        <div className="space-y-0.5"> {/* Perkecil jarak antar elemen di dalam div */}
                            <p className="text-gray-300">Copyright © 2024 GiziKite.</p>
                            <p className="text-gray-300">All rights reserved</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-gray-300">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-gray-300">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="hover:text-gray-300">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-gray-300">About us</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Blog</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Contact us</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Testimonials</Link></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-gray-300">Help center</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Terms of service</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Legal</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Privacy policy</Link></li>
                            <li><Link href="#" className="hover:text-gray-300">Status</Link></li>
                        </ul>
                    </div>

                    {/* Chatbot and Go to Top Section */}
                    <div className="flex flex-col items-end justify-between">
                        <div className="fixed bottom-4 right-4 z-50">
                            <a href="link-ke-chatbot">
                                <img src="/chatbot-removebg-preview.png" className="w-24 h-24" alt="Chatbot Icon" />
                            </a>
                        </div>
                        <div className="space-y-8">
                            <Button
                                onClick={scrollToTop}
                                className="bg-[#2C472F] hover:bg-[#3A5A3E] text-white rounded-full px-6"
                            >
                                Got To Top
                                <ArrowUp className="ml-2 h-4 w-4" />
                            </Button>
                            <p className="text-sm text-gray-300">© 2024 GiziKite. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}