"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { recentEnquiries, students as initialStudents } from "@/lib/mockData";
import type { Enquiry, Student } from "@/lib/types";

type AppContextValue = {
  enquiries: Enquiry[];
  students: Student[];
  addEnquiry: (enquiry: Enquiry) => void;
  convertEnquiry: (enquiryId: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(recentEnquiries);
  const [students, setStudents] = useState<Student[]>(initialStudents);

  function addEnquiry(enquiry: Enquiry) {
    setEnquiries((current) => [enquiry, ...current]);
  }

  function convertEnquiry(enquiryId: string) {
    const enquiry = enquiries.find((enq) => enq.id === enquiryId);
    if (!enquiry) return;

    setEnquiries((current) =>
      current.map((enq) =>
        enq.id === enquiryId ? { ...enq, status: "Converted" } : enq
      )
    );

    const newStudent: Student = {
      id: `STD-${Date.now()}`,
      name: enquiry.childName,
      classroom: enquiry.interestedProgram,
      parentName: enquiry.parentName,
      parentContact: "",
      schedule: enquiry.dayCare === "Yes" ? "Full day" : "Half day",
      dayCare: enquiry.dayCare,
    };

    setStudents((current) => [newStudent, ...current]);
  }

  return (
    <AppContext.Provider value={{ enquiries, students, addEnquiry, convertEnquiry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
