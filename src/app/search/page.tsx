import { vkFetch } from "@/lib/vidking";
import MovieCard from "@/components/MovieCard";
import { Search as SearchIcon } from "lucide-react";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q: query } = await searchParams;

    let filteredMovies = [];
    if (query) {
        filteredMovies = await vkFetch("/search/movie", { query });
    }

    return (
        <main className="min-h-screen px-6 md:px-12 py-12 space-y-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
                    Search Results
                </h1>
                <p className="text-zinc-500 font-medium">
                    {filteredMovies.length} results found for <span className="text-primary">"{query}"</span>
                </p>
            </div>

            {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredMovies.map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                        <SearchIcon className="w-10 h-10 text-zinc-700" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-white">No results found</h3>
                        <p className="text-zinc-500">Try searching for something else like "Action" or "Horror"</p>
                    </div>
                </div>
            )}
        </main>
    );
}
