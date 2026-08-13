import ModuleHeader from "@/components/ModuleHeader";
import StatCard from "@/components/StatCard";
import { dashboardStats } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Dashboard"
        description="A quick overview of admissions, students, and day-to-day operations."
      />

      <section className="card-grid">
        {dashboardStats.map((stat) => (
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
