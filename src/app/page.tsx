import { vkFetch } from "@/lib/vidking";
import Link from "next/link";
import { Play, Info, Star, Clock } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
  const movies = await vkFetch("/trending/movie/day");
  const featured = movies[0];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      {featured && (
        <section className="relative h-[80vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${featured.backdrop_path || featured.poster_path}`}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          </div>

          <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-24 max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
              {featured.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-zinc-300">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{featured.vote_average?.toFixed(1) || "8.5"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{featured.release_date?.split("-")[0] || "2024"}</span>
              </div>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest text-white">4K Ultra HD</span>
            </div>

            <p className="text-zinc-400 line-clamp-3 md:line-clamp-4 text-lg md:text-xl max-w-2xl leading-relaxed">
              {featured.overview || "In a world where shadows hide ancient secrets, a lone traveler must navigate through treacherous landscapes and confront the darkness within to save the last remaining hope of humanity."}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/watch/${featured.id}`}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                <Play className="fill-current w-5 h-5" />
                Watch Now
              </Link>
              <Link
                href={`/movie/${featured.id}`}
                className="flex items-center gap-2 glass hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold transition-all"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Movie Grids */}
      <section className="px-6 md:px-12 -mt-16 md:-mt-24 relative z-10 space-y-12">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white border-l-4 border-primary pl-4">Recently Added</h2>
            <Link href="/movies" className="text-sm text-zinc-400 hover:text-primary transition-colors font-medium">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
