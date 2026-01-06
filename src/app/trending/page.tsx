import { vkFetch } from "@/lib/vidking";
import MovieCard from "@/components/MovieCard";

export default async function TrendingPage() {
    const trending = await vkFetch("/trending/all/week");

    return (
        <main className="min-h-screen px-6 md:px-12 py-24 space-y-12 bg-black">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                    Weekly <span className="text-primary">Trending</span>
                </h1>
                <p className="text-zinc-500 font-medium max-w-2xl">
                    See what everyone is watching this week. The most popular movies and shows across the globe.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {trending.map((item: any) => (
                    <MovieCard key={item.id} movie={item} />
                ))}
            </div>
        </main>
    );
}
