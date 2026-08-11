"use client";

import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { useAppContext } from "@/lib/AppContext";

export default function StudentsPage() {
  const { students } = useAppContext();

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Students"
        description="A full list of enrolled children with classroom, schedule, and parent details at a glance."
      />

      <section className="card">
        <h3>Student directory</h3>
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
                    Parent: {student.parentName}
                    {student.parentContact ? ` \u2022 ${student.parentContact}` : ""}
                  </p>
                </div>
                <span>
                  {student.dayCare === "Yes" ? "Day care \u2713" : "Day care: No"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

