import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Component() {
    const articles = [
        {
            category: "Weight Loss",
            title: "The Benefits of Hydration for Weight Loss",
            description: "Discover how staying hydrated can support your weight loss goals and improve overall health.",
            image: "/Image.png",
        },
        {
            category: "Mindful Eating",
            title: "Cultivating a Healthy Relationship with Food",
            description: "Learn how practicing mindful eating can help you develop a healthier relationship with food and improve your overall well-being.",
            image: "/Image (1).png",
        },
        {
            category: "Understanding Macronutrients",
            title: "Carbohydrates, Proteins, and Fats",
            description: "Get a comprehensive understanding of macronutrients and their role in your diet for optimal health and weight management.",
            image: "/Image (2).png",
        },
        {
            category: "Healthy Snacks on the Go",
            title: "Quick and Nutritious Options",
            description: "Explore a variety of convenient and healthy snack ideas to keep you fueled throughout the day.",
            image: "/Image (3).png",
        },
    ]

    return (
        <section className="py-12 bg-[#f9f9f9]">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-black mb-4">Our Articles</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our blog is a treasure trove of informative and engaging articles written by our team of nutritionists,
                        dietitians, and wellness experts. Here's what you can expect from our blog.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article, index) => (
                        <Card key={index} className="border-none bg-[#edf7de] overflow-hidden">
                            <CardHeader className="p-0">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-[300px] object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-sm text-[#3e4249] mb-2">{article.category}</div>
                                <h3 className="text-2xl text-[#3e4249] font-semibold mb-3">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                            </CardContent>
                            <CardFooter className="px-6 pb-6 pt-0">
                                <Button
                                    variant="link"
                                    className="px-0 text-[#1B2E20] hover:text-[#2C472F] font-semibold"
                                >
                                    Read more...
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}