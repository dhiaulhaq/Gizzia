import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <section className="w-full bg-[#f9f9f9] px-4 py-12 md:py-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                    {/* Decorative circle background */}
                    <div className="absolute -z-10 right-0 bottom-0 w-3/4 aspect-square rounded-full bg-[#f1f5f9]" />

                    {/* Decorative floating dots */}
                    <div className="absolute -z-10 right-16 bottom-16">
                        <div className="w-24 h-24 opacity-20">
                            <div className="absolute w-2 h-2 bg-slate-400 rounded-full" style={{ boxShadow: '0 0 0 0 rgba(0, 0, 0, 1)', transform: 'scale(1)', animation: 'pulse 2s infinite' }}></div>
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 bg-slate-400 rounded-full"
                                    style={{
                                        transform: `rotate(${i * 18}deg) translate(40px)`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative rounded-full overflow-hidden">
                        <img
                            src="/website-cms-16939727505252906.webp"
                            alt="Person working at desk with laptop"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
                {/* Left Section */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-sm text-green-800 font-extrabold uppercase tracking-wide text-muted-foreground">About Us</h2>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-green-800">
                            "Gizzia: Nutrition Insights for All, Healthier Living Every Day!"
                        </h1>
                    </div>
                    <div className="space-y-4 text-lg text-muted-foreground text-black">
                        <p>
                            Gizzia is a nutrition education platform designed for a wide range of people. Gizzia's goal is to provide a deep understanding of the importance of nutrition and a healthy lifestyle through comprehensive information. By using Gizza, users can learn about nutrition and share information with each other. In addition, users can also find out the level of health of users and identify the nutrition of a food more easily.
                        </p>
                    </div>
                    <a href="/food-check" className="inline-block">
                        <Button size="lg" className="bg-[#6366f1] hover:bg-[#5558e6] text-white px-8">
                            Food Check for Free
                        </Button>
                    </a>
                </div>

                {/* Right Section */}
            </div>
        </section>
    )
}
