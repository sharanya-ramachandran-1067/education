"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/enquiries", label: "Enquiries" },
  { href: "/students", label: "Students" },
  { href: "/fees", label: "Fees" },
  { href: "/teachers", label: "Teachers" },
  { href: "/announcements", label: "Announcements" },
  { href: "/calendar", label: "Calendar" },
  { href: "/portal", label: "Parent Portal" },
  { href: "/handbook", label: "Handbook" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <p className="eyebrow">Progress Preschool and Daycare</p>
        <h1>Operations App</h1>
        <span>Simple tools for school staff, teachers, and parents.</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <strong>Notifications</strong>
        <p>In-app updates are enabled. Zoho Cliq can be added later.</p>
      </div>
    </aside>
  );
}
