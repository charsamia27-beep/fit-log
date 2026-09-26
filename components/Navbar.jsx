"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isActive = (href) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/workout");
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[1184px] flex-wrap items-center gap-y-3 px-4 py-4">
        <div className="order-1">
          <Logo />
        </div>

        <ul className="order-3 flex w-full justify-center gap-2 md:order-2 md:w-auto md:flex-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/15 text-accent"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="order-2 ml-auto flex items-center gap-4 md:order-3 md:ml-0">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
          >
            Plan
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
          >
            Saved
            <span className="grid h-6 min-w-6 place-items-center rounded-full border border-gray-500 px-1.5 text-xs font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
