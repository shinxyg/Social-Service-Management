import { useNavigate } from "react-router-dom"
import { PageHeader } from "../shared"
import { Users, Baby, GraduationCap, ClipboardList } from "lucide-react"

const programs = [
  {
    icon: Users,
    label: "PWD & Senior Citizen Services",
    desc: "ID application, purchase discount booklet, and social pension enrollment for persons with disability and senior citizens.",
    requirements: ["Valid government-issued ID", "1x1 recent photo", "Medical Certificate (for PWD)"],
    path: "/portal/apply-pwd-senior",
  },
  {
    icon: Baby,
    label: "Solo Parent & Child Welfare",
    desc: "Solo parent ID registration, benefits enrollment, and educational assistance for children of registered solo parents.",
    requirements: ["Valid government-issued ID", "Proof of Status (Barangay Certificate)", "Birth certificate(s) of child/children"],
    path: "/portal/apply-solo-parent",
  },
  {
    icon: GraduationCap,
    label: "Livelihood & Training Program",
    desc: "Free skills training, TESDA-partnered certification, and livelihood starter kits for residents seeking sustainable income.",
    requirements: ["Valid government-issued ID", "Barangay Certificate of Residency"],
    path: "/portal/apply-livelihood",
  },
]

export default function OtherPrograms() {
  const navigate = useNavigate()

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Other programs"
        desc="Other social services offered by this office. Apply online below, or visit your barangay social welfare office with the listed requirements."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {programs.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.label} className="bg-card border border-border rounded-2xl p-5 shadow-soft space-y-3 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground mb-1.5">What to bring</p>
                <ul className="space-y-1">
                  {p.requirements.map((r) => (
                    <li key={r} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => navigate(p.path)}
                className="mt-1 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <ClipboardList className="h-4 w-4" />
                Apply now
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
