"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import WorkoutCard from "./WorkoutCard";

export default function LibraryGrid({ workouts }) {
  const [query, setQuery] = useState("");

  if (!workouts.length) {
    return (
      <p className="mt-8 rounded-2xl border border-line bg-panel p-6 text-gray-300">
        Workouts could not be loaded. Check your connection and refresh the page.
      </p>
    );
  }

  const search = query.trim().toLowerCase();
  const filtered = workouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(search) ||
      workout.tags.some((tag) => tag.toLowerCase().includes(search))
  );

  return (
    <>
      <label className="relative mt-6 block max-w-sm">
        <span className="sr-only">Search workouts</span>
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or muscle group"
          className="w-full rounded-lg border border-line bg-panel py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
        />
      </label>

      {filtered.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-400">No workouts match &quot;{query}&quot;. Try another name or muscle group.</p>
      )}
    </>
  );
}
