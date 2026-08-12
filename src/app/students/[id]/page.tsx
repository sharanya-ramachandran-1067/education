"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ModuleHeader from "@/components/ModuleHeader";
import { useAppContext } from "@/lib/AppContext";

export default function StudentDetailPage() {
  const params = useParams<{ id: string }>();
  const { students } = useAppContext();

  const student = students.find((item) => item.id === params.id);

  if (!student) {
    return (
      <div className="stack-lg">
        <ModuleHeader title="Student details" description="Review a student record and billing status." />
        <EmptyState
          title="Student not found"
          description="This student may have been removed or is not available in this browser session."
          hint="Go back to the Students page."
        />
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <ModuleHeader title={student.name} description="Student profile with parent and billing status details." />
      <section className="card">
        <h3>Student details</h3>
        <div className="stack-md">
          <p>
            <strong>ID:</strong> {student.id}
          </p>
          <p>
            <strong>Classroom:</strong> {student.classroom}
          </p>
          <p>
            <strong>Parent:</strong> {student.parentName}
          </p>
          <p>
            <strong>Parent contact:</strong> {student.parentContact ?? "Not provided"}
          </p>
          <p>
            <strong>Day care:</strong> {student.dayCare}
          </p>
          <p>
            <strong>Fees status:</strong> {student.feesStatus}
          </p>
          <p>
            <strong>Invoice status:</strong> {student.invoiceStatus}
          </p>
          <p>
            <Link href="/students">Back to students</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
