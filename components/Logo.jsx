import Link from "next/link";
import { FaDumbbell } from "react-icons/fa";

export default function Logo({ size = "md" }) {
  const text = size === "sm" ? "text-xl" : "text-2xl";
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
      <FaDumbbell className="-rotate-45 text-xl text-accent" />
      <span className={`font-display font-bold uppercase tracking-wide ${text}`}>FitLog</span>
    </Link>
  );
}
