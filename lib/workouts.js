const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// Returns the first non-empty value for any of the given keys
function pick(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

// Turns a string, array or single value into a clean array
function toArray(value) {
  if (value === undefined || value === null || value === "") return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object") {
          return pick(item, ["text", "step", "name", "title", "description"]) ?? "";
        }
        return String(item);
      })
      .map((item) => String(item).trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [String(value)];
}

// "25 min" -> 25, "180 kcal" -> 180, 4.8 -> 4.8
function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

// Makes one workout object always have the same shape
export function normalizeWorkout(raw, index = 0) {
  const src = {
    ...(raw || {}),
    ...(raw?.stats || {}),
    ...(raw?.specs || {}),
    ...(raw?.keySpecs || {}),
  };

  const id = pick(src, ["id", "_id", "workoutId", "slug"]) ?? index + 1;
  const instructionsRaw = pick(src, ["instructions", "steps", "howTo", "how_to"]);

  return {
    id: String(id),
    name: String(pick(src, ["name", "title", "workoutName", "workout_name"]) ?? "Workout"),
    description: String(pick(src, ["description", "shortDescription", "subtitle", "details", "desc"]) ?? ""),
    image: String(pick(src, ["image", "img", "thumbnail", "imageUrl", "image_url", "photo", "illustration"]) ?? ""),
    tags: toArray(pick(src, ["tags", "category", "categories", "muscleGroups", "muscle_groups", "muscles", "targetMuscles"])),
    equipment: toArray(pick(src, ["equipment", "equipments"])).join(", "),
    difficulty: String(pick(src, ["difficulty", "level"]) ?? ""),
    sets: String(pick(src, ["sets"]) ?? ""),
    reps: String(pick(src, ["reps", "repetitions"]) ?? ""),
    duration: toNumber(pick(src, ["duration", "durationMin", "duration_min", "time", "minutes"])),
    calories: toNumber(pick(src, ["calories", "kcal", "calorie", "caloriesBurned"])),
    rating: toNumber(pick(src, ["rating", "ratings", "stars"])),
    instructions: Array.isArray(instructionsRaw)
      ? toArray(instructionsRaw)
      : typeof instructionsRaw === "string"
        ? instructionsRaw.split(/\n|(?<=\.)\s+(?=\d+\.)/).map((s) => s.trim()).filter(Boolean)
        : [],
  };
}

function extractList(json) {
  if (Array.isArray(json)) return json;
  for (const key of ["data", "workouts", "fitlog", "items", "results"]) {
    if (Array.isArray(json?.[key])) return json[key];
  }
  if (Array.isArray(json?.data?.workouts)) return json.data.workouts;
  return [];
}

function extractOne(json) {
  if (Array.isArray(json)) return json[0];
  if (json?.data && typeof json.data === "object" && !Array.isArray(json.data)) return json.data;
  if (Array.isArray(json?.data)) return json.data[0];
  if (json?.workout) return json.workout;
  return json;
}

export async function getAllWorkouts() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const json = await res.json();
    return extractList(json).map((item, index) => normalizeWorkout(item, index));
  } catch (error) {
    console.error("Failed to load workouts:", error);
    return [];
  }
}

export async function getWorkout(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const one = extractOne(await res.json());
      if (one && typeof one === "object" && pick(one, ["name", "title", "workoutName"])) {
        return normalizeWorkout(one);
      }
    }
  } catch (error) {
    console.error("Failed to load workout details:", error);
  }

  // Fallback: find it inside the full list
  const all = await getAllWorkouts();
  return all.find((workout) => workout.id === String(id)) ?? null;
}
