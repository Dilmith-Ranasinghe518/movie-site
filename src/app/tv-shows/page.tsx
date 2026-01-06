import { vkFetch } from "@/lib/vidking";
import MovieCard from "@/components/MovieCard";

export default async function TVShowsPage() {
    const shows = await vkFetch("/discover/tv", {
        sort_by: "popularity.desc",
        include_adult: "false",
        page: "1"
    });

    return (
        <main className="min-h-screen px-6 md:px-12 py-24 space-y-12 bg-black">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                    TV <span className="text-primary">Shows</span>
                </h1>
                <p className="text-zinc-500 font-medium max-w-2xl">
                    Stream your favorite series, binge-worthy dramas, and the latest reality TV.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {shows.map((show: any) => (
                    <MovieCard key={show.id} movie={{ ...show, media_type: "tv" }} />
                ))}
            </div>
        </main>
    );
}
