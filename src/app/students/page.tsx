"use client";

import { useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { useAppContext } from "@/lib/AppContext";
import type { Student } from "@/lib/types";

export default function StudentsPage() {
  const { students, updateStudent } = useAppContext();
  const [search, setSearch] = useState("");
  const [filterDayCare, setFilterDayCare] = useState("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});

  const filtered = students.filter((s) => {
    const term = search.toLowerCase();
    const matchSearch =
      !term ||
      s.name.toLowerCase().includes(term) ||
      s.parentName.toLowerCase().includes(term) ||
      s.classroom.toLowerCase().includes(term);
    const matchDayCare = filterDayCare === "All" || s.dayCare === filterDayCare;
    return matchSearch && matchDayCare;
  });

  function startEdit(student: Student) {
    setEditingId(student.id);
    setEditForm({
      classroom: student.classroom,
      schedule: student.schedule,
      parentContact: student.parentContact,
    });
  }

  function saveEdit(studentId: string) {
    updateStudent(studentId, editForm);
    setEditingId(null);
    setEditForm({});
  }

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Students"
        description="A full list of enrolled children with classroom, schedule, and parent details at a glance."
      />

      <section className="card">
        <h3>Student directory</h3>

        <div className="filter-bar">
          <input
            type="search"
            placeholder="Search by name, parent, or classroom&hellip;"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search students"
          />
          <select
            value={filterDayCare}
            onChange={(e) => setFilterDayCare(e.target.value)}
            aria-label="Filter by day care"
          >
            <option value="All">All day care</option>
            <option value="Yes">Day care: Yes</option>
            <option value="No">Day care: No</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No students found"
            description={
              students.length === 0
                ? "Once students are added they will appear here."
                : "No students match your search or filter."
            }
          />
        ) : (
          <ul className="list">
            {filtered.map((student) => (
              <li key={student.id} className="list-row">
                <div style={{ flex: 1 }}>
                  <strong>
                    <Link href={`/students/${student.id}`}>{student.name}</Link>
                  </strong>

                  {editingId === student.id ? (
                    <div className="edit-row">
                      <input
                        value={editForm.classroom ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, classroom: e.target.value }))
                        }
                        placeholder="Classroom"
                        aria-label="Classroom"
                      />
                      <select
                        value={editForm.schedule ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, schedule: e.target.value }))
                        }
                        aria-label="Schedule"
                      >
                        <option value="Half day">Half day</option>
                        <option value="Full day">Full day</option>
                      </select>
                      <input
                        value={editForm.parentContact ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, parentContact: e.target.value }))
                        }
                        placeholder="Parent contact"
                        aria-label="Parent contact"
                      />
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => saveEdit(student.id)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>
                        {student.classroom} &bull; {student.schedule}
                      </p>
                      <p>
                        Parent: {student.parentName}
                        {student.parentContact ? ` \u2022 ${student.parentContact}` : ""}
                      </p>
                    </>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                  <span>
                    {student.dayCare === "Yes" ? "Day care \u2713" : "Day care: No"}
                  </span>
                  {editingId !== student.id && (
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost"
                      onClick={() => startEdit(student)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

