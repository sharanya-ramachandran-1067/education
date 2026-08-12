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
    const studentCount = mounted ? students.length : 0;
    const enquiryCount = mounted ? enquiries.length : 0;

    return [
      {
        title: "Students enrolled",
        value: studentCount,
        detail: "Across nursery and daycare",
      },
      {
        title: "Open enquiries",
        value: enquiryCount,
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
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            detail={stat.detail}
          />
        ))}
      </section>
    </div>
  );
}
