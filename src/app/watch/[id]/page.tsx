import { vkFetch } from "@/lib/vidking";
import { Play, Info, Share2, Heart, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function WatchPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ type?: string }>
}) {
  const { id } = await params;
  const { type } = await searchParams;

  const isTV = type === "tv";
  const movie = await vkFetch(isTV ? `/tv/${id}` : `/movie/${id}`);

  // Using VidKing as the streaming provider with TMDB ID
  // For TV shows, we default to season 1, episode 1
  const streamUrl = isTV
    ? `https://www.vidking.net/embed/tv/${id}/1/1`
    : `https://www.vidking.net/embed/movie/${id}`;

  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;

  return (
    <main className="min-h-screen pb-20 bg-black">
      {/* Player Section */}
      <section className="relative w-full aspect-video md:h-[80vh] bg-zinc-950">
        <iframe
          src={streamUrl}
          width="100%"
          height="100%"
          allowFullScreen
          className="border-0 shadow-2xl"
        ></iframe>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 flex-1">
            <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href={isTV ? "/tv-shows" : "/movies"} className="hover:text-white transition-colors">{isTV ? "TV Shows" : "Movies"}</Link>
              <span>/</span>
              <span className="text-white">Streaming</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="text-primary">{date?.split("-")[0] || "2024"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="text-zinc-400">{isTV ? `${movie.number_of_seasons} Seasons` : (movie.runtime ? `${movie.runtime}m` : "2h 15m")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] text-white uppercase tracking-widest">HD</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 glass px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
              <Heart className="w-4 h-4" />
              Watchlist
            </button>
            <button className="flex items-center gap-2 glass px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="glass p-6 rounded-3xl space-y-4 border-primary/10 bg-primary/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm font-bold text-white">Streaming Tip</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    If the video doesn't play, try refreshing the page or switching your browser. Our players work best on Chrome and Firefox.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Comments
              </h3>
              <div className="glass p-8 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-8 h-8 text-zinc-700" />
                </div>
                <p className="text-zinc-500 font-medium">Be the first to comment on this movie!</p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all">
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Recommended</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                    <div className="w-full h-full bg-zinc-800 animate-pulse" />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-zinc-900 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
