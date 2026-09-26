import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1184px] flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-accent md:text-8xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="mt-2 max-w-md text-gray-400">
        This page doesn&apos;t exist or the workout was removed. Head back to the library and pick
        another lift.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
      >
        Back to workouts
      </Link>
    </section>
  );
}
