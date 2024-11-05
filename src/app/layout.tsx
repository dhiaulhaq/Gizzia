import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientLottieReact from "@/components/lottie-client/ClientLottieReact";
import Chat from "../../public/Animation - 1730805186441.json";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gizzia",
  description: "Your nutrition helper",
  icons: {
    icon: "/logo 3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : undefined; // Ekstraksi nilai string

  async function handleFormLogout() {
    "use server";
    if (token) {
      cookies().delete("token");
      redirect("/login");
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar token={token} handleFormLogout={handleFormLogout} />
          {children}
          {token && (
            <div className="fixed bottom-5 right-1 z-50 flex flex-col items-center">
              <a href="/chatbot" className="m-0 p-0">
                <ClientLottieReact
                  animationData={Chat}
                  style={{ width: "150px", height: "150px" }}
                />
              </a>
              <p className="absolute bottom-0 m-0 p-0 text-[#77aca4] font-extrabold text-lg text-center">
                GizzAI
              </p>
            </div>
          )}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
