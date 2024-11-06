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

// < UPDATE >
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Chatbot } from "@/components/Chatbot";
// </ UPDATE >

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
          {/* UPDATE */}
          <Dialog.Root>
            <Navbar token={token} handleFormLogout={handleFormLogout} />
            {children}
            {token && (
              <>
                <Dialog.Trigger asChild>
                  <div className="fixed bottom-5 right-1 z-50 flex flex-col items-center">
                      <ClientLottieReact
                        animationData={Chat}
                        style={{ width: "150px", height: "150px" }}
                      />
                    <p className="absolute bottom-0 m-0 p-0 text-[#77aca4] font-extrabold text-lg text-center">
                      Mr. Gizz
                    </p>
                  </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-[672px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                  <Chatbot/>
                    <Dialog.Close asChild>
                      <button
                        className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </>
            )}
            <Toaster />
            <Footer />
          </Dialog.Root>
          {/* UPDATE */}
        </ThemeProvider>
      </body>
    </html>
  );
}
