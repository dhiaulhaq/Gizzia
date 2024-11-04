import { Facebook, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data JSON
const articleData = {
    "title": "Kaitan Antara Diet dan Kesehatan Anak",
    "content": "Pola makan yang sehat memiliki dampak besar terhadap kesehatan dan perkembangan anak. Nutrisi yang baik tidak hanya penting untuk pertumbuhan fisik, tetapi juga berperan dalam perkembangan kognitif, emosi, dan perilaku.\n\n1. Nutrisi dan Pertumbuhan Fisik\nDiet seimbang yang kaya akan vitamin, mineral, protein, lemak sehat, dan karbohidrat kompleks sangat penting untuk pertumbuhan fisik anak. Nutrisi yang memadai membantu memastikan bahwa anak tumbuh dengan baik.\n\n2. Perkembangan Kognitif\nNutrisi yang tepat juga berperan dalam perkembangan otak. Beberapa nutrisi, seperti omega-3 dan zat besi, memiliki pengaruh positif pada kemampuan kognitif.\n\n3. Kesehatan Mental dan Emosi\nDiet yang buruk dapat berdampak negatif pada kesehatan mental anak. Konsumsi makanan tinggi gula dan lemak jenuh sering dikaitkan dengan peningkatan risiko depresi dan kecemasan.\n\n4. Kebiasaan Makan Sejak Dini\nPenting bagi orang tua untuk menanamkan kebiasaan makan yang sehat sejak dini. Anak-anak yang terpapar pada berbagai jenis makanan sehat lebih mungkin untuk mengembangkan selera yang baik.\n\n5. Mengatasi Masalah Obesitas\nMasalah obesitas anak menjadi semakin umum, dan diet berperan besar dalam hal ini. Makanan olahan, tinggi gula, dan rendah nutrisi berkontribusi pada penambahan berat badan yang tidak sehat.",
    "imageUrl": "https://static.mooimom.id/media/id_mamapedia/tips-diet-sehat-untuk-ibu-menyusui-main.jpg",
    "category": "Penelitian",
    "tags": ["diet", "kesehatan anak", "penelitian"],
    "userId": "67236108fae4ae81e0eba74d",
    "createdAt": "2024-11-02T18:00:00Z",
    "updatedAt": "2024-11-02T18:00:00Z"
}

export default function Component() {
    return (
        <>
            <Navbar />
            <section className="w-full bg-white px-4 py-12 md:py-24">
                <div className="container mx-auto max-w-6xl px-4 py-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-2">
                        <h2 className="text-xl font-medium text-blue-500">{articleData.category} Articles</h2>
                    </div>

                    {/* Article Content */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left Column - Main Image */}
                        <div className="relative">
                            <img
                                alt={articleData.title}
                                className="rounded-lg object-cover w-full h-auto"
                                src={articleData.imageUrl}
                            />
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                {articleData.title}
                            </h1>

                            <p className="text-gray-600 whitespace-pre-line">
                                {articleData.content}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {articleData.tags.map((tag, index) => (
                                    <span key={index} className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>

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
    );
}
