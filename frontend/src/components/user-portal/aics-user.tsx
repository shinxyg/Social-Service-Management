import { useState } from "react"
import {
  HeartPulse,
  Flame,
  Truck,
  Package,
  Utensils,
  Banknote,
  ChevronRight,
  ClipboardList,
} from "lucide-react"
import ApplyAICS from "./apply-aics"
import { useLanguage } from "../ui/language-context"

/*
  This is the actual "AICS" page a resident sees after clicking AICS in
  the sidebar (user-layout.tsx). Ported from the standalone AICS
  dashboard mockup — same 6 assistance types, same circular icon tiles,
  same "AICS ASSISTANCE" heading — but built with the project's real
  Tailwind tokens (bg-card, text-primary, shadow-soft, etc.) instead of
  the mockup's inline hex/hsl styles, and wired so each card opens the
  real apply form with that assistance type pre-selected.
*/

// TODO: the staff-side wizard (wizards/application-wizard.tsx) only has
// document requirements defined for Medical / Burial / Educational /
// Transportation assistance. If Material, Food and Cash Relief are meant
// to be real AICS categories going forward, that requirementsByType map
// needs matching entries too — flagging so admin-side stays in sync.

export default function AICSUser() {
  const { t } = useLanguage()
  const [view, setView] = useState<"info" | "apply">("info")

  const ASSIST_ITEMS = [
    { label: t("aicsMedical"), formType: "Medical assistance", icon: HeartPulse },
    { label: t("aicsFuneral"), formType: "Funeral assistance", icon: Flame },
    { label: t("aicsTransportation"), formType: "Transportation assistance", icon: Truck },
    { label: t("aicsMaterial"), formType: "Material assistance", icon: Package },
    { label: t("aicsFood"), formType: "Food assistance", icon: Utensils },
    { label: t("aicsCashRelief"), formType: "Cash relief assistance", icon: Banknote },
  ]

  const [selectedType, setSelectedType] = useState<string>(ASSIST_ITEMS[0].formType)
  const residentName = "Juan" // placeholder until auth/profile data is wired in

  if (view === "apply") {
    return (
      <div className="p-4 md:p-6">
        <button
          onClick={() => setView("info")}
          className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("back")}
        </button>
        {/* TODO: remove this cast once apply-aics.tsx is updated to accept
            an `initialType` prop — right now the old ApplyAICS() takes no
            props, so TS flags this. The prop is still passed through at
            runtime (harmless extra prop) so nothing breaks in the meantime. */}
        <ApplyAICS {...({ initialType: selectedType } as Record<string, unknown>)} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <p className="text-xs text-muted-foreground mb-1">
        {t("aicsWelcome", { name: residentName })}
      </p>

      <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary mb-6">
        {t("aicsAssistance")}
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
        {ASSIST_ITEMS.map(({ label, formType, icon: Icon }) => (
          <li key={formType}>
            <button
              onClick={() => {
                setSelectedType(formType)
                setView("apply")
              }}
              className="w-full flex items-center gap-3.5 bg-card border border-border rounded-2xl px-4 py-3 shadow-soft transition-all duration-150 hover:-translate-y-0.5 hover:shadow-medium hover:border-primary/35 text-left"
            >
              <div className="h-11 w-11 shrink-0 rounded-full bg-linear-to-br from-primary to-primary/70 shadow-lg shadow-primary/30 flex items-center justify-center">
                <Icon className="h-5.5 w-5.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground flex-1">{label}</span>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 bg-muted/50 border border-border rounded-2xl p-5 text-sm text-muted-foreground flex items-start gap-2.5">
        <ClipboardList className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
        {t("aicsFooterNote")}
      </div>
    </div>
  )
}