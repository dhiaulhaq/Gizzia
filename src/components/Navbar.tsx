import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
    return (
        <header className="bg-[#1B2E20] w-full">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link className="flex items-center gap-2 text-lg font-semibold text-white" href="/">
                    <img src="/logo.png" className="w-32 h-auto ml-20 mt-4" />
                </Link>
                <nav className="hidden md:flex gap-6 ml-80">
                    <Link
                        className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
                        href="/healthCheck"
                    >
                        Health Check
                    </Link>
                    <Link
                        className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
                        href="/foodCheck"
                    >
                        Food Check
                    </Link>
                    <Link
                        className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
                        href="/forum"
                    >
                        Forum
                    </Link>
                </nav>
                <div className="flex gap-1 justify-end">
                    <Link href="/login">
                        <Button
                            className="text-[#e7eae5] hover:text-[#c4f073]"
                            variant="ghost"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button
                            className="bg-transparent border-[#B4C6A6] text-[#e7eae5] hover:bg-[#B4C6A6] hover:text-[#1B2E20]"
                            variant="outline"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
