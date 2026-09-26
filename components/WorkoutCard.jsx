import Link from "next/link";
import WorkoutImage from "./WorkoutImage";
import TagList from "./TagList";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-accent/60"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <WorkoutImage
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <TagList tags={workout.tags} />
        <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide">
          {workout.name}
        </h3>
        <p className="text-sm text-gray-400">{workout.equipment}</p>
        <div className="mt-auto pt-4">
          <div className="border-t border-line pt-4">
            <StatsRow
              duration={workout.duration}
              calories={workout.calories}
              rating={workout.rating}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
