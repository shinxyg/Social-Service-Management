import { NavLink } from "react-router-dom"
import { Building2, ChevronRight, LogOut } from "lucide-react"
import { moduleRoutes } from "./routes"

export function AppSidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`shrink-0 gradient-sidebar flex flex-col h-screen sticky top-0 overflow-hidden transition-all duration-300 ${
        open ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 flex flex-col h-full">
        {/* Brand */}
        <div className="p-5 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-sidebar-foreground/50 leading-tight">
              Social Services Management
            </p>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Modules
            </p>
            <div className="flex flex-col gap-1">
              {moduleRoutes.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-sidebar-primary/15 text-sidebar-foreground shadow-soft"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 ${
                          isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
                        }`}
                      />
                      <span className="flex-1 text-left">{label}</span>
                      {isActive && <ChevronRight className="h-4 w-4 text-sidebar-primary" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-foreground/10">
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-sidebar-accent transition-colors cursor-pointer">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-sidebar-primary to-primary flex items-center justify-center text-xs font-semibold text-white shrink-0">
              SW
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Social Worker</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">socialworker@lgu.gov.ph</p>
            </div>
            <LogOut className="h-4 w-4 text-sidebar-foreground/40 shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  )
}