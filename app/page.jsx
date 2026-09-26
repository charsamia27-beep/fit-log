import { Suspense } from "react";
import Hero from "@/components/Hero";
import LibraryGrid from "@/components/LibraryGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAllWorkouts } from "@/lib/workouts";

async function Library() {
  const workouts = await getAllWorkouts();
  return <LibraryGrid workouts={workouts} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-[1184px] scroll-mt-24 px-4 pt-16">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">The Library</h2>
        <p className="mt-1 text-gray-400">Twelve lifts covering every major muscle group.</p>
        <Suspense fallback={<LoadingSpinner />}>
          <Library />
        </Suspense>
      </section>
    </>
  );
}
