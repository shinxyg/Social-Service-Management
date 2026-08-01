import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import SocialServicesLayout from "./components/layout/layout"
import { moduleRoutes, defaultModulePath } from "./components/layout/routes"
import { Login } from "./components/entry-login/Login"
import { Register } from "./components/entry-login/Register" 

import AICSUser from "./components/user-portal/aics-user"
import OtherPrograms from "./components/user-portal/other-programs"
import TrackApplication from "./components/user-portal/track-application"
import ApplyPWDSenior from "./components/user-portal/apply-pwd-senior"
import ApplySoloParent from "./components/user-portal/apply-solo-parent"
import ApplyLivelihood from "./components/user-portal/apply-livelihood"
import ApplyFinancialAid from "./components/user-portal/apply-financial-aid"

export default function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to={defaultModulePath} replace />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <Register /> : <Navigate to={defaultModulePath} replace />} 
        />

        {isAuthenticated ? (
          <Route element={<SocialServicesLayout />}>
            <Route index element={<Navigate to={defaultModulePath} replace />} />

            {/* Admin/staff module dashboards: /aics, /pwd-senior, /solo-parent, /livelihood, /financial-aid */}
            {moduleRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Resident-facing portal views */}
            <Route path="/portal" element={<Navigate to="/portal/aics" replace />} />
            <Route path="/portal/aics" element={<AICSUser />} />
            <Route path="/portal/other-programs" element={<OtherPrograms />} />
            <Route path="/portal/track" element={<TrackApplication />} />
            <Route path="/portal/apply-pwd-senior" element={<ApplyPWDSenior />} />
            <Route path="/portal/apply-solo-parent" element={<ApplySoloParent />} />
            <Route path="/portal/apply-livelihood" element={<ApplyLivelihood />} />
            <Route path="/portal/apply-financial-aid" element={<ApplyFinancialAid />} />
          </Route>
        ) : null}

        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? defaultModulePath : "/login"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  )
}