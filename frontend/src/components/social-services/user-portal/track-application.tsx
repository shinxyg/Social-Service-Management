import { useState } from "react"
import { Search } from "lucide-react"
import { PageHeader, StatusBadge } from "../shared"

// Mock lookup table — in production this queries the backend by reference number.
const mockRecords: Record<string, { name: string; type: string; status: string; updated: string; note: string }> = {
  "AICS-2026-4821": {
    name: "Marites A. Bautista",
    type: "Medical assistance",
    status: "Pending",
    updated: "Jul 28, 2026",
    note: "Your documents are being verified by a social worker.",
  },
  "AICS-2026-1190": {
    name: "Rodrigo S. Villanueva",
    type: "Burial assistance",
    status: "Approved",
    updated: "Jul 27, 2026",
    note: "Your application was approved. Please wait for the release schedule.",
  },
  "AICS-2026-3305": {
    name: "Jennalyn P. Cruz",
    type: "Educational assistance",
    status: "Released",
    updated: "Jul 26, 2026",
    note: "Your assistance has been released. Thank you.",
  },
}

export default function TrackApplication() {
  const [refInput, setRefInput] = useState("")
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<(typeof mockRecords)[string] | null>(null)

  const handleSearch = () => {
    const key = refInput.trim().toUpperCase()
    setResult(mockRecords[key] ?? null)
    setSearched(true)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Track my application"
        desc="Enter the reference number you received after submitting your application to check its current status."
      />

      <div className="max-w-xl space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-soft flex flex-col sm:flex-row gap-3">
          <input
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. AICS-2026-4821"
            className="flex-1 h-11 px-4 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={handleSearch}
            className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
          >
            <Search className="h-4 w-4" />
            Check status
          </button>
        </div>

        {searched && (
          result ? (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{result.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{result.type}</p>
                </div>
                <StatusBadge status={result.status} />
              </div>
              <p className="text-sm text-muted-foreground">{result.note}</p>
              <p className="text-xs text-muted-foreground">Last updated: {result.updated}</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft text-center text-sm text-muted-foreground">
              No application found for that reference number. Please check and try again, or visit your barangay
              social welfare office.
            </div>
          )
        )}
      </div>
    </div>
  )
}