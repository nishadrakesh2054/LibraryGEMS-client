import React from "react";
import { Link } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col w-full h-screen lg:flex-row">
        {/* Right side with form content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          {children}
        </div>

        {/* Left side with full-cover image and text overlay */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-[url('/book2.jpg')] bg-cover bg-center"
            style={{
              backgroundImage: "url('/book2.jpg')",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
          </div>

          {/* Text overlay */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
            <Link to="/" className="mb-8">
              <div className="w-60 h-60 bg-white/20 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg">
                <img src="/gems-logo.png" alt="" />
              </div>
            </Link>

            <h1 className="text-6xl font-bold text-[#0079C0] mb-4 bg-white/70 p-4 rounded">
              GEMS <span className="text-[#e9a40f]">LMS</span>
            </h1>
            <p className="text-xl font-semibold text-[#0079C0] mb-6 bg-white/80 px-20 py-2 rounded-full">
              Library Management System
            </p>

            <div className="text-white/80">
              <p className="text-lg text-yellow-500">
                Your Gateway to Knowledge
              </p>
              <p className="text-md mt-2 text-gray-100">
                Streamlining library operations since 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
