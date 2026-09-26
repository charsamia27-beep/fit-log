export default function TagList({ tags = [] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
