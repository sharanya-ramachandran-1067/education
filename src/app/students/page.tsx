"use client";

import Link from "next/link";
import { useState } from "react";
import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { useAppContext } from "@/lib/AppContext";
import type { Student } from "@/lib/types";

const initialForm: Omit<Student, "id"> = {
  name: "",
  classroom: "",
  parentName: "",
  parentContact: "",
  dayCare: "No",
  feesStatus: "Pending",
  invoiceStatus: "Pending",
};

export default function StudentsPage() {
  const { students, addStudent } = useAppContext();
  const [form, setForm] = useState(initialForm);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.classroom.trim() || !form.parentName.trim()) {
      return;
    }

    addStudent({
      name: form.name.trim(),
      classroom: form.classroom.trim(),
      parentName: form.parentName.trim(),
      parentContact: form.parentContact?.trim() || undefined,
      dayCare: form.dayCare,
      feesStatus: form.feesStatus,
      invoiceStatus: form.invoiceStatus,
    });

    setForm(initialForm);
  }

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Students"
        description="Track enrolled children with classroom, parent details, fees status, and invoice status."
      />

      <section className="card">
        <h3>Add student</h3>
        <form onSubmit={handleSubmit} className="stack-md">
          <div className="enquiry-form">
            <label className="form-field">
              Child name
              <input
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                placeholder="Aarav"
              />
            </label>

            <label className="form-field">
              Classroom
              <input
                value={form.classroom}
                onChange={(e) =>
                  setForm((current) => ({ ...current, classroom: e.target.value }))
                }
                placeholder="Nursery A"
              />
            </label>

            <label className="form-field">
              Parent name
              <input
                value={form.parentName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, parentName: e.target.value }))
                }
                placeholder="Priya"
              />
            </label>

            <label className="form-field">
              Parent contact
              <input
                value={form.parentContact ?? ""}
                onChange={(e) =>
                  setForm((current) => ({ ...current, parentContact: e.target.value }))
                }
                placeholder="priya@example.com"
              />
            </label>

            <label className="form-field">
              Day care
              <select
                value={form.dayCare}
                onChange={(e) =>
                  setForm((current) => ({ ...current, dayCare: e.target.value as Student["dayCare"] }))
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            <label className="form-field">
              Fees status
              <select
                value={form.feesStatus}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    feesStatus: e.target.value as Student["feesStatus"],
                  }))
                }
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </label>

            <label className="form-field">
              Invoice status
              <select
                value={form.invoiceStatus}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    invoiceStatus: e.target.value as Student["invoiceStatus"],
                  }))
                }
              >
                <option value="Generated">Generated</option>
                <option value="Pending">Pending</option>
                <option value="Not sent">Not sent</option>
              </select>
            </label>
          </div>

          <button type="submit">Add student</button>
        </form>
      </section>

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
                  <strong>
                    <Link href={`/students/${student.id}`}>{student.name}</Link>
                  </strong>
                  <p>
                    {student.classroom} &bull; Day care: {student.dayCare}
                  </p>
                  <p>
                    Parent: {student.parentName} &bull; {student.parentContact}
                  </p>
                  <p>
                    Fees: {student.feesStatus} &bull; Invoice: {student.invoiceStatus}
                  </p>
                </div>
                <span>{student.feesStatus}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
