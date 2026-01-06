"use client";

import Link from "next/link";
import { Star, Play } from "lucide-react";
import { motion } from "framer-motion";

interface MovieCardProps {
    movie: {
        id: number | string;
        title?: string;
        name?: string;
        poster_path?: string;
        vote_average?: number;
        release_date?: string;
        first_air_date?: string;
        media_type?: "movie" | "tv";
    };
}

export default function MovieCard({ movie }: MovieCardProps) {
    const isTV = movie.media_type === "tv" || !!movie.first_air_date || !!movie.name;
    const title = movie.title || movie.name || "Unknown Title";
    const date = movie.release_date || movie.first_air_date || "N/A";
    const typeLabel = movie.media_type === "tv" ? "TV Show" : movie.media_type === "movie" ? "Movie" : isTV ? "TV Show" : "Movie";

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Poster";

    // For simplicity in this step, we use the same watch page. 
    // In a real app, we might want to distinguish /watch/movie/ and /watch/tv/
    const watchHref = isTV ? `/watch/${movie.id}?type=tv` : `/watch/${movie.id}`;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative"
        >
            <Link href={watchHref}>
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/5 bg-zinc-900 shadow-2xl transition-all group-hover:border-primary/50 group-hover:shadow-primary/20">
                    <img
                        src={posterUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                        </div>
                        <span className="text-sm font-bold text-white uppercase tracking-widest">Watch Now</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 glass px-1.5 py-0.5 rounded-md flex items-center gap-1 scale-90 origin-top-right">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-bold text-white">{movie.vote_average?.toFixed(1) || "NR"}</span>
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                        <span>{date.split("-")[0]}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span>{typeLabel}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
