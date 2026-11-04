import Link from "next/link";
import { Trophy, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <Trophy className="h-6 w-6 text-accent-400" />
              Business Plan Championship
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of entrepreneurs through structured competition, 
              expert mentorship, and meaningful connections.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/competition" className="hover:text-white transition">Competition Format</Link></li>
              <li><Link href="/timeline" className="hover:text-white transition">Timeline & Agenda</Link></li>
              <li><Link href="/prizes" className="hover:text-white transition">Prizes & Recognition</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Participate</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/apply" className="hover:text-white transition">Apply / Register</Link></li>
              <li><Link href="/tickets" className="hover:text-white transition">Audience Tickets</Link></li>
              <li><Link href="/judges" className="hover:text-white transition">Judges</Link></li>
              <li><Link href="/speakers" className="hover:text-white transition">Speakers & Mentors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@businessplanchampionship.org</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Venue details to be announced</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Business Plan Championship. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/faq" className="hover:text-white transition">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
