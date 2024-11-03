import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Facebook, Twitter } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Component() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f8f9e8]">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
                    <div className="container mx-auto flex h-16 items-center px-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-medium text-blue-500">Result Food</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Left Column - Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            <h1 className="text-4xl font-bold text-gray-900">Gado-gado</h1>

                            <p className="text-gray-700">
                                Gado-gado adalah hidangan tradisional Indonesia yang berupa salad sayuran dengan saus kacang.
                                Hidangan ini menggabungkan sayuran segar, protein, dan karbohidrat yang dilengkapi saus kacang khas.
                            </p>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Komposisi Utama</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-black">1. Sayuran:</h3>
                                        <p className="font-medium text-gray-700">Bayam, kangkung, kol, tauge, wortel, kacang panjang, kentang</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black">2. Pelengkap Protein:</h3>
                                        <p className="font-medium text-gray-700">Tahu, tempe, telur rebus</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black">3. Karbohidrat:</h3>
                                        <p className="font-medium text-gray-700">Lontong atau ketupat</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black">4. Saus:</h3>
                                        <p className="font-medium text-gray-700">Saus kacang yang terdiri dari kacang tanah, bawang putih, cabai, gula merah, air asam jawa, dan kecap manis</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black">5. Tambahan Pelengkap:</h3>
                                        <p className="font-medium text-gray-700">Bawang goreng, kerupuk, timun atau tomat</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <Image
                                    alt="Gado-gado presentation 1"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/gado1.jpg"
                                    width={300}
                                />
                                <Image
                                    alt="Gado-gado presentation 2"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/gado2.webp"
                                    width={300}
                                />
                                <Image
                                    alt="Gado-gado presentation 3"
                                    className="rounded-lg object-cover"
                                    height={200}
                                    src="/gado3.webp"
                                    width={300}
                                />
                            </div>

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

                        {/* Right Column - Nutritional Information */}
                        <div className="space-y-6">
                            <Card className="bg-[#f0f5e5]">
                                <CardHeader>
                                    <CardTitle className="font-semibold text-black">Informasi Gizi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-black">Kandungan Gizi</h3>
                                            <ul className="mt-2 space-y-2 text-black text-sm">
                                                <li>Serat</li>
                                                <li>Vitamin A & C</li>
                                                <li>Protein</li>
                                                <li>Lemak Sehat</li>
                                                <li>Karbohidrat</li>
                                                <li>Kalori</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black">Manfaat Utama</h3>
                                            <ul className="mt-2 space-y-2 text-black text-sm">
                                                <li>Mendukung pencernaan dan rasa kenyang</li>
                                                <li>Mendukung kesehatan mata dan imun tubuh</li>
                                                <li>Pembentukan dan perbaikan jaringan</li>
                                                <li>Mendukung kesehatan jantung</li>
                                                <li>Sumber energi</li>
                                                <li>Sekitar 300-400 kalori per porsi</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#1f2937] text-white">
                                <CardHeader>
                                    <CardTitle>Nilai Gizi Rata-rata (per porsi)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li>Kalori: 300-400 kalori</li>
                                        <li>Protein: 10-15 gram</li>
                                        <li>Karbohidrat: 35-45 gram</li>
                                        <li>Lemak: 15-20 gram</li>
                                        <li>Serat: 6-8 gram</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}