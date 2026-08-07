import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { students } from "@/lib/mockData";

export default function StudentsPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Students"
        description="Keep child profiles, classroom placement, and parent linkage ready for the next build step."
      />

      <section className="card">
        <h3>Starter records</h3>
        <ul className="list">
          {students.map((student) => (
            <li key={student.id} className="list-row">
              <div>
                <strong>{student.name}</strong>
                <p>
                  {student.classroom} • {student.schedule}
                </p>
              </div>
              <span>{student.parentName}</span>
            </li>
          ))}
        </ul>
      </section>

      <EmptyState
        title="Health, attendance, and pickup details can be added later"
        description="This page is intentionally simple so the student module can grow safely without changing the overall shell."
      />
    </div>
  );
}
