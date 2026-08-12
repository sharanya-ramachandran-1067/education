"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { recentEnquiries, students as initialStudents } from "@/lib/mockData";
import type { Enquiry, Student } from "@/lib/types";

type NewEnquiry = Omit<Enquiry, "id">;
type NewStudent = Omit<Student, "id">;

type AppContextValue = {
  enquiries: Enquiry[];
  students: Student[];
  addEnquiry: (enquiry: NewEnquiry) => void;
  addStudent: (student: NewStudent) => void;
  convertEnquiryToStudent: (enquiryId: string) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const programToClassroom: Record<string, string> = {
  Playgroup: "Playgroup A",
  Nursery: "Nursery A",
  LKG: "LKG A",
  UKG: "UKG A",
};

function createNextId(items: { id: string }[], prefix: string) {
  const maxNumber = items.reduce((max, item) => {
    const match = item.id.match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(max, value);
  }, 0);

  return `${prefix}-${String(maxNumber + 1).padStart(3, "0")}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(recentEnquiries);
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const value = useMemo<AppContextValue>(
    () => ({
      enquiries,
      students,
      addEnquiry: (enquiry) => {
        setEnquiries((current) => [
          {
            ...enquiry,
            id: createNextId(current, "ENQ"),
          },
          ...current,
        ]);
      },
      addStudent: (student) => {
        setStudents((current) => [
          {
            ...student,
            id: createNextId(current, "STD"),
          },
          ...current,
        ]);
      },
      convertEnquiryToStudent: (enquiryId) => {
        const enquiry = enquiries.find((item) => item.id === enquiryId);
        if (!enquiry) {
          return;
        }

        setStudents((current) => [
          {
            id: createNextId(current, "STD"),
            name: enquiry.childName,
            classroom: programToClassroom[enquiry.interestedProgram] ?? enquiry.interestedProgram,
            parentName: enquiry.parentName,
            dayCare: enquiry.dayCare === "Yes" ? "Yes" : "No",
            feesStatus: "Pending",
            invoiceStatus: "Pending",
          },
          ...current,
        ]);

        setEnquiries((current) => current.filter((item) => item.id !== enquiryId));
      },
    }),
    [enquiries, students],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
