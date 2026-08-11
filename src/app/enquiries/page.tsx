"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { useAppContext } from "@/lib/AppContext";
import type { Enquiry } from "@/lib/types";

const initialForm = {
  parentName: "",
  childName: "",
  interestedProgram: "",
  dayCare: "",
  dayCareTimings: "",
  followUpDate: "",
  status: "New" as Enquiry["status"],
};

const STATUS_OPTIONS: Array<Enquiry["status"]> = ["New", "Follow-up", "Visit booked"];

export default function EnquiriesPage() {
  const { enquiries, addEnquiry, convertEnquiry } = useAppContext();
  const [form, setForm] = useState(initialForm);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const openEnquiries = useMemo(() => {
    const open = enquiries.filter((enq) => enq.status !== "Converted");
    if (filterStatus === "All") return open;
    return open.filter((enq) => enq.status === filterStatus);
  }, [enquiries, filterStatus]);

  const convertedEnquiries = enquiries.filter((enq) => enq.status === "Converted");

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

    if (
      !form.parentName.trim() ||
      !form.childName.trim() ||
      !form.interestedProgram.trim() ||
      !form.dayCare.trim() ||
      (form.dayCare === "Yes" && !form.dayCareTimings.trim())
    ) {
      return;
    }

    const newEnquiry: Enquiry = {
      id: nextId,
      parentName: form.parentName.trim(),
      childName: form.childName.trim(),
      interestedProgram: form.interestedProgram.trim(),
      dayCare: form.dayCare.trim(),
      dayCareTimings: form.dayCare === "Yes" ? form.dayCareTimings.trim() : "",
      followUpDate: form.followUpDate,
      status: form.status,
    };

    addEnquiry(newEnquiry);
    setForm(initialForm);
  }

  function handleConvertClick(enquiryId: string) {
    setConfirmId(enquiryId);
  }

  function handleConfirmConvert() {
    if (confirmId) {
      convertEnquiry(confirmId);
      setConfirmId(null);
    }
  }

  const confirmEnquiry = confirmId ? enquiries.find((e) => e.id === confirmId) : null;

  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Enquiries"
        description="Capture parent interest, schedule visits, and convert admissions in one place."
      />

      {/* Confirmation dialog */}
      {confirmEnquiry && (
        <div className="card" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }}>
          <h3>Convert enquiry to student?</h3>
          <p style={{ margin: "8px 0 16px" }}>
            This will enrol <strong>{confirmEnquiry.childName}</strong> (parent:{" "}
            {confirmEnquiry.parentName}) as a student in the{" "}
            <strong>{confirmEnquiry.interestedProgram}</strong> programme. The enquiry
            will be marked as converted.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" className="btn" onClick={handleConfirmConvert}>
              Yes, convert
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="card">
        <h3>Add enquiry</h3>

        <form onSubmit={handleSubmit} className="stack-md">
          <div className="enquiry-form">
            <label className="form-field">
              Parent name
              <input
                value={form.parentName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, parentName: e.target.value }))
                }
                placeholder="Lakshmi"
              />
            </label>

            <label className="form-field">
              Child name
              <input
                value={form.childName}
                onChange={(e) =>
                  setForm((current) => ({ ...current, childName: e.target.value }))
                }
                placeholder="Kavi"
              />
            </label>

            <label className="form-field">
              Interested program
              <select
                value={form.interestedProgram}
                onChange={(e) =>
                  setForm((current) => ({ ...current, interestedProgram: e.target.value }))
                }
              >
                <option value="">Select a program</option>
                <option value="Playgroup">Playgroup</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
              </select>
            </label>

            <label className="form-field">
              Day care
              <select
                value={form.dayCare}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    dayCare: e.target.value,
                    dayCareTimings: e.target.value === "Yes" ? current.dayCareTimings : "",
                  }))
                }
              >
                <option value="">Select day care</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            {form.dayCare === "Yes" && (
              <label className="form-field">
                Day care timings
                <input
                  value={form.dayCareTimings}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, dayCareTimings: e.target.value }))
                  }
                  placeholder="8:30 AM - 5:30 PM"
                />
              </label>
            )}

            <label className="form-field">
              Follow-up date
              <input
                type="date"
                value={form.followUpDate}
                onChange={(e) =>
                  setForm((current) => ({ ...current, followUpDate: e.target.value }))
                }
              />
            </label>

            <label className="form-field">
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

          <button type="submit" className="btn">Add enquiry</button>
        </form>
      </section>

      <section className="card">
        <h3>Open enquiries</h3>

        <div className="filter-bar">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {openEnquiries.length === 0 ? (
          <EmptyState
            title="No open enquiries"
            description={
              filterStatus !== "All"
                ? `No enquiries with status "${filterStatus}".`
                : "All enquiries have been converted to students."
            }
          />
        ) : (
          <ul className="list">
            {openEnquiries.map((enquiry) => (
              <li key={enquiry.id} className="list-row">
                <div>
                  <strong>{enquiry.parentName}</strong>
                  <p>
                    {enquiry.childName} &bull; {enquiry.interestedProgram}
                  </p>
                  <p>
                    Day care: {enquiry.dayCare}
                    {enquiry.dayCare === "Yes" && enquiry.dayCareTimings
                      ? ` \u2022 Timings: ${enquiry.dayCareTimings}`
                      : ""}
                  </p>
                  {enquiry.followUpDate && (
                    <p>Follow-up: {enquiry.followUpDate}</p>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                  <span>{enquiry.status}</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => handleConvertClick(enquiry.id)}
                  >
                    Convert to student
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {convertedEnquiries.length > 0 && (
        <section className="card">
          <h3>Converted enquiries</h3>
          <ul className="list">
            {convertedEnquiries.map((enquiry) => (
              <li key={enquiry.id} className="list-row">
                <div>
                  <strong>{enquiry.parentName}</strong>
                  <p>
                    {enquiry.childName} &bull; {enquiry.interestedProgram}
                  </p>
                </div>
                <span>Converted &#x2713;</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
