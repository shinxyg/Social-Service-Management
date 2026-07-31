import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SocialServicesLayout from "./components/social-services/layout"
import { moduleRoutes, defaultModulePath } from "./components/social-services/routes"
import { ToastProvider } from "./components/social-services/toast"

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SocialServicesLayout />}>
            <Route index element={<Navigate to={defaultModulePath} replace />} />
            {moduleRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}