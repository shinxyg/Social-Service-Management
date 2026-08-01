import { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Search, HelpCircle, Bell, Menu, User, Settings, LogOut, Sun, Moon } from "lucide-react"
import { moduleRoutes } from "./routes"
import { Tooltip } from "./tooltip"

export function AppHeader({
  onToggleSidebar,
  dark,
  onToggleDark,
}: {
  onToggleSidebar: () => void
  dark: boolean
  onToggleDark: () => void
}) {
  const location = useLocation()
  const current = moduleRoutes.find((r) => r.path === location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-16 sticky top-0 z-40 flex items-center justify-between gap-4 px-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 min-w-0">
        <Tooltip label="Toggle sidebar">
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Tooltip>
        <p className="text-sm font-medium text-foreground truncate">
          {current?.label ?? "Social Services Management"}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:flex items-center gap-2 w-80 h-10 px-3 rounded-xl bg-muted text-muted-foreground">
          <Search className="h-4 w-4 shrink-0" />
          <input
            type="text"
            placeholder="Search applications, records..."
            className="bg-transparent border-0 outline-none text-sm w-full placeholder:text-muted-foreground"
          />
        </div>

        <Tooltip label={dark ? "Switch to light mode" : "Switch to dark mode"}>
          <button
            aria-label="Toggle theme"
            onClick={onToggleDark}
            className="h-10 w-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </Tooltip>

        <Tooltip label="Help & guides">
          <button
            aria-label="Help"
            className="h-10 w-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </Tooltip>

        <Tooltip label="Notifications">
          <button
            aria-label="Notifications"
            className="relative h-10 w-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
        </Tooltip>

        {/* User menu with dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-foreground leading-tight">Social Worker</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Staff</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-primary to-info flex items-center justify-center text-xs font-semibold text-white shrink-0">
              SW
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-medium py-1.5 z-50">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <Settings className="h-4 w-4 text-muted-foreground" />
                Settings
              </button>
              <div className="my-1 border-t border-border" />
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}