import type {
  Announcement,
  CalendarEvent,
  DashboardStat,
  Enquiry,
  FeeItem,
  HandbookTopic,
  PortalHighlight,
  SettingsGroup,
  Student,
  Teacher,
} from "@/lib/types";

export const dashboardStats: DashboardStat[] = [
  {
    title: "Students enrolled",
    value: "48",
    detail: "Across nursery, LKG, and UKG groups.",
  },
  {
    title: "Open enquiries",
    value: "6",
    detail: "New family follow-ups for the next intake.",
  },
  {
    title: "Pending fees",
    value: "₹18,500",
    detail: "This month’s balance still to collect.",
  },
  {
    title: "Teachers on staff",
    value: "8",
    detail: "Including classroom, activity, and daycare support staff.",
  },
];

export const recentEnquiries: Enquiry[] = [
  {
    id: "ENQ-101",
    parentName: "Lakshmi",
    childName: "Kavi",
    interestedProgram: "Playgroup",
    dayCare: "No",
    dayCareTimings: "",
    status: "New",
  },
  {
    id: "ENQ-102",
    parentName: "Nisha",
    childName: "Riaan",
    interestedProgram: "Nursery",
    dayCare: "Yes",
    dayCareTimings: "8:30 AM - 5:30 PM",
    status: "Visit booked",
  },
];

export const students: Student[] = [
  {
    id: "STD-201",
    name: "Aarav",
    classroom: "Nursery A",
    parentName: "Priya",
    parentContact: "priya@example.com",
    schedule: "Half day",
    dayCare: "No",
  },
  {
    id: "STD-202",
    name: "Meera",
    classroom: "LKG Sunflowers",
    parentName: "Suresh",
    parentContact: "suresh@example.com",
    schedule: "Full day",
    dayCare: "Yes",
  },
  {
    id: "STD-203",
    name: "Riya",
    classroom: "Playgroup B",
    parentName: "Kavitha",
    parentContact: "kavitha@example.com",
    schedule: "Half day",
    dayCare: "No",
  },
  {
    id: "STD-204",
    name: "Arjun",
    classroom: "UKG Stars",
    parentName: "Ramesh",
    parentContact: "ramesh@example.com",
    schedule: "Full day",
    dayCare: "Yes",
  },
  {
    id: "STD-205",
    name: "Sana",
    classroom: "Nursery B",
    parentName: "Fatima",
    parentContact: "fatima@example.com",
    schedule: "Half day",
    dayCare: "No",
  },
  {
    id: "STD-206",
    name: "Karthik",
    classroom: "LKG Roses",
    parentName: "Divya",
    parentContact: "divya@example.com",
    schedule: "Full day",
    dayCare: "Yes",
  },
];

export const feeItems: FeeItem[] = [
  {
    id: "FEE-301",
    label: "August tuition - Aarav",
    amount: 6500,
    status: "Pending",
  },
  {
    id: "FEE-302",
    label: "Transport - Meera",
    amount: 2500,
    status: "Paid",
  },
];

export const teachers: Teacher[] = [
  {
    id: "TCH-401",
    name: "Anitha",
    role: "Class teacher",
    assignedGroup: "LKG Sunflowers",
  },
  {
    id: "TCH-402",
    name: "Ravi",
    role: "Activity teacher",
    assignedGroup: "Dance and movement",
  },
];

export const announcements: Announcement[] = [
  {
    id: "ANN-501",
    title: "Independence Day dress code reminder",
    audience: "Parents",
    channel: "Portal",
  },
  {
    id: "ANN-502",
    title: "Staff meeting at 4:15 PM",
    audience: "Teachers",
    channel: "In-app",
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "CAL-601",
    title: "Parent orientation",
    date: "12 Aug 2026",
    audience: "New parents",
  },
  {
    id: "CAL-602",
    title: "School holiday",
    date: "15 Aug 2026",
    audience: "All families",
  },
];

export const portalHighlights: PortalHighlight[] = [
  {
    id: "POR-701",
    title: "Receipts and fee status",
    description: "Parents will be able to check balances, due dates, and receipts.",
  },
  {
    id: "POR-702",
    title: "Daily notices",
    description: "A simple notice area keeps updates visible even without WhatsApp.",
  },
];

export const handbookTopics: HandbookTopic[] = [
  {
    id: "HB-801",
    title: "Arrival and pickup policy",
    summary: "Use this section for gate timings, authorized pickups, and attendance routines.",
  },
  {
    id: "HB-802",
    title: "Food and nap guidance",
    summary: "Reserve space for lunchbox, allergies, nap schedules, and daycare expectations.",
  },
];

export const settingsGroups: SettingsGroup[] = [
  {
    id: "SET-901",
    title: "School setup",
    description: "Classes, timings, academic year, and daycare slots.",
  },
  {
    id: "SET-902",
    title: "Notifications and integrations",
    description: "In-app delivery for MVP, with Zoho Cliq readiness later.",
  },
];
