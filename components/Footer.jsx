import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-black">
      <div className="mx-auto flex max-w-[1184px] flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row">
        <Logo size="sm" />
        <p className="text-center text-sm text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
