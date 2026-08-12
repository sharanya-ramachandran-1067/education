"use client";

import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/components/ModuleHeader";
import StatCard from "@/components/StatCard";
import { useAppContext } from "@/lib/AppContext";

export default function DashboardPage() {
  const { enquiries, students } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    if (!mounted) {
      return [];
    }

    return [
      {
        title: "Students enrolled",
        value: students.length,
        detail: "Across nursery and daycare",
      },
      {
        title: "Open enquiries",
        value: enquiries.length,
        detail: "Awaiting follow-up",
      },
    ];
  }, [mounted, students.length, enquiries.length]);

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Dashboard"
        description="A quick overview of admissions, students, and day-to-day operations."
      />

      <section className="card-grid">
        {mounted ? (
          stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              detail={stat.detail}
            />
          ))
        ) : (
          <div className="card">
            <p>Loading dashboard…</p>
          </div>
        )}
      </section>
    </div>
  );
}
