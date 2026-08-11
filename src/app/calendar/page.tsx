import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { calendarEvents } from "@/lib/mockData";

export default function CalendarPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Calendar"
        description="Keep important school dates visible for both operations staff and parents."
      />

      <section className="card">
        <h3>Upcoming dates</h3>
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
      </section>

      <EmptyState
        title="Full scheduling can be added later"
        description="Recurring events, PTMs, attendance days, and room bookings can plug into this route later."
      />
    </div>
  );
}
