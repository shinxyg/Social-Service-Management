
import { ShieldAlert, Users, Baby, GraduationCap, Wallet, type LucideIcon } from "lucide-react"
import AICS from "./aics"
import PWDSeniorCitizen from "./pwd-senior-citizen"
import SoloParentChildWelfare from "./solo-parent-child-welfare"
import LivelihoodTraining from "./livelihood-training"
import FinancialAidDisbursement from "./financial-aid-disbursement"

export type ModuleRoute = {
  path: string
  label: string
  icon: LucideIcon
  Component: React.ComponentType
}

/* docx §13: each module gets its own route (e.g. /zoning, /housing).
   Here mapped to the Social Services modules actually in this app. */
export const moduleRoutes: ModuleRoute[] = [
  { path: "/aics", label: "AICS", icon: ShieldAlert, Component: AICS },
  { path: "/pwd-senior", label: "PWD & Senior Citizen Services", icon: Users, Component: PWDSeniorCitizen },
  { path: "/solo-parent", label: "Solo Parent & Child Welfare", icon: Baby, Component: SoloParentChildWelfare },
  { path: "/livelihood", label: "Livelihood & Training Program", icon: GraduationCap, Component: LivelihoodTraining },
  { path: "/financial-aid", label: "Financial Aid Disbursement", icon: Wallet, Component: FinancialAidDisbursement },
]

export const defaultModulePath = moduleRoutes[0].path

