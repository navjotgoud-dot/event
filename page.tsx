import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  FileText,
  Award,
  Ticket,
  BarChart3,
  Settings,
  Mail,
  ClipboardList,
} from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard" };

const metrics = [
  { label: "Applications", value: "—", icon: FileText, href: "/admin/applications" },
  { label: "Teams", value: "—", icon: Users, href: "/admin/teams" },
  { label: "Finalists", value: "—", icon: Award, href: "/admin/finalists" },
  { label: "Tickets / RSVPs", value: "—", icon: Ticket, href: "/admin/tickets" },
];

const modules = [
  { name: "Championship Settings", desc: "Name, dates, branding, tracks", icon: Settings, href: "/admin/settings" },
  { name: "Applications", desc: "Review, screen, shortlist", icon: FileText, href: "/admin/applications" },
  { name: "Judges & Scoring", desc: "Assignments, rubrics, scores", icon: ClipboardList, href: "/admin/judges" },
  { name: "Agenda & Pitch Slots", desc: "Schedule, rooms, running order", icon: BarChart3, href: "/admin/agenda" },
  { name: "Tickets & Check-in", desc: "RSVP, QR, attendance", icon: Ticket, href: "/admin/tickets" },
  { name: "Awards & Certificates", desc: "Winners, generation, verification", icon: Award, href: "/admin/awards" },
  { name: "Email Campaigns", desc: "Templates, sends, logs", icon: Mail, href: "/admin/emails" },
  { name: "Reports & Exports", desc: "CSV, metrics, impact", icon: BarChart3, href: "/admin/reports" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Administration Dashboard</h1>
            <p className="text-sm text-slate-500">Business Plan Championship Platform</p>
          </div>
          <Link href="/" className="text-sm text-brand-600 hover:underline">
            ← Public Site
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-8 text-sm text-amber-900">
          <strong>Setup required:</strong> Connect Neon PostgreSQL, run migrations and seed data to populate 
          live metrics. See README for student-friendly deployment steps. Metrics below show placeholders 
          until the database is connected.
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {metrics.map((m) => (
            <Link key={m.label} href={m.href} className="card hover:shadow-md transition flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-brand-100 flex items-center justify-center">
                <m.icon className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{m.value}</div>
                <div className="text-sm text-slate-500">{m.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4">Management Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.name}
              href={mod.href}
              className="card hover:shadow-md transition hover:border-brand-300"
            >
              <mod.icon className="h-8 w-8 text-brand-600 mb-3" />
              <h3 className="font-semibold text-slate-900">{mod.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{mod.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
