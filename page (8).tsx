import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-950 text-white py-16 md:py-20">
        <div className="container-wide">
          <h1 className="heading-1 text-white">About the Championship</h1>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl">
            A structured platform for aspiring entrepreneurs to present original business ideas, 
            receive expert evaluation and build meaningful professional connections.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="heading-2">Our Purpose</h2>
              <p className="mt-4 body-lg">
                The Business Plan Championship exists to identify promising, feasible and scalable 
                business concepts through transparent screening and live evaluation. We bring together 
                founders, mentors, investors and industry experts in a professional two-day experience.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Beyond the competition itself, the platform supports learning sessions, networking, 
                awards and actionable post-event follow-up so that every participant leaves with 
                clearer next steps.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Identify Talent", desc: "Spot high-potential ideas and teams through rigorous evaluation." },
                { icon: Lightbulb, title: "Develop Ideas", desc: "Help founders refine problem, solution and business model." },
                { icon: Users, title: "Build Networks", desc: "Connect participants with mentors, investors and peers." },
                { icon: Award, title: "Recognize Excellence", desc: "Celebrate outstanding plans, pitches and impact." },
              ].map((item) => (
                <div key={item.title} className="card">
                  <item.icon className="h-8 w-8 text-brand-600 mb-3" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-wide text-center">
          <h2 className="heading-2">Expected Outcomes</h2>
          <ul className="mt-8 max-w-2xl mx-auto text-left space-y-3">
            {[
              "Validated business concepts with structured judge feedback",
              "Improved pitch skills and presentation confidence",
              "Connections with mentors, business owners and potential partners",
              "Certificates and formal recognition for participants and winners",
              "Post-event pathways for mentorship, introductions and continued development",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href="/apply">
              <Button size="lg">Apply to Participate</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
