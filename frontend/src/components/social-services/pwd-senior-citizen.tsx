
import { StatCard, ServiceCard, StatusBadge, PageHeader } from "./shared"

const stats = [
  { label: "Registered PWD", value: "1,204" },
  { label: "Registered senior citizens", value: "3,678" },
  { label: "ID applications pending", value: "42" },
  { label: "Social pension recipients", value: "986" },
]

const services = [
  { label: "PWD ID application", desc: "New registration and identification card issuance" },
  { label: "Senior citizen ID application", desc: "OSCA-issued ID for residents 60 years old and above" },
  { label: "Purchase discount booklet", desc: "20% discount and VAT exemption booklet issuance" },
  { label: "Social pension", desc: "Monthly stipend enrollment for indigent seniors and PWDs" },
]

const records = [
  { name: "Leonora T. Aquino", category: "Senior citizen", idNumber: "SC-2026-00481", action: "New application", status: "Approved" },
  { name: "Michael D. Ramos", category: "PWD", idNumber: "PWD-2026-00219", action: "New application", status: "For assessment" },
  { name: "Corazon V. Santos", category: "Senior citizen", idNumber: "SC-2024-00093", action: "ID renewal", status: "Ready for release" },
  { name: "Ferdinand L. Reyes", category: "PWD", idNumber: "PWD-2025-00107", action: "Booklet reissuance", status: "Pending" },
]

export default function PWDSeniorCitizen() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="PWD & senior citizen services"
        desc="Registration, ID issuance, discount privileges and social pension enrollment for persons with disability and senior citizens."
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
          <h2 className="text-sm font-semibold text-foreground">Recent records</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-4 py-2 font-medium">Beneficiary</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">ID number</th>
              <th className="px-4 py-2 font-medium">Action</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.idNumber} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{r.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.idNumber}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.action}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

