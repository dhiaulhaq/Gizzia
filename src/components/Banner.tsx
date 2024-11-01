import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <section className="w-full bg-white px-4 py-12 md:py-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#424242] leading-tight">
                        Check the food you consume,{" "}
                        <span className="text-[#B4D767] block">
                            we will recommend healthy food and lifestyle
                        </span>
                    </h1>
                    <Button
                        className="bg-[#1B2E20] hover:bg-[#2C472F] text-white px-5 py-3 h-auto text-lg"
                    >
                        Register
                    </Button>
                </div>
                <div className="relative">
                    <img
                        src="/pngwing 2.png"
                        alt="Healthy food bowl with salmon, avocado, and vegetables"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}
