"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#1B2E20] w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          className="flex items-center text-lg font-semibold text-white"
          href="/"
        >
          <span className="font-bold text-2xl">Gizzia</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center md:gap-6 gap-4 absolute md:static bg-[#1B2E20] md:bg-transparent w-full md:w-auto top-16 left-0 md:top-0 p-4 md:p-0 transition-all`}
        >
          <Link
            className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
            href="/health-check"
          >
            Health Check
          </Link>
          <Link
            className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
            href="/food-check"
          >
            Food Check
          </Link>
          <Link
            className="text-[#e7eae5] hover:text-[#c4f073] transition-colors"
            href="/forum"
          >
            Forum
          </Link>

          {/* Mobile Login and Sign up buttons */}
          {isOpen && (
            <div className="flex flex-col items-center gap-2 md:hidden bg-[#1B2E20]">
              <Link href="/login">
                <Button
                  className="text-[#e7eae5] hover:text-[#c4f073] w-full"
                  variant="ghost"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  className="bg-transparent border-[#B4C6A6] text-[#e7eae5] hover:bg-[#B4C6A6] hover:text-[#1B2E20] w-full"
                  variant="outline"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Login and Sign up buttons */}
        <div className="hidden md:flex gap-2">
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
  );
}
