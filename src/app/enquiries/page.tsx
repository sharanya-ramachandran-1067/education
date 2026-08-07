import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { recentEnquiries } from "@/lib/mockData";

export default function EnquiriesPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Enquiries"
        description="Capture parent interest, schedule visits, and convert admissions in one place."
      />

      <section className="card">
        <h3>Recent enquiries</h3>
        <ul className="list">
          {recentEnquiries.map((enquiry) => (
            <li key={enquiry.id} className="list-row">
              <div>
                <strong>{enquiry.parentName}</strong>
                <p>
                  {enquiry.childName} • {enquiry.interestedProgram}
                </p>
              </div>
              <span>{enquiry.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <EmptyState
        title="Admission pipeline actions can come next"
        description="Add forms, follow-up reminders, and visit booking once you connect a real data layer."
        hint="The mock data is isolated in src/lib/mockData.ts for easy replacement later."
      />
    </div>
  );
}
