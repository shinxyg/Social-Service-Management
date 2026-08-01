import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import SocialServicesLayout from "./components/social-services/layout"
import { moduleRoutes, defaultModulePath } from "./components/social-services/routes"

import AICSUser from "./components/social-services/user-portal/aics-user"
import OtherPrograms from "./components/social-services/user-portal/other-programs"
import TrackApplication from "./components/social-services/user-portal/track-application"
import ApplyPWDSenior from "./components/social-services/user-portal/apply-pwd-senior"
import ApplySoloParent from "./components/social-services/user-portal/apply-solo-parent"
import ApplyLivelihood from "./components/social-services/user-portal/apply-livelihood"
import ApplyFinancialAid from "./components/social-services/user-portal/apply-financial-aid"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Single shared sidebar layout for BOTH staff modules and resident portal */}
        <Route element={<SocialServicesLayout />}>
          <Route index element={<Navigate to={defaultModulePath} replace />} />

          {/* Staff/manager modules */}
          {moduleRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {/* Resident-facing portal — same sidebar, expandable under "User Portal" */}
          <Route path="/portal" element={<Navigate to="/portal/aics" replace />} />
          <Route path="/portal/aics" element={<AICSUser />} />
          <Route path="/portal/other-programs" element={<OtherPrograms />} />
          <Route path="/portal/track" element={<TrackApplication />} />
          <Route path="/portal/apply-pwd-senior" element={<ApplyPWDSenior />} />
          <Route path="/portal/apply-solo-parent" element={<ApplySoloParent />} />
          <Route path="/portal/apply-livelihood" element={<ApplyLivelihood />} />
          <Route path="/portal/apply-financial-aid" element={<ApplyFinancialAid />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={defaultModulePath} replace />} />
      </Routes>
    </BrowserRouter>
  )
}