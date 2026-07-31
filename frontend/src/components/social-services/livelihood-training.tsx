
import { StatCard, ServiceCard, StatusBadge, PageHeader } from "./shared"

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

export default function LivelihoodTraining() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Livelihood & training program"
        desc="Skills training, TESDA-partnered certification, and livelihood starter kits for residents seeking sustainable income."
      />
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
    </div>
  )
}

