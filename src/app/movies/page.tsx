import { vkFetch } from "@/lib/vidking";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage() {
    const movies = await vkFetch("/discover/movie", {
        sort_by: "popularity.desc",
        include_adult: "false",
        page: "1"
    });

    return (
        <main className="min-h-screen px-6 md:px-12 py-24 space-y-12 bg-black">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                    Explore <span className="text-primary">Movies</span>
                </h1>
                <p className="text-zinc-500 font-medium max-w-2xl">
                    Discover the latest blockbusters, timeless classics, and hidden gems from around the world.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={{ ...movie, media_type: "movie" }} />
                ))}
            </div>
        </main>
    );
}
