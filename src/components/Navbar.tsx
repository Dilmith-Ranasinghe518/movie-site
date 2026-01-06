"use client";

import Link from "next/link";
import { Search, PlayCircle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <PlayCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold tracking-tighter text-gradient">
                        MOVIE<span className="text-primary">WEB</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                    <Link href="/movies" className="text-sm font-medium hover:text-primary transition-colors">Movies</Link>
                    <Link href="/tv-shows" className="text-sm font-medium hover:text-primary transition-colors">TV Shows</Link>
                    <Link href="/trending" className="text-sm font-medium hover:text-primary transition-colors">Trending</Link>
                </div>

                {/* Search and Secondary Actions */}
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-zinc-900/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all w-48 lg:w-64"
                        />
                    </form>

                    <button
                        className="md:hidden p-2 rounded-lg glass"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleSearch} className="relative group sm:hidden">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-zinc-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </form>
                    <Link href="/" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/movies" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Movies</Link>
                    <Link href="/tv-shows" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>TV Shows</Link>
                    <Link href="/trending" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Trending</Link>
                </div>
            )}
        </nav>
    );
}
