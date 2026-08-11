"use client";

import ModuleHeader from "@/components/ModuleHeader";
import StatCard from "@/components/StatCard";
import { announcements, calendarEvents } from "@/lib/mockData";
import { useAppContext } from "@/lib/AppContext";

export default function DashboardPage() {
  const { students, enquiries } = useAppContext();
  const openEnquiries = enquiries.filter((e) => e.status !== "Converted").length;

  const stats = [
    {
      title: "Students enrolled",
      value: String(students.length),
      detail: "Across nursery, LKG, and UKG groups.",
    },
    {
      title: "Open enquiries",
      value: String(openEnquiries),
      detail: "New family follow-ups for the next intake.",
    },
    {
      title: "Pending fees",
      value: "₹18,500",
      detail: "This month's balance still to collect.",
    },
    {
      title: "Teachers on staff",
      value: "8",
      detail: "Including classroom, activity, and daycare support staff.",
    },
  ];

  return (
    <div className="stack-lg">
      <ModuleHeader
        eyebrow="Progress Preschool and Daycare"
        title="Dashboard"
        description="A live snapshot of enrolments, enquiries, and upcoming school events."
      />

      <section className="card-grid">
        {stats.map((stat) => (
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
          <h3>Recent announcements</h3>
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

