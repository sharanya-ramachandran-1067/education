import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { AppProvider } from "@/lib/AppContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Progress Preschool and Daycare",
  description: "Starter operations scaffold for Progress Preschool and Daycare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="app-main">
            <Topbar />
            <AppProvider>
              <main className="app-content">{children}</main>
            </AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
