import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
      <p className="mt-2 text-gray-400">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </div>
  );
}
