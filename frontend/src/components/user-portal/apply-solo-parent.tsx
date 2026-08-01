import { useState } from "react"
import { Check, ClipboardList } from "lucide-react"
import { PageHeader } from "../ui/shared"
import { Field, inputCls } from "../ui/form-ui"

function generateReference() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `SP-2026-${num}`
}

export default function ApplySoloParent() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [dependents, setDependents] = useState("")
  const [proofOfStatus, setProofOfStatus] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState("")

  const canSubmit = name.trim() && address.trim() && contact.trim() && dependents.trim() && proofOfStatus.trim()

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
            Thank you, {name}. Your Solo Parent ID application has been received and is now pending review by a
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
        title="Apply for Solo Parent ID"
        desc="Fill out this form to register under the Solo Parents Welfare Act. A social worker will review your application and contact you for the next steps."
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
          <Field label="Dependents" full>
            <input
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              className={`${inputCls} h-10`}
              placeholder="e.g. 2 children, ages 5 and 9"
            />
          </Field>
          <Field label="Proof of status" full>
            <textarea
              value={proofOfStatus}
              onChange={(e) => setProofOfStatus(e.target.value)}
              rows={3}
              className={inputCls}
              placeholder="Briefly describe your basis for solo parent status (e.g. widowed, separated, OFW spouse)..."
            />
          </Field>
        </div>

        <p className="text-xs text-muted-foreground">
          You will need to bring a valid ID, proof of status (Barangay Certificate / death certificate / court
          order), and birth certificate(s) of your child/children when you visit your barangay social welfare
          office.
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