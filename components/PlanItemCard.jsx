import Link from "next/link";
import { FiCheck, FiX } from "react-icons/fi";
import WorkoutImage from "./WorkoutImage";
import StatsRow from "./StatsRow";

export default function PlanItemCard({ workout, showDone, isDone, onDone, onRemove }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${
        isDone ? "opacity-70" : ""
      }`}
    >
      <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
        <WorkoutImage src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">
          {workout.name}
          {isDone && (
            <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 align-middle font-sans text-xs font-semibold normal-case tracking-normal text-accent">
              Done
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-400">{workout.equipment}</p>
        <div className="mt-2">
          <StatsRow
            duration={workout.duration}
            calories={workout.calories}
            rating={workout.rating}
            accent
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-gray-500 px-4 py-2 text-sm font-semibold transition hover:border-white"
        >
          View Details
        </Link>
        {showDone && (
          <button
            type="button"
            onClick={onDone}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiCheck aria-hidden="true" />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="grid h-9 w-9 place-items-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <FiX />
        </button>
      </div>
    </article>
  );
}
