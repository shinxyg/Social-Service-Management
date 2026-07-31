
import { StatCard, ServiceCard, StatusBadge, PageHeader } from "./shared"

const stats = [
  { label: "Registered solo parents", value: "642" },
  { label: "Active child welfare cases", value: "58" },
  { label: "Solo parent IDs issued", value: "601" },
  { label: "Cases needing follow-up", value: "13" },
]

const services = [
  { label: "Solo parent ID", desc: "Registration under the Solo Parents Welfare Act for benefits access" },
  { label: "Child welfare case management", desc: "Intake, monitoring and referral for child protection concerns" },
  { label: "Educational assistance", desc: "School subsidy for children of registered solo parents" },
  { label: "Protective custody referral", desc: "Coordination with DSWD and law enforcement for at-risk children" },
]

const cases = [
  { name: "Grace M. Villareal", type: "Solo parent ID", dependents: "2 children", status: "Approved" },
  { name: "Case No. CW-2026-0071", type: "Child welfare case", dependents: "1 child, age 7", status: "Under monitoring" },
  { name: "Danilo P. Mercado", type: "Solo parent ID renewal", dependents: "3 children", status: "Pending" },
  { name: "Case No. CW-2026-0065", type: "Child welfare case", dependents: "2 children, ages 4 and 9", status: "For home visit" },
]

export default function SoloParentChildWelfare() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Solo parent & child welfare support"
        desc="Solo parent identification, benefits enrollment, and child welfare case monitoring and referral."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Services offered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((s) => <ServiceCard key={s.label} {...s} />)}
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Active records</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-4 py-2 font-medium">Name / case</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Dependents</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.dependents}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

