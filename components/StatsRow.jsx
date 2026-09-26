import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export default function StatsRow({ duration, calories, rating, accent = false }) {
  const iconClass = accent ? "text-accent" : "text-gray-300";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
      <span className="flex items-center gap-1.5">
        <FiClock className={iconClass} aria-hidden="true" />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <FaFire className={iconClass} aria-hidden="true" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <FiStar className={iconClass} aria-hidden="true" />
        {rating}
      </span>
    </div>
  );
}
