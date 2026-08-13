import ModuleHeader from "@/components/ModuleHeader";
import { announcements } from "@/lib/mockData";

export default function AnnouncementsPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Announcements"
        description="Use this module for parent notices, staff updates, and in-app communication flows."
      />

      <section className="card">
        <h3>Notification-ready messages</h3>
        <ul className="list">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="list-row">
              <div>
                <strong>{announcement.title}</strong>
                <p>{announcement.audience}</p>
              </div>
              <span>{announcement.channel}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
