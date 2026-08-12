import type { SchemaTable } from "@/lib/types";

export const schema: SchemaTable[] = [
  {
    name: "enquiries",
    description: "Incoming parent interest and admissions follow-up details.",
    fields: ["id", "parent_name", "child_name", "interested_program", "status", "created_at"],
  },
  {
    name: "students",
    description: "Enrolled child records, family linkage, and classroom assignment.",
    fields: [
      "id",
      "name",
      "date_of_birth",
      "classroom",
      "parent_id",
      "fees_status",
      "invoice_status",
      "status",
    ],
  },
  {
    name: "fees",
    description: "Fee plans, payment status, and receipt tracking for each student.",
    fields: ["id", "student_id", "fee_type", "amount", "due_date", "paid_at", "status"],
  },
  {
    name: "teachers",
    description: "Teacher and daycare staff records with role and group assignment.",
    fields: ["id", "name", "role", "phone", "email", "assigned_group", "active"],
  },
  {
    name: "announcements",
    description: "Messages delivered to staff or parents through the app and portal.",
    fields: ["id", "title", "message", "audience", "channel", "status", "scheduled_at"],
  },
  {
    name: "notifications",
    description: "In-app notification records with room to add Zoho Cliq later.",
    fields: ["id", "source_module", "source_id", "channel", "recipient_type", "status", "sent_at"],
  },
  {
    name: "calendar_events",
    description: "School events, closures, meetings, and parent engagement dates.",
    fields: ["id", "title", "event_date", "event_time", "audience", "notes", "status"],
  },
  {
    name: "portal_accounts",
    description: "Parent portal access and simple authentication placeholders.",
    fields: ["id", "parent_id", "login_email", "password_hash", "last_login_at", "active"],
  },
  {
    name: "handbook_pages",
    description: "School handbook categories and simple content publishing support.",
    fields: ["id", "title", "slug", "category", "content", "published", "sort_order"],
  },
];
