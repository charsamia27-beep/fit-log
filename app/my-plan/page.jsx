"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import PlanItemCard from "@/components/PlanItemCard";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";

const sorters = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => b.calories - a.calories,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlanPage() {
  const { plan, saved, done, ready, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const totals = plan.reduce(
    (sum, workout) => ({
      minutes: sum.minutes + (workout.duration || 0),
      calories: sum.calories + (workout.calories || 0),
    }),
    { minutes: 0, calories: 0 }
  );

  const list = tab === "plan" ? plan : saved;
  const sortedList = useMemo(() => [...list].sort(sorters[sortBy]), [list, sortBy]);

  const tabs = [
    { key: "plan", label: "Today's Plan" },
    { key: "saved", label: "Saved" },
  ];

  const metrics = [
    { label: "Exercises", value: plan.length, highlight: true },
    { label: "Minutes", value: totals.minutes },
    { label: "Calories", value: totals.calories },
  ];

  return (
    <section className="mx-auto max-w-[1184px] px-4 py-8 md:py-12">
      <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">My Plan</h1>
      <p className="mt-1 text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-3 py-5 sm:px-6">
            <p className="text-xs text-gray-400 sm:text-sm">{metric.label}</p>
            <p
              className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${
                metric.highlight ? "text-accent" : "text-white"
              }`}
            >
              {ready ? metric.value : 0}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-line bg-panel p-1" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                tab === item.key ? "bg-panel-2 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-gray-400">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-line bg-panel py-2 pl-3 pr-9 text-sm font-semibold text-white focus:border-accent focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white" />
          </span>
        </label>
      </div>

      <div className="mt-6">
        {!ready ? (
          <LoadingSpinner text="Loading workouts…" />
        ) : sortedList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {sortedList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                showDone={tab === "plan"}
                isDone={tab === "plan" && done.includes(workout.id)}
                onDone={() => markDone(workout.id)}
                onRemove={() =>
                  tab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
