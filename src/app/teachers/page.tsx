import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { teachers } from "@/lib/mockData";

export default function TeachersPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Teachers"
        description="A dedicated teachers module is included from day one for staffing, assignments, and classroom planning."
      />

      <section className="card">
        <h3>Teacher directory preview</h3>
        <ul className="list">
          {teachers.map((teacher) => (
            <li key={teacher.id} className="list-row">
              <div>
                <strong>{teacher.name}</strong>
                <p>{teacher.role}</p>
              </div>
              <span>{teacher.assignedGroup}</span>
            </li>
          ))}
        </ul>
      </section>

      <EmptyState
        title="Next expansion ideas"
        description="Add leave tracking, attendance, salary notes, or classroom ownership without changing the shell."
      />
    </div>
  );
}
