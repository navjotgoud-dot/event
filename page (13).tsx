import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Prizes" };

export default function Page() {
  return (
    <div>
      <section className="bg-brand-950 text-white py-16 md:py-20">
        <div className="container-wide">
          <h1 className="heading-1 text-white">Prizes</h1>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl">
            Content for this section is configurable by the organizing team through the administration dashboard.
            Event-specific details (names, dates, profiles) should be entered by the organizer.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="card text-center py-12">
            <h2 className="heading-3 mb-3">Configurable Content Area</h2>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              This page supports editable text, images, profiles and sections. 
              Organizers can update content without changing source code via Championship Settings.
            </p>
            <Link href="/apply">
              <Button>Apply to Participate</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
