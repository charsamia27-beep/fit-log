"use client";

import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a2334",
            color: "#ffffff",
            border: "1px solid #243049",
          },
          success: {
            iconTheme: { primary: "#ccff00", secondary: "#0a0c10" },
          },
        }}
      />
    </PlanProvider>
  );
}
