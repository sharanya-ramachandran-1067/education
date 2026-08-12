export type DashboardStat = {
  title: string;
  value: string;
  detail: string;
};

export type Enquiry = {
  id: string;
  parentName: string;
  childName: string;
  interestedProgram: string;
  dayCare: string;
  dayCareTimings: string;
  status: "New" | "Follow-up" | "Visit booked";
};

export type Student = {
  id: string;
  name: string;
  classroom: string;
  parentName: string;
  parentContact?: string;
  dayCare: "Yes" | "No";
  feesStatus: "Paid" | "Pending" | "Overdue";
  invoiceStatus: "Generated" | "Pending" | "Not sent";
};

export type FeeItem = {
  id: string;
  label: string;
  amount: number;
  status: "Pending" | "Paid";
};

export type Teacher = {
  id: string;
  name: string;
  role: string;
  assignedGroup: string;
};

export type Announcement = {
  id: string;
  title: string;
  audience: string;
  channel: "In-app" | "Portal";
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  audience: string;
};

export type PortalHighlight = {
  id: string;
  title: string;
  description: string;
};

export type HandbookTopic = {
  id: string;
  title: string;
  summary: string;
};

export type SettingsGroup = {
  id: string;
  title: string;
  description: string;
};

export type SchemaTable = {
  name: string;
  description: string;
  fields: string[];
};
