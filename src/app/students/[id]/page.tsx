"use client";

import { use } from "react";
import Link from "next/link";
import { useAppContext } from "@/lib/AppContext";

export default function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { students } = useAppContext();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="stack-lg">
        <div className="card">
          <h3>Student not found</h3>
          <p>No student record matches this ID.</p>
          <p style={{ marginTop: "12px" }}>
            <Link href="/students">&larr; Back to student directory</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div className="card">
        <p style={{ marginBottom: "4px" }}>
          <Link href="/students">&larr; Back to student directory</Link>
        </p>
        <h1 style={{ fontSize: "1.8rem", margin: "8px 0 4px" }}>{student.name}</h1>
        <p className="eyebrow">{student.id}</p>
      </div>

      <section className="split-grid">
        <article className="card">
          <h3>Classroom &amp; schedule</h3>
          <ul className="list">
            <li className="list-row">
              <span style={{ color: "var(--muted)" }}>Classroom</span>
              <strong>{student.classroom}</strong>
            </li>
            <li className="list-row">
              <span style={{ color: "var(--muted)" }}>Schedule</span>
              <strong>{student.schedule}</strong>
            </li>
            <li className="list-row">
              <span style={{ color: "var(--muted)" }}>Day care</span>
              <strong>{student.dayCare === "Yes" ? "Yes \u2713" : "No"}</strong>
            </li>
          </ul>
        </article>

        <article className="card">
          <h3>Parent details</h3>
          <ul className="list">
            <li className="list-row">
              <span style={{ color: "var(--muted)" }}>Parent name</span>
              <strong>{student.parentName}</strong>
            </li>
            <li className="list-row">
              <span style={{ color: "var(--muted)" }}>Contact</span>
              <strong>{student.parentContact || "—"}</strong>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
