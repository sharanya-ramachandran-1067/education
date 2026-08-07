"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Daily overview for school operations.",
  },
  "/enquiries": {
    title: "Enquiries",
    subtitle: "Track parent interest, follow-ups, and admissions readiness.",
  },
  "/students": {
    title: "Students",
    subtitle: "Keep enrolled child records ready for expansion.",
  },
  "/fees": {
    title: "Fees",
    subtitle: "Monitor pending collections and receipt workflows.",
  },
  "/teachers": {
    title: "Teachers",
    subtitle: "Support teacher records, assignments, and staffing plans.",
  },
  "/announcements": {
    title: "Announcements",
    subtitle: "Prepare parent and staff updates with in-app delivery in mind.",
  },
  "/calendar": {
    title: "Calendar",
    subtitle: "Organize school events, closures, and meetings.",
  },
  "/portal": {
    title: "Parent Portal",
    subtitle: "Reserve a simple parent-facing area for notices and fee updates.",
  },
  "/handbook": {
    title: "Handbook",
    subtitle: "Store policies, routines, and onboarding information.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Keep the app ready for roles, preferences, and integrations.",
  },
};

export default function Topbar() {
  const pathname = usePathname();
  const current = titles[pathname] ?? titles["/dashboard"];

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">MVP scaffold</p>
        <h2>{current.title}</h2>
        <p>{current.subtitle}</p>
      </div>
      <div className="topbar-badge">Non-technical friendly UI</div>
    </header>
  );
}
