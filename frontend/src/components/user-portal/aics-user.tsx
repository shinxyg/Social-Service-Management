import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ServiceCard, PageHeader } from "../ui/shared"
import { ClipboardList, FileCheck2, MessageCircle, UserCheck, ThumbsUp, Wallet, Search } from "lucide-react"
import ApplyAICS from "./apply-aics"

const assistanceTypes = [
  { label: "Medical assistance", desc: "Hospital bills, medicines, laboratory and confinement expenses" },
  { label: "Burial assistance", desc: "Funeral and burial cost support for indigent families" },
  { label: "Educational assistance", desc: "School supplies, tuition and allowance for students in crisis" },
  { label: "Transportation assistance", desc: "Fare and travel support for medical referrals or emergencies" },
]

const processSteps = [
  { label: "Application", icon: ClipboardList, desc: "You submit your request online with your basic info and situation." },
  { label: "Verification", icon: FileCheck2, desc: "A social worker checks your submitted requirements." },
  { label: "Interview", icon: MessageCircle, desc: "A short interview to understand your situation better." },
  { label: "Assessment", icon: UserCheck, desc: "The social worker evaluates your eligibility and recommended amount." },
  { label: "Approval", icon: ThumbsUp, desc: "Your application is approved or disapproved by the office." },
  { label: "Release", icon: Wallet, desc: "If approved, your assistance is released to you." },
]

export default function AICSUser() {
  const [view, setView] = useState<"info" | "apply">("info")
  const navigate = useNavigate()

  if (view === "apply") {
    return (
      <div className="p-4 md:p-6">
        <button
          onClick={() => setView("info")}
          className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to AICS
        </button>
        <ApplyAICS />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <PageHeader
          title="AICS — Assistance to Individuals in Crisis"
          desc="Financial assistance for residents facing medical, burial, educational or transportation emergencies. Apply online and a social worker will process your request."
        />
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate("/portal/track")}
            className="h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
          >
            <Search className="h-4 w-4" />
            Track application
          </button>
          <button
            onClick={() => setView("apply")}
            className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <ClipboardList className="h-4 w-4" />
            Apply now
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Assistance types covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {assistanceTypes.map((a) => <ServiceCard key={a.label} {...a} />)}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-foreground mb-4">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processSteps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-2xl p-5 text-sm text-muted-foreground">
        Bring a valid government-issued ID and Barangay Certificate of Indigency, plus the specific requirements
        for your assistance type, when a social worker asks you to visit for verification.
      </div>
    </div>
  )
}