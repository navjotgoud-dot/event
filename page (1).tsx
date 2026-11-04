"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Upload, FileText, X } from "lucide-react";
import { uploadFile, type UploadResult } from "@/lib/upload";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const planInputRef = useRef<HTMLInputElement>(null);
  const deckInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    type: "team" as "team" | "individual",
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    institution: "",
    businessName: "",
    track: "",
    ideaSummary: "",
    problemStatement: "",
    agreeRules: false,
  });

  const [planFile, setPlanFile] = useState<File | null>(null);
  const [deckFile, setDeckFile] = useState<File | null>(null);
  const [planResult, setPlanResult] = useState<UploadResult | null>(null);
  const [deckResult, setDeckResult] = useState<UploadResult | null>(null);

  const update = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePlanSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPlanFile(file);
    setPlanResult(null);
  };

  const handleDeckSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDeckFile(file);
    setDeckResult(null);
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);

    try {
      // Upload files to Vercel Blob first
      let planMeta: UploadResult | null = planResult;
      let deckMeta: UploadResult | null = deckResult;

      if (planFile && !planResult) {
        setUploadProgress("Uploading business plan...");
        planMeta = await uploadFile(planFile, "plans");
        setPlanResult(planMeta);
      }

      if (deckFile && !deckResult) {
        setUploadProgress("Uploading pitch deck...");
        deckMeta = await uploadFile(deckFile, "decks");
        setDeckResult(deckMeta);
      }

      setUploadProgress("Saving application...");

      // In a full implementation this would POST to /api/applications
      // and create Application + BusinessPlan + PitchDeck records.
      // For now we simulate success after successful blob uploads.
      await new Promise((r) => setTimeout(r, 800));

      setSuccess(true);
      setUploadProgress(null);
    } catch (err: any) {
      setError(err.message || "Submission failed. Please try again.");
      setUploadProgress(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <section className="bg-brand-950 text-white py-16 md:py-20">
          <div className="container-wide">
            <h1 className="heading-1 text-white">Application Received</h1>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow">
            <div className="card text-center py-12 max-w-lg mx-auto">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="heading-3 mb-2">Thank you for applying!</h2>
              <p className="text-slate-600 mb-6">
                Your files have been securely uploaded. You will receive a confirmation email
                once the full application pipeline is connected to the database.
              </p>
              {planResult && (
                <p className="text-xs text-slate-500 mb-1">
                  Business plan uploaded ({Math.round(planResult.size / 1024)} KB)
                </p>
              )}
              {deckResult && (
                <p className="text-xs text-slate-500 mb-4">
                  Pitch deck uploaded ({Math.round(deckResult.size / 1024)} KB)
                </p>
              )}
              <Button onClick={() => (window.location.href = "/")}>Return Home</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-brand-950 text-white py-16 md:py-20">
        <div className="container-wide">
          <h1 className="heading-1 text-white">Apply / Register</h1>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl">
            Register your team or individual application and submit your business plan.
            Files are stored securely with Vercel Blob (private access).
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-0.5 w-12 ${step > s ? "bg-brand-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="card max-w-2xl mx-auto">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="heading-3">Registration Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(["team", "individual"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("type", t)}
                      className={`p-4 rounded-lg border-2 text-left transition ${
                        formData.type === t
                          ? "border-brand-600 bg-brand-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-semibold capitalize">{t}</div>
                      <div className="text-sm text-slate-500 mt-1">
                        {t === "team" ? "One leader + team members" : "Solo applicant"}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  {formData.type === "team" && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Team Name *</label>
                      <input
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.teamName}
                        onChange={(e) => update("teamName", e.target.value)}
                        placeholder="Enter team name"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {formData.type === "team" ? "Team Leader Name *" : "Full Name *"}
                    </label>
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.leaderName}
                      onChange={(e) => update("leaderName", e.target.value)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.leaderEmail}
                        onChange={(e) => update("leaderEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.leaderPhone}
                        onChange={(e) => update("leaderPhone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Institution / Organization</label>
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.institution}
                      onChange={(e) => update("institution", e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="heading-3">Business Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business / Venture Name *</label>
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Competition Track *</label>
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.track}
                      onChange={(e) => update("track", e.target.value)}
                    >
                      <option value="">Select a track</option>
                      <option value="technology">Technology & Digital</option>
                      <option value="sustainability">Sustainability & Climate</option>
                      <option value="healthcare">Healthcare & Life Sciences</option>
                      <option value="education">Education & EdTech</option>
                      <option value="consumer">Consumer Products & Services</option>
                      <option value="open">Open Innovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Short Business Idea Summary *</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.ideaSummary}
                      onChange={(e) => update("ideaSummary", e.target.value)}
                      placeholder="Describe your idea in 2-3 sentences"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Problem Statement *</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={formData.problemStatement}
                      onChange={(e) => update("problemStatement", e.target.value)}
                      placeholder="What problem are you solving and for whom?"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="heading-3">Documents & Confirmation</h2>

                {/* Business Plan */}
                <div>
                  <label className="block text-sm font-medium mb-2">Business Plan (PDF preferred)</label>
                  <input
                    ref={planInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handlePlanSelect}
                  />
                  {!planFile ? (
                    <button
                      type="button"
                      onClick={() => planInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-brand-400 hover:bg-brand-50 transition"
                    >
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click to upload business plan</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC or DOCX · Max 20 MB</p>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
                      <FileText className="h-8 w-8 text-brand-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{planFile.name}</p>
                        <p className="text-xs text-slate-500">
                          {(planFile.size / 1024).toFixed(0)} KB
                          {planResult && " · Uploaded"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPlanFile(null);
                          setPlanResult(null);
                          if (planInputRef.current) planInputRef.current.value = "";
                        }}
                        className="p-1 text-slate-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Pitch Deck */}
                <div>
                  <label className="block text-sm font-medium mb-2">Pitch Deck</label>
                  <input
                    ref={deckInputRef}
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    className="hidden"
                    onChange={handleDeckSelect}
                  />
                  {!deckFile ? (
                    <button
                      type="button"
                      onClick={() => deckInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-brand-400 hover:bg-brand-50 transition"
                    >
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click to upload pitch deck</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, PPT or PPTX · Max 20 MB</p>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
                      <FileText className="h-8 w-8 text-brand-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{deckFile.name}</p>
                        <p className="text-xs text-slate-500">
                          {(deckFile.size / 1024).toFixed(0)} KB
                          {deckResult && " · Uploaded"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDeckFile(null);
                          setDeckResult(null);
                          if (deckInputRef.current) deckInputRef.current.value = "";
                        }}
                        className="p-1 text-slate-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={formData.agreeRules}
                    onChange={(e) => update("agreeRules", e.target.checked)}
                  />
                  <span className="text-sm text-slate-600">
                    I confirm that the information provided is accurate, that I have read and agree to the
                    competition rules, privacy notice and terms & conditions.
                  </span>
                </label>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {uploadProgress && (
                  <div className="rounded-lg bg-brand-50 border border-brand-200 p-3 text-sm text-brand-800 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {uploadProgress}
                  </div>
                )}

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
                  Files are uploaded to <strong>Vercel Blob</strong> with private access. Only authorized
                  reviewers and administrators can retrieve them. Requires <code>BLOB_READ_WRITE_TOKEN</code> in environment variables.
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)} disabled={submitting}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!formData.agreeRules || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
