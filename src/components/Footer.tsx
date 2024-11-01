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
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold">
                            Gizzia
                        </Link>
                        <div className="space-y-2">
                            <p className="text-gray-300">Copyright © 2024 GiziKite.</p>
                            <p className="text-gray-300">All rights reserved</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-gray-300">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-gray-300">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zM1.333 12c0-.076.008-.152.016-.226 3.868-.013 7.25-.48 10.143-1.402.563 1.148 1.103 2.319 1.615 3.518-2.126.861-3.95 2.067-5.43 3.621C4.883 15.842 2.718 13.166 1.333 12zm5.339 7.486c1.283-1.384 2.911-2.474 4.864-3.255.877 2.256 1.638 4.563 2.228 6.944-1.539.643-3.203.975-4.764.975-2.275 0-4.368-.779-6.043-2.072l3.715-2.592zm8.184 2.231c-.643-2.283-1.428-4.502-2.354-6.673 1.928-.314 4.013-.273 6.263.123-.708 2.962-2.473 5.522-4.909 6.55z" />
                                </svg>
                                <span className="sr-only">Dribbble</span>
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
                        <div className="text-[#3B82F6]">
                            <svg
                                className="w-12 h-12"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H13V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H11V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" />
                            </svg>
                            <span className="block text-center text-sm mt-1">Chatbot</span>
                        </div>
                        <div className="space-y-4">
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
        </footer>
    )
}