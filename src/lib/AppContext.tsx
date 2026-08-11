"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { recentEnquiries, students as initialStudents } from "@/lib/mockData";
import type { Enquiry, Student } from "@/lib/types";

// Map enquiry program → default classroom name
const programToClassroom: Record<string, string> = {
  Playgroup: "Playgroup A",
  Nursery: "Nursery A",
  LKG: "LKG Sunflowers",
  UKG: "UKG Stars",
};

type Toast = { id: number; message: string };

type AppContextValue = {
  enquiries: Enquiry[];
  students: Student[];
  toasts: Toast[];
  addEnquiry: (enquiry: Enquiry) => void;
  convertEnquiry: (enquiryId: string) => void;
  updateStudent: (studentId: string, patch: Partial<Student>) => void;
  dismissToast: (id: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() =>
    loadFromStorage("app:enquiries", recentEnquiries)
  );
  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage("app:students", initialStudents)
  );
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveToStorage("app:enquiries", enquiries);
  }, [enquiries]);

  useEffect(() => {
    saveToStorage("app:students", students);
  }, [students]);

  // Clear all pending toast timers on unmount
  useEffect(() => {
    const timers = toastTimers.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const addEnquiry = useCallback((enquiry: Enquiry) => {
    setEnquiries((current) => [enquiry, ...current]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    clearTimeout(toastTimers.current.get(id));
    toastTimers.current.delete(id);
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const convertEnquiry = useCallback(
    (enquiryId: string) => {
      const enquiry = enquiries.find((enq) => enq.id === enquiryId);
      if (!enquiry) return;

      setEnquiries((current) =>
        current.map((enq) =>
          enq.id === enquiryId ? { ...enq, status: "Converted" } : enq
        )
      );

      const classroom =
        programToClassroom[enquiry.interestedProgram] ?? enquiry.interestedProgram;

      const newStudent: Student = {
        id: `STD-${Date.now()}`,
        name: enquiry.childName,
        classroom,
        parentName: enquiry.parentName,
        parentContact: "",
        schedule: enquiry.dayCare === "Yes" ? "Full day" : "Half day",
        dayCare: enquiry.dayCare,
      };

      setStudents((current) => [newStudent, ...current]);

      // Show success toast with tracked timer
      const id = Date.now();
      setToasts((current) => [
        ...current,
        { id, message: `${enquiry.childName} has been added as a student.` },
      ]);
      const timer = setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
        toastTimers.current.delete(id);
      }, 4000);
      toastTimers.current.set(id, timer);
    },
    [enquiries]
  );

  const updateStudent = useCallback(
    (studentId: string, patch: Partial<Student>) => {
      setStudents((current) =>
        current.map((s) => (s.id === studentId ? { ...s, ...patch } : s))
      );
    },
    []
  );

  return (
    <AppContext.Provider
      value={{ enquiries, students, toasts, addEnquiry, convertEnquiry, updateStudent, dismissToast }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
