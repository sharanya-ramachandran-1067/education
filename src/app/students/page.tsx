import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { students } from "@/lib/mockData";

export default function StudentsPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Students"
        description="A full list of enrolled children with classroom, schedule, and parent details at a glance."
      />

      <section className="card">
        <h3>Enrolled students</h3>
        {students.length === 0 ? (
          <EmptyState
            title="No students enrolled yet"
            description="Once students are added they will appear here."
          />
        ) : (
          <ul className="list">
            {students.map((student) => (
              <li key={student.id} className="list-row">
                <div>
                  <strong>{student.name}</strong>
                  <p>
                    {student.classroom} &bull; {student.schedule}
                  </p>
                  <p>
                    Parent: {student.parentName} &bull; {student.parentContact}
                  </p>
                </div>
                <span>
                  {student.dayCare === "Yes" ? "Day care ✓" : "Day care: No"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
