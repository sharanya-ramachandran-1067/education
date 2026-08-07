import ModuleHeader from "@/components/ModuleHeader";
import StatCard from "@/components/StatCard";
import { announcements, calendarEvents, dashboardStats } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        eyebrow="Progress Preschool and Daycare"
        title="Welcome to the starter scaffold"
        description="Use this dashboard as the base for admissions, classroom operations, fees, parent communication, and daycare coordination."
      />

      <section className="card-grid">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="split-grid">
        <article className="card">
          <h3>Upcoming events</h3>
          <ul className="list">
            {calendarEvents.map((event) => (
              <li key={event.id} className="list-row">
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.audience}</p>
                </div>
                <span>{event.date}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h3>Live notification examples</h3>
          <ul className="list">
            {announcements.map((item) => (
              <li key={item.id} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.audience}</p>
                </div>
                <span>{item.channel}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
