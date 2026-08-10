"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { recentEnquiries } from "@/lib/mockData";
import type { Enquiry } from "@/lib/types";

const initialForm = {
  parentName: "",
  childName: "",
  interestedProgram: "",
  status: "New" as Enquiry["status"],
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(recentEnquiries);
  const [form, setForm] = useState(initialForm);

  const nextId = useMemo(() => {
    const maxNumber = enquiries.reduce((max, enquiry) => {
      const match = enquiry.id.match(/(\d+)$/);
      const value = match ? Number(match[1]) : 0;
      return Math.max(max, value);
    }, 0);

    return `ENQ-${String(maxNumber + 1).padStart(3, "0")}`;
  }, [enquiries]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.parentName.trim() || !form.childName.trim() || !form.interestedProgram.trim()) {
      return;
    }

    const newEnquiry: Enquiry = {
      id: nextId,
      parentName: form.parentName.trim(),
      childName: form.childName.trim(),
      interestedProgram: form.interestedProgram.trim(),
      status: form.status,
    };

    setEnquiries((current) => [newEnquiry, ...current]);
    setForm(initialForm);
  }

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Enquiries"
        description="Capture parent interest, schedule visits, and convert admissions in one place."
      />

      <section className="card">
        <h3>Add enquiry</h3>

        <form onSubmit={handleSubmit} className="stack-md">
          <div className="grid">
            <label>
              Parent name
              <input
                value={form.parentName}
                onChange={(e) => setForm((current) => ({ ...current, parentName: e.target.value }))}
                placeholder="Lakshmi"
              />
            </label>

            <label>
              Child name
              <input
                value={form.childName}
                onChange={(e) => setForm((current) => ({ ...current, childName: e.target.value }))}
                placeholder="Kavi"
              />
            </label>

            <label>
              Interested program
              <input
                value={form.interestedProgram}
                onChange={(e) =>
                  setForm((current) => ({ ...current, interestedProgram: e.target.value }))
                }
                placeholder="Playgroup"
              />
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    status: e.target.value as Enquiry["status"],
                  }))
                }
              >
                <option value="New">New</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Visit booked">Visit booked</option>
              </select>
            </label>
          </div>

          <button type="submit">Add enquiry</button>
        </form>
      </section>

      <section className="card">
        <h3>Recent enquiries</h3>
        <ul className="list">
          {enquiries.map((enquiry) => (
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
        description="Add follow-up reminders and visit booking once the local add flow is working."
        hint="For now, new enquiries live only in the browser session."
      />
    </div>
  );
}
