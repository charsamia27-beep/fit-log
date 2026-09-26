"use client";

import { FiBookmark, FiCalendar } from "react-icons/fi";
import { usePlan, PLAN_LIMIT } from "@/context/PlanContext";

export default function DetailActions({ workout }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= PLAN_LIMIT && !inPlan;

  let planLabel = "Add to today's plan";
  if (inPlan) planLabel = "In today's plan";
  else if (planFull) planLabel = `Plan is full (${PLAN_LIMIT}/${PLAN_LIMIT})`;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={inPlan || planFull}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiCalendar aria-hidden="true" />
        {planLabel}
      </button>
      <button
        type="button"
        onClick={() => addToSaved(workout)}
        disabled={isSaved}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-5 py-3 text-sm font-bold text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiBookmark aria-hidden="true" />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
