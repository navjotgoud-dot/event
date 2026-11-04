import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Competition Format" };

const stages = [
  { stage: "1", title: "Registration", action: "Create account; register individually or as a team.", system: "Validate eligibility, collect details and issue application ID." },
  { stage: "2", title: "Business Plan Submission", action: "Upload plan, pitch deck and supporting files.", system: "Check file types, deadlines, completeness and submission status." },
  { stage: "3", title: "Initial Screening", action: "Track application status.", system: "Review eligibility and score applications against published criteria." },
  { stage: "4", title: "Shortlisting", action: "Receive shortlist or rejection notification.", system: "Record reviewer comments, scores and shortlist decisions." },
  { stage: "5", title: "Finalist Preparation", action: "Confirm attendance; upload final pitch deck.", system: "Assign pitch slot, mentor and participant coordinator." },
  { stage: "6", title: "Live Pitching", action: "Present business plan and answer judges' questions.", system: "Manage stage order, timer, judge scoring and technical readiness." },
  { stage: "7", title: "Final Evaluation", action: "Wait for results.", system: "Calculate verified scores and record judge decisions." },
  { stage: "8", title: "Awards & Recognition", action: "Attend announcement and receive certificate/award.", system: "Publish approved winners and issue certificates." },
  { stage: "9", title: "Post-Event Follow-up", action: "Complete feedback and opt-in to follow-up.", system: "Share feedback, introductions, resources and next-step opportunities." },
];

const criteria = [
  { name: "Problem & Customer Need", weight: "15%" },
  { name: "Innovation & Differentiation", weight: "15%" },
  { name: "Market Opportunity & Competition", weight: "15%" },
  { name: "Business Model & Revenue Potential", weight: "15%" },
  { name: "Financial Understanding & Viability", weight: "15%" },
  { name: "Execution Plan & Team Capability", weight: "10%" },
  { name: "Scalability & Impact", weight: "5%" },
  { name: "Pitch Clarity & Q&A", weight: "10%" },
];

export default function CompetitionPage() {
  return (
    <div>
      <section className="bg-brand-950 text-white py-16 md:py-20">
        <div className="container-wide">
          <h1 className="heading-1 text-white">Competition Format</h1>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl">
            Eligibility, tracks, stages, rules and the judging process — designed for transparency and fairness.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="heading-2 mb-8">Multi-Stage Journey</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-3 font-semibold">Stage</th>
                  <th className="p-3 font-semibold">Participant Action</th>
                  <th className="p-3 font-semibold">Organizer / System Action</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((s) => (
                  <tr key={s.stage} className="border-b border-slate-200">
                    <td className="p-3 font-medium whitespace-nowrap">{s.stage}. {s.title}</td>
                    <td className="p-3 text-slate-600">{s.action}</td>
                    <td className="p-3 text-slate-600">{s.system}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <h2 className="heading-2 mb-4">Suggested Judging Rubric</h2>
          <p className="body-lg mb-8 max-w-2xl">
            Organizers can adjust criteria and weights. The system validates that active weights total 100% before scoring begins.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {criteria.map((c) => (
              <div key={c.name} className="card flex justify-between items-center">
                <span className="font-medium text-sm">{c.name}</span>
                <span className="badge bg-brand-100 text-brand-700">{c.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="heading-2">Ready to Take Part?</h2>
          <p className="mt-3 body-lg">Review eligibility and submission requirements, then start your application.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/participate"><Button variant="outline">How to Participate</Button></Link>
            <Link href="/apply"><Button>Apply Now</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
