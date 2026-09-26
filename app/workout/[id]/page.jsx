import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import WorkoutImage from "@/components/WorkoutImage";
import TagList from "@/components/TagList";
import DetailActions from "@/components/DetailActions";
import { getWorkout } from "@/lib/workouts";

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", workout.duration ? `${workout.duration} min` : ""],
    ["Calories", workout.calories ? `${workout.calories} kcal` : ""],
    ["Rating", workout.rating ? String(workout.rating) : ""],
  ].filter(([, value]) => value);

  return (
    <section className="mx-auto max-w-[1184px] px-4 py-8 md:py-12">
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to library
      </Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-line lg:sticky lg:top-24">
          <WorkoutImage
            src={workout.image}
            alt={workout.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">{workout.name}</h1>
          {workout.description && (
            <p className="mt-3 max-w-prose text-gray-300">{workout.description}</p>
          )}
          <div className="mt-4">
            <TagList tags={workout.tags} />
          </div>

          {specs.length > 0 && (
            <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</dt>
                  <dd className="text-right font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {workout.instructions.length > 0 && (
            <>
              <h2 className="mt-8 font-display text-xl font-bold uppercase tracking-wide">
                Instructions
              </h2>
              <ol className="mt-4 space-y-3">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-gray-200">{step.replace(/^\d+[.)]\s*/, "")}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          <DetailActions workout={workout} />
        </div>
      </div>
    </section>
  );
}
