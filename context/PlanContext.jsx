"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-data-v1";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  // Load saved data from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(Array.isArray(data.plan) ? data.plan : []);
        setSaved(Array.isArray(data.saved) ? data.saved : []);
        setDone(Array.isArray(data.done) ? data.done : []);
      }
    } catch (error) {
      console.error("Could not read saved plan:", error);
    }
    setReady(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch (error) {
      console.error("Could not save plan:", error);
    }
  }, [plan, saved, done, ready]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already in today's plan`);
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      toast.error(`Today's plan is full (${PLAN_LIMIT} lifts max)`);
      return;
    }
    setPlan([...plan, workout]);
    toast.success(`Added ${workout.name} to today's plan`);
  };

  const addToSaved = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already saved`);
      return;
    }
    setSaved([...saved, workout]);
    toast.success(`Saved ${workout.name} for later`);
  };

  const removeFromPlan = (id) => {
    const workout = plan.find((item) => item.id === id);
    setPlan(plan.filter((item) => item.id !== id));
    setDone(done.filter((doneId) => doneId !== id));
    toast.success(`Removed ${workout?.name ?? "workout"} from today's plan`);
  };

  const removeFromSaved = (id) => {
    const workout = saved.find((item) => item.id === id);
    setSaved(saved.filter((item) => item.id !== id));
    toast.success(`Removed ${workout?.name ?? "workout"} from saved`);
  };

  const markDone = (id) => {
    if (done.includes(id)) return;
    const workout = plan.find((item) => item.id === id);
    setDone([...done, id]);
    toast.success(`${workout?.name ?? "Workout"} marked as done. Nice work!`);
  };

  const value = {
    plan,
    saved,
    done,
    ready,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }
  return context;
}
