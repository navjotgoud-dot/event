"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/competition", label: "Competition" },
  { href: "/timeline", label: "Timeline" },
  { href: "/judges", label: "Judges" },
  { href: "/speakers", label: "Speakers" },
  { href: "/prizes", label: "Prizes" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-800">
          <Trophy className="h-7 w-7 text-accent-500" />
          <span className="hidden sm:inline text-lg">Business Plan Championship</span>
          <span className="sm:hidden text-lg">BPC</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/apply">
            <Button size="sm">Apply Now</Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-slate-700 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/auth/login" className="flex-1">
              <Button variant="outline" className="w-full" size="sm">Sign In</Button>
            </Link>
            <Link href="/apply" className="flex-1">
              <Button className="w-full" size="sm">Apply Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
