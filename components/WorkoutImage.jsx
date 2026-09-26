"use client";

import { useState } from "react";
import { FaDumbbell } from "react-icons/fa";

export default function WorkoutImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-linear-to-br from-panel-2 to-ink ${className}`}
        role="img"
        aria-label={alt}
      >
        <FaDumbbell className="-rotate-45 text-4xl text-accent/60" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
