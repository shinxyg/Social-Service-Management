
import { useState } from "react"
import { StatCard, ServiceCard, StatusBadge, PageHeader } from "./shared"
import { AICSApplicationWizard, type AICSApplicationResult } from "./application-wizard"
import { Plus } from "lucide-react"

const stats = [
  { label: "Applications this month", value: "184" },
  { label: "Pending review", value: "37" },
  { label: "Approved", value: "129" },
  { label: "Released", value: "₱1,842,300" },
]

const assistanceTypes = [
  { label: "Medical assistance", desc: "Hospital bills, medicines, laboratory and confinement expenses" },
  { label: "Burial assistance", desc: "Funeral and burial cost support for indigent families" },
  { label: "Educational assistance", desc: "School supplies, tuition and allowance for students in crisis" },
  { label: "Transportation assistance", desc: "Fare and travel support for medical referrals or emergencies" },
]

const initialApplications = [
  { name: "Marites A. Bautista", type: "Medical assistance", filed: "Jul 28, 2026", amount: "₱8,500", status: "Pending" },
  { name: "Rodrigo S. Villanueva", type: "Burial assistance", filed: "Jul 27, 2026", amount: "₱10,000", status: "Approved" },
  { name: "Jennalyn P. Cruz", type: "Educational assistance", filed: "Jul 26, 2026", amount: "₱3,000", status: "Released" },
  { name: "Efren M. Delos Santos", type: "Transportation assistance", filed: "Jul 25, 2026", amount: "₱1,200", status: "Approved" },
  { name: "Aiza R. Fernandez", type: "Medical assistance", filed: "Jul 24, 2026", amount: "₱15,000", status: "For interview" },
]

export default function AICS() {
  const [view, setView] = useState<"dashboard" | "wizard">("dashboard")
  const [applications, setApplications] = useState(initialApplications)

  const handleSubmit = (result: AICSApplicationResult) => {
    setApplications((prev) => [
      { name: result.name || "Unnamed applicant", type: result.type, filed: "Jul 31, 2026", amount: result.amount, status: result.status },
      ...prev,
    ])
  }

  if (view === "wizard") {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          title="New AICS application"
          desc="Follow the intake, requirements, assessment and release steps to process a crisis assistance request."
        />
        <AICSApplicationWizard onCancel={() => setView("dashboard")} onSubmit={handleSubmit} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="AICS — Assistance to Individuals in Crisis"
          desc="Case intake and disbursement for residents facing medical, burial, educational or transportation emergencies."
        />
        <button
          onClick={() => setView("wizard")}
          className="shrink-0 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          New application
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Assistance types covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {assistanceTypes.map((a) => <ServiceCard key={a.label} {...a} />)}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent applications</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-4 py-2 font-medium">Applicant</th>
              <th className="px-4 py-2 font-medium">Assistance type</th>
              <th className="px-4 py-2 font-medium">Date filed</th>
              <th className="px-4 py-2 font-medium">Amount</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{a.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.filed}</td>
                <td className="px-4 py-3 text-foreground">{a.amount}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
