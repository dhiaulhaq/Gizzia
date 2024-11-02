"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"

export default function RegisterComponent() {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    return (
        <div className="relative flex min-h-screen">
            {/* Background gambar penuh */}
            <div className="absolute inset-0">
                <img
                    src="/gizi-seimbang.jpg"
                    alt="Balanced nutrition foods"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form registrasi dengan latar belakang semi-transparan */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-8 bg-black bg-opacity-60">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-white">
                        <h1 className="text-3xl font-bold tracking-tight">Get Started Now</h1>
                        <p className="text-gray-300">
                            Please fill in the details to create your account
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            {/* Fullname */}
                            <Input
                                className="h-12 text-black bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                                placeholder="Fullname"
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />

                            {/* Username */}
                            <Input
                                className="h-12 text-black bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            {/* Email */}
                            <div className="relative">
                                <Input
                                    className="pl-10 h-12 text-black bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Input
                                    className="pl-10 h-12 text-black bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Gender */}
                            <select
                                className="h-12 text-[#4e524b] bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb] w-full"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            {/* Date of Birth */}
                            <Input
                                className="h-12 text-[#4e524b] bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                                placeholder="Date of Birth"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>

                        {/* Submit button */}
                        <Button className="w-full h-12 bg-green-700 hover:bg-green-600">
                            Sign Up
                        </Button>

                        <p className="text-center text-sm text-gray-300">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
