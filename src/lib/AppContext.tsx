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
  const [appState, setAppState] = useState<{ enquiries: Enquiry[]; students: Student[] }>({
    enquiries: recentEnquiries,
    students: initialStudents,
  });
  const { enquiries, students } = appState;

  const value = useMemo<AppContextValue>(
    () => ({
      enquiries,
      students,
      addEnquiry: (enquiry) => {
        setAppState((current) => ({
          ...current,
          enquiries: [
            {
              ...enquiry,
              id: createNextId(current.enquiries, "ENQ"),
            },
            ...current.enquiries,
          ],
        }));
      },
      addStudent: (student) => {
        setAppState((current) => ({
          ...current,
          students: [
            {
              ...student,
              id: createNextId(current.students, "STD"),
            },
            ...current.students,
          ],
        }));
      },
      convertEnquiryToStudent: (enquiryId) => {
        setAppState((current) => {
          const enquiry = current.enquiries.find((item) => item.id === enquiryId);
          if (!enquiry) {
            return current;
          }

          return {
            enquiries: current.enquiries.filter((item) => item.id !== enquiryId),
            students: [
              {
                id: createNextId(current.students, "STD"),
                name: enquiry.childName,
                classroom: programToClassroom[enquiry.interestedProgram] ?? enquiry.interestedProgram,
                parentName: enquiry.parentName,
                dayCare: enquiry.dayCare === "Yes" ? "Yes" : "No",
                feesStatus: "Pending",
                invoiceStatus: "Pending",
              },
              ...current.students,
            ],
          };
        });
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
