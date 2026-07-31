
import { useState, type ReactNode } from "react"
import { ArrowLeft, ArrowRight, Check, FileCheck2, ClipboardList, UserCheck, Wallet } from "lucide-react"

const assistanceTypes = [
  "Medical assistance",
  "Burial assistance",
  "Educational assistance",
  "Transportation assistance",
]

const requirementsByType: Record<string, string[]> = {
  "Medical assistance": [
    "Valid government-issued ID",
    "Barangay Certificate of Indigency",
    "Medical abstract or hospital bill",
    "Doctor's prescription (if applicable)",
  ],
  "Burial assistance": [
    "Valid government-issued ID",
    "Barangay Certificate of Indigency",
    "Death certificate",
    "Funeral contract or statement of account",
  ],
  "Educational assistance": [
    "Valid government-issued ID",
    "Barangay Certificate of Indigency",
    "Certificate of enrollment or school ID",
    "Report card (if applicable)",
  ],
  "Transportation assistance": [
    "Valid government-issued ID",
    "Barangay Certificate of Indigency",
    "Referral letter (if applicable)",
  ],
}

const steps = [
  { label: "Intake", icon: ClipboardList },
  { label: "Requirements", icon: FileCheck2 },
  { label: "Assessment", icon: UserCheck },
  { label: "Approval & Release", icon: Wallet },
]

export type AICSApplicationResult = {
  name: string
  type: string
  amount: string
  status: string
}

export function AICSApplicationWizard({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: (result: AICSApplicationResult) => void
}) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // Step 1 — Intake
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [type, setType] = useState(assistanceTypes[0])
  const [narrative, setNarrative] = useState("")

  // Step 2 — Requirements
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({})

  // Step 3 — Assessment
  const [interviewDate, setInterviewDate] = useState("")
  const [assessmentNotes, setAssessmentNotes] = useState("")
  const [recommendedAmount, setRecommendedAmount] = useState("")
  const [eligible, setEligible] = useState<"eligible" | "not-eligible">("eligible")

  // Step 4 — Approval & Release
  const [officer, setOfficer] = useState("")
  const [approvalStatus, setApprovalStatus] = useState<"Approved" | "Disapproved">("Approved")
  const [releaseAmount, setReleaseAmount] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [remarks, setRemarks] = useState("")

  const requirements = requirementsByType[type] ?? []
  const allChecked = requirements.length > 0 && requirements.every((r) => checkedDocs[r])

  const canProceed = () => {
    if (step === 0) return name.trim() && address.trim() && narrative.trim()
    if (step === 1) return allChecked
    if (step === 2) return interviewDate && assessmentNotes.trim() && recommendedAmount
    if (step === 3) return officer.trim() && releaseAmount && (approvalStatus === "Disapproved" || releaseDate)
    return true
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
      return
    }
    setSubmitted(true)
    onSubmit({
      name,
      type,
      amount: `₱${Number(releaseAmount || 0).toLocaleString()}`,
      status: approvalStatus === "Approved" ? "Released" : "Pending",
    })
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 shadow-soft flex flex-col items-center text-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-success/10 flex items-center justify-center">
          <Check className="h-7 w-7 text-success" />
        </div>
        <h2 className="text-lg font-heading font-semibold text-foreground">Application recorded</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {name || "The applicant"}'s {type.toLowerCase()} request has been logged with status "
          {approvalStatus === "Approved" ? "Released" : "Pending"}".
        </p>
        <button
          onClick={onCancel}
          className="mt-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stepper header */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
        <div className="flex items-center">
          {steps.map((s, i) => {
            const Icon = s.icon
            const isActive = i === step
            const isDone = i < step
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      isDone
                        ? "bg-success text-white"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                      i < step ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Client & case intake</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} h-10`} placeholder="Juan D. Dela Cruz" />
              </Field>
              <Field label="Contact number">
                <input value={contact} onChange={(e) => setContact(e.target.value)} className={`${inputCls} h-10`} placeholder="09XX XXX XXXX" />
              </Field>
              <Field label="Address" full>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputCls} h-10`} placeholder="Barangay, City" />
              </Field>
              <Field label="Type of assistance" full>
                <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputCls} h-10`}>
                  {assistanceTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Situation / reason for request" full>
                <textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  rows={3}
                  className={inputCls}
                  placeholder="Brief description of the crisis situation..."
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Requirements checklist — {type}</h2>
            <p className="text-xs text-muted-foreground">Check each document as it is received and verified from the applicant.</p>
            <div className="space-y-2">
              {requirements.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={!!checkedDocs[r]}
                    onChange={(e) => setCheckedDocs((c) => ({ ...c, [r]: e.target.checked }))}
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <span className="text-sm text-foreground">{r}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Social worker assessment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Interview date">
                <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className={`${inputCls} h-10`} />
              </Field>
              <Field label="Recommended amount (₱)">
                <input
                  type="number"
                  value={recommendedAmount}
                  onChange={(e) => setRecommendedAmount(e.target.value)}
                  className={`${inputCls} h-10`}
                  placeholder="0.00"
                />
              </Field>
              <Field label="Assessment notes" full>
                <textarea
                  value={assessmentNotes}
                  onChange={(e) => setAssessmentNotes(e.target.value)}
                  rows={3}
                  className={inputCls}
                  placeholder="Findings from the interview and home/case validation..."
                />
              </Field>
              <Field label="Eligibility" full>
                <div className="flex gap-3">
                  <RadioPill label="Eligible" value="eligible" current={eligible} onChange={setEligible} />
                  <RadioPill label="Not eligible" value="not-eligible" current={eligible} onChange={setEligible} />
                </div>
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Approval & release</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Approving officer">
                <input value={officer} onChange={(e) => setOfficer(e.target.value)} className={`${inputCls} h-10`} placeholder="Name of social welfare officer" />
              </Field>
              <Field label="Decision">
                <div className="flex gap-3">
                  <RadioPill label="Approved" value="Approved" current={approvalStatus} onChange={setApprovalStatus} />
                  <RadioPill label="Disapproved" value="Disapproved" current={approvalStatus} onChange={setApprovalStatus} />
                </div>
              </Field>
              <Field label="Release amount (₱)">
                <input
                  type="number"
                  value={releaseAmount}
                  onChange={(e) => setReleaseAmount(e.target.value)}
                  className={`${inputCls} h-10`}
                  placeholder="0.00"
                />
              </Field>
              <Field label="Release date">
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className={`${inputCls} h-10`}
                  disabled={approvalStatus === "Disapproved"}
                />
              </Field>
              <Field label="Remarks" full>
                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} className={inputCls} placeholder="Optional remarks..." />
              </Field>
            </div>
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => (step === 0 ? onCancel() : setStep(step - 1))}
          className="h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 0 ? "Cancel" : "Back"}
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center gap-1.5"
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
          {step < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-lg bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/40"

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function RadioPill<T extends string>({
  label,
  value,
  current,
  onChange,
}: {
  label: string
  value: T
  current: T
  onChange: (v: T) => void
}) {
  const active = current === value
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`h-10 px-4 rounded-xl text-sm font-medium border transition-colors ${
        active ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-border text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  )
}
