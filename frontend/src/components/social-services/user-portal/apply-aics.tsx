import { useState } from "react"
import { Check, ClipboardList } from "lucide-react"
import { PageHeader } from "../shared"

const assistanceTypes = [
  "Medical assistance",
  "Burial assistance",
  "Educational assistance",
  "Transportation assistance",
]

function generateReference() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `AICS-2026-${num}`
}

export default function ApplyAICS() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [type, setType] = useState(assistanceTypes[0])
  const [narrative, setNarrative] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState("")

  const canSubmit = name.trim() && address.trim() && contact.trim() && narrative.trim()

  const handleSubmit = () => {
    if (!canSubmit) return
    setReference(generateReference())
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 md:p-6 max-w-xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-soft flex flex-col items-center text-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-success/10 flex items-center justify-center">
            <Check className="h-7 w-7 text-success" />
          </div>
          <h2 className="text-lg font-heading font-semibold text-foreground">Application submitted</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Thank you, {name}. Your {type.toLowerCase()} request has been received and is now pending review by a
            social worker.
          </p>
          <div className="mt-2 bg-muted rounded-xl px-4 py-3 w-full">
            <p className="text-xs text-muted-foreground">Reference number</p>
            <p className="text-sm font-semibold text-foreground">{reference}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Save this reference number to track your application status.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
      <PageHeader
        title="Apply for AICS assistance"
        desc="Fill out this form to request Assistance to Individuals in Crisis Situations. A social worker will review your application and contact you for the next steps."
      />

      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ClipboardList className="h-4 w-4 text-primary" />
          Applicant information
        </div>

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
              rows={4}
              className={inputCls}
              placeholder="Briefly describe your crisis situation..."
            />
          </Field>
        </div>

        <p className="text-xs text-muted-foreground">
          You will need to bring supporting documents (valid ID, Barangay Certificate of Indigency, and
          type-specific requirements) when you visit your barangay social welfare office for verification.
        </p>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          Submit application
        </button>
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-lg bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/40"

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  )
}