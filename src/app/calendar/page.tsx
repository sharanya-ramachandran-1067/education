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
    </div>
  );
}

