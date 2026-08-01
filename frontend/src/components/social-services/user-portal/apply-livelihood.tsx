import { useState } from "react"
import { Check, ClipboardList } from "lucide-react"
import { PageHeader } from "../shared"
import { Field, inputCls } from "../form-ui"

const trainingPrograms = [
  "Dressmaking NC II",
  "Food processing basics",
  "Electrical installation NC II",
  "Livelihood kit — sari-sari store",
  "No preference / open to any program",
]

function generateReference() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `LTP-2026-${num}`
}

export default function ApplyLivelihood() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [preferredProgram, setPreferredProgram] = useState(trainingPrograms[0])
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
            Thank you, {name}. Your registration for {preferredProgram.toLowerCase()} has been received and is
            now pending review by a social worker.
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
        title="Apply for Livelihood & Training"
        desc="Fill out this form to register for skills training, TESDA-partnered certification, or a livelihood starter kit."
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
          <Field label="Preferred program" full>
            <select value={preferredProgram} onChange={(e) => setPreferredProgram(e.target.value)} className={`${inputCls} h-10`}>
              {trainingPrograms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Why do you want to join?" full>
            <textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              rows={4}
              className={inputCls}
              placeholder="Briefly describe your goals or current situation..."
            />
          </Field>
        </div>

        <p className="text-xs text-muted-foreground">
          You will need to bring a valid ID and Barangay Certificate of Residency when you visit for skills
          assessment.
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