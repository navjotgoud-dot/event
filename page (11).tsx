import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Target,
  Lightbulb,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Network,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-wide relative section-padding">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur mb-6">
              <Trophy className="h-4 w-4 text-accent-400" />
              Two-Day Business Plan Pitching Championship
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Turn Your Business Idea Into a{" "}
              <span className="text-accent-400">Winning Plan</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100 leading-relaxed max-w-2xl">
              Compete, learn and connect. Present your original business concept to expert judges, 
              receive mentorship, and join a network of founders, investors and industry leaders.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply">
                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/competition">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Competition Format
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-brand-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent-400" />
                <span>Event dates TBA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent-400" />
                <span>Teams & Individuals welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent-400" />
                <span>Prizes, mentorship & recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2">Why Participate?</h2>
            <p className="mt-4 body-lg">
              More than a competition — a structured journey from idea to validated business plan 
              with real expert feedback and meaningful connections.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Validate Your Idea",
                desc: "Receive structured feedback from experienced judges and mentors on problem clarity, market fit and execution readiness.",
              },
              {
                icon: Target,
                title: "Build a Strong Plan",
                desc: "Develop a complete business plan covering market, model, financials and roadmap with guided submission requirements.",
              },
              {
                icon: Briefcase,
                title: "Pitch with Confidence",
                desc: "Present live to an expert panel, answer questions under pressure and refine your storytelling skills.",
              },
              {
                icon: Network,
                title: "Grow Your Network",
                desc: "Connect with founders, mentors, investors and business owners through structured networking and follow-up pathways.",
              },
            ].map((item) => (
              <div key={item.title} className="card hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="heading-3 text-lg">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2">Competition Journey</h2>
            <p className="mt-4 body-lg">
              A clear multi-stage process from registration to post-event support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Register & Submit", desc: "Create your team account and upload your business plan and pitch deck before the deadline." },
              { step: "02", title: "Screening", desc: "Applications are reviewed against published criteria. Shortlisted teams advance as finalists." },
              { step: "03", title: "Live Pitching", desc: "Present to judges, take questions and compete for category and overall awards." },
              { step: "04", title: "Recognition & Follow-up", desc: "Winners announced, certificates issued, and opt-in mentorship & introductions begin." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-brand-100">{item.step}</div>
                <h3 className="mt-2 font-semibold text-lg text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/competition">
              <Button variant="outline">
                Full Competition Format
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Competition Tracks</h2>
            <p className="mt-4 text-brand-200">
              Submit under the track that best matches your venture. Tracks are configurable by the organizing team.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Technology & Digital",
              "Sustainability & Climate",
              "Healthcare & Life Sciences",
              "Education & EdTech",
              "Consumer Products & Services",
              "Open Innovation",
            ].map((track) => (
              <div
                key={track}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 flex items-center gap-3 hover:bg-white/10 transition"
              >
                <CheckCircle2 className="h-5 w-5 text-accent-400 shrink-0" />
                <span className="font-medium">{track}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold">Ready to Compete?</h2>
            <p className="mt-3 text-brand-100 max-w-xl mx-auto">
              Applications open soon. Register your team, prepare your business plan and take the next step 
              toward building something meaningful.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
                  Start Application
                </Button>
              </Link>
              <Link href="/tickets">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Audience RSVP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
