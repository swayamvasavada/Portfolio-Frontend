"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        <span className="text-white text-sm text-xl">S</span>
                    </div>
                    Swayam
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-sm font-medium transition-all duration-300 relative ${isActive
                                        ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                        : "text-slate-300 hover:text-cyan-300"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                )}
                            </Link>
                        );
                    })}

                    <Link
                        href="/contact"
                        className="ml-4 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    >
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div
                className={`md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col px-6 py-4 space-y-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-base font-medium transition-colors ${isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}