"use client";

import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/components/ModuleHeader";
import StatCard from "@/components/StatCard";
import { recentEnquiries, students as initialStudents } from "@/lib/mockData";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    if (!mounted) {
      return [
        {
          title: "Students enrolled",
          value: initialStudents.length,
          detail: "Across nursery and daycare",
        },
        {
          title: "Open enquiries",
          value: recentEnquiries.length,
          detail: "Awaiting follow-up",
        },
      ];
    }

    return [
      {
        title: "Students enrolled",
        value: initialStudents.length,
        detail: "Across nursery and daycare",
      },
      {
        title: "Open enquiries",
        value: recentEnquiries.length,
        detail: "Awaiting follow-up",
      },
    ];
  }, [mounted]);

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Dashboard"
        description="A quick overview of admissions, students, and day-to-day operations."
      />

      <section className="card-grid">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>
    </div>
  );
}
