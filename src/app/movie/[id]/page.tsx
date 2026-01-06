import Link from "next/link";
import { vkFetch } from "@/lib/vidking";
import { Play, Star, Clock, Calendar, Globe, ChevronRight } from "lucide-react";

export default async function MoviePage({ params }: any) {
  const { id } = await params;
  const movie = await vkFetch(`/movie/${id}`);

  return (
    <main className="min-h-screen pb-20">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={movie.banner || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/movies" className="hover:text-white transition-colors">Movies</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{movie.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl shrink-0 translate-y-24">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-4 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-tighter shadow-lg shadow-primary/20">Movie</span>
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{movie.rating || "8.5"}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-xl uppercase">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{movie.year || "2024"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{movie.duration || "2h 15m"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Eng, Spa</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-4 w-full md:w-auto pb-4">
              <Link
                href={`/watch/${movie.id}`}
                className="flex-1 md:w-48 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
              >
                <Play className="fill-current w-5 h-5" />
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32 md:mt-40 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-primary rounded-full" />
              Synopsis
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
              {movie.description || "The story follows an unexpected journey through a world of mystery and intrigue. As our hero faces insurmountable odds, they must discover their true potential and decide the fate of those they hold dear. A thrilling cinematic experience wait."}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-primary rounded-full" />
              Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase font-black">Release Date</p>
                <p className="text-white font-medium">{movie.year || "Nov 2024"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase font-black">Genre</p>
                <p className="text-white font-medium">Action, Adventure</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase font-black">Languages</p>
                <p className="text-white font-medium">English, Spanish</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase font-black">Studio</p>
                <p className="text-white font-medium">Cineby Originals</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="glass p-6 rounded-3xl space-y-6 border-white/5 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Our Top Pick</h3>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed italic">
                "One of the best movies of the year. The cinematography and acting are top-notch."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
                <div>
                  <p className="text-sm font-bold text-white">John Doe</p>
                  <p className="text-xs text-zinc-500 uppercase">Critics Consensus</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
