import { useState } from "react"
import { StatCard, ServiceCard, StatusBadge, PageHeader } from "./shared"
import { LivelihoodApplicationWizard, type LivelihoodApplicationResult, type LivelihoodApplicantInfo } from "./livelihood-wizard"
import { FileText, ClipboardCheck } from "lucide-react"

const stats = [
  { label: "Active trainees", value: "312" },
  { label: "Ongoing batches", value: "6" },
  { label: "Graduates this year", value: "890" },
  { label: "Livelihood kits released", value: "154" },
]

const programs = [
  { label: "Skills training", desc: "TESDA-partnered short courses in trades and services" },
  { label: "Livelihood starter kit", desc: "Tools and materials grant for micro-enterprise start-up" },
  { label: "Cooperative development", desc: "Formation and technical support for community cooperatives" },
  { label: "TESDA certification assistance", desc: "Assessment fee subsidy and scheduling support" },
]

const batches = [
  { program: "Dressmaking NC II", partner: "TESDA", slots: "25 / 25 enrolled", status: "Ongoing" },
  { program: "Food processing basics", partner: "City LGU", slots: "18 / 20 enrolled", status: "Enrolling" },
  { program: "Electrical installation NC II", partner: "TESDA", slots: "20 / 20 enrolled", status: "Completed" },
  { program: "Livelihood kit — sari-sari store", partner: "City LGU", slots: "40 beneficiaries", status: "Releasing" },
]

const initialRegistrations: { name: string; program: string; status: string }[] = [
  { name: "Arnel B. Domingo", program: "Dressmaking NC II", status: "Certified" },
  { name: "Precious J. Manalo", program: "Food processing basics", status: "Incomplete" },
]

// Mock submissions filed by residents through the online portal
// (user-portal/apply-livelihood.tsx). Staff pick one here to begin
// processing — UI-only for now, same pattern as AICS.
const pendingSubmissions: LivelihoodApplicantInfo[] = [
  {
    name: "Feliza D. Ocampo",
    address: "Purok 6, Barangay Malaya",
    contact: "0917 663 2201",
    preferredProgram: "Dressmaking NC II",
    narrative: "Gusto kong matuto ng dressmaking para makapagsimula ng sariling sewing business.",
  },
  {
    name: "Reymark S. Villaflor",
    address: "Zone 3, Barangay San Isidro",
    contact: "0928 991 5540",
    preferredProgram: "Electrical installation NC II",
    narrative: "May basic background sa electrical work, gustong makakuha ng NC II certification.",
  },
]

export default function LivelihoodTraining() {
  const [view, setView] = useState<"dashboard" | "picker" | "wizard">("dashboard")
  const [registrations, setRegistrations] = useState(initialRegistrations)
  const [selectedSubmission, setSelectedSubmission] = useState<LivelihoodApplicantInfo | null>(null)

  const handleSubmit = (result: LivelihoodApplicationResult) => {
    setRegistrations((prev) => [
      { name: result.name, program: result.program, status: result.status },
      ...prev,
    ])
    setSelectedSubmission(null)
    setView("dashboard")
  }

  if (view === "picker") {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          title="Pending registrations from residents"
          desc="These were submitted directly by residents through the online portal. Select one to begin skills assessment and processing."
        />
        <div className="space-y-3 max-w-2xl">
          {pendingSubmissions.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedSubmission(s)
                setView("wizard")
              }}
              className="w-full text-left bg-card border border-border rounded-2xl p-4 shadow-soft hover:-translate-y-0.5 hover:shadow-medium transition-all flex items-start gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.preferredProgram} — {s.address}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.narrative}</p>
              </div>
            </button>
          ))}
          {pendingSubmissions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No pending submissions right now.</p>
          )}
        </div>
        <button
          onClick={() => setView("dashboard")}
          className="h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  if (view === "wizard" && selectedSubmission) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          title="Process livelihood & training registration"
          desc="Skills assessment, training assignment, completion and certification for a resident-submitted registration."
        />
        <LivelihoodApplicationWizard
          onCancel={() => {
            setSelectedSubmission(null)
            setView("dashboard")
          }}
          onSubmit={handleSubmit}
          applicant={selectedSubmission}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Livelihood & training program"
          desc="Skills training, TESDA-partnered certification, and livelihood starter kits for residents seeking sustainable income."
        />
        <button
          onClick={() => setView("picker")}
          className="shrink-0 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <ClipboardCheck className="h-4 w-4" />
          Review submissions
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Programs offered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {programs.map((p) => <ServiceCard key={p.label} {...p} />)}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Current batches</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-4 py-2 font-medium">Program</th>
              <th className="px-4 py-2 font-medium">Partner</th>
              <th className="px-4 py-2 font-medium">Enrollment</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.program} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{b.program}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.partner}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.slots}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent registrations</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-4 py-2 font-medium">Applicant</th>
              <th className="px-4 py-2 font-medium">Program</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{r.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.program}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                  No registrations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}