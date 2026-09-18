"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser"
import { useEffect, useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Block } from "./components/common/Block"
import { toast } from "sonner"
import { CONTACT_FORM, IDENTITY, SOCIAL_LINKS } from "../../../lib/constants"

// The first thing the form asks, so a bug report and a job lead are told
// apart at a glance. App support pages link here with ?topic=<app>.
const TOPICS = ["project", "job", "crudo", "feit-y"] as const
type Topic = (typeof TOPICS)[number]

export default function Contact() {
  const t = useTranslations("contact")

  return (
    <Block id="contact" title={t("title")}>
      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <ContactInfo />
        <ContactForm />
      </div>
    </Block>
  )
}

function ContactForm() {
  const t = useTranslations("contact")
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" })
  const [topic, setTopic] = useState<Topic>("project")
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [loading, setLoading] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)
  const statusRef = useRef<HTMLDivElement>(null)
  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  // Read on mount rather than through useSearchParams, which would force a
  // Suspense boundary around the form in the static export.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic")
    if (TOPICS.includes(requested as Topic)) setTopic(requested as Topic)
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {}

    if (!form.name.trim()) {
      newErrors.name = t("validation.nameRequired")
    } else if (form.name.trim().length < CONTACT_FORM.minNameLength) {
      newErrors.name = t("validation.nameMinLength", { min: CONTACT_FORM.minNameLength })
    } else if (form.name.trim().length > CONTACT_FORM.maxNameLength) {
      newErrors.name = t("validation.nameMaxLength", { max: CONTACT_FORM.maxNameLength })
    }

    if (!form.email.trim()) {
      newErrors.email = t("validation.emailRequired")
    } else if (!validateEmail(form.email)) {
      newErrors.email = t("validation.emailInvalid")
    }

    if (!form.message.trim()) {
      newErrors.message = t("validation.messageRequired")
    } else if (form.message.trim().length < CONTACT_FORM.minMessageLength) {
      newErrors.message = t("validation.messageMinLength", { min: CONTACT_FORM.minMessageLength })
    } else if (form.message.trim().length > CONTACT_FORM.maxMessageLength) {
      newErrors.message = t("validation.messageMaxLength", { max: CONTACT_FORM.maxMessageLength })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      toast.error(t("toast.genericError"))
      if (statusRef.current) {
        statusRef.current.textContent = t("status.failed")
      }
      return
    }

    // Client-side rate limiting (prevent spam)
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    if (timeSinceLastSubmit < CONTACT_FORM.rateLimitWindow) {
      toast.error(t("toast.rateLimited"))
      return
    }

    if (!validateForm()) {
      toast.error(t("toast.formErrors"))
      return
    }

    if (form.website.trim()) {
      return
    }

    setLoading(true)
    if (statusRef.current) {
      statusRef.current.textContent = t("status.sending")
    }

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          // In the body rather than a new template variable, so it reaches the
          // inbox without editing the EmailJS template.
          message: `[${t(`form.topics.${topic}`)}] ${form.message.trim()}`,
        },
        { publicKey: emailJsPublicKey }
      )

      toast.success(t("toast.success"))
      setForm({ name: "", email: "", message: "", website: "" })
      setErrors({})
      setLastSubmitTime(Date.now())
      if (statusRef.current) {
        statusRef.current.textContent = t("status.sent")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("toast.genericError")
      toast.error(errorMessage)
      if (statusRef.current) {
        statusRef.current.textContent = t("status.failed")
      }
    } finally {
      setLoading(false)
    }
  }

  const maxMessageLength = CONTACT_FORM.maxMessageLength
  const messageLength = form.message.length

  return (
    <div>
      <div
        ref={statusRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />
      <form onSubmit={handleSubmit} aria-label={t("sendMessage")} className="flex flex-col gap-4" noValidate>
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        />
        <div>
          <label htmlFor="contact-topic" className="sr-only">
            {t("form.topics.label")}
          </label>
          <div className="relative">
          <select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            disabled={loading}
            className="border-input flex h-11 w-full appearance-none border bg-transparent px-3 pr-10 text-base outline-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px] disabled:opacity-50"
          >
            {TOPICS.map((key) => (
              <option key={key} value={key}>
                {t(`form.topics.${key}`)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div>
          <Input
            name="name"
            placeholder={t("form.namePlaceholder")}
            className={`w-full ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={loading}
            required
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            className={`w-full ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={loading}
            required
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <Textarea
            name="message"
            placeholder={t("form.messagePlaceholder")}
            className={`resize-none h-40 ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
            value={form.message}
            onChange={handleChange}
            maxLength={maxMessageLength}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error message-counter" : "message-counter"}
            disabled={loading}
            required
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p id="message-error" className="text-sm text-destructive" role="alert">
                {errors.message}
              </p>
            ) : (
              <span className="text-sm text-muted-foreground" id="message-counter">
                {t("form.characters", { count: messageLength, max: maxMessageLength })}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? t("form.sending") : t("form.sendButton")}
        </Button>
      </form>
    </div>
  )
}

function ContactInfo() {
  const t = useTranslations("contact")
  const routes = [
    { href: `mailto:${IDENTITY.email}`, label: IDENTITY.email, external: false },
    ...SOCIAL_LINKS.map(({ href, label }) => ({ href, label, external: true })),
  ]

  return (
    <div className="flex flex-col gap-10">
      <div>
        <ul aria-label={t("getInTouch")} className="border-b border-rule/15">
          {routes.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex items-center justify-between gap-4 border-t border-rule/15 py-4 hairline-draw"
              >
                <span className="break-all group-hover:text-primary">{r.label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">{t("trustTitle")}</h3>
        <ul className="space-y-1 text-muted-foreground">
          {(t.raw("trust") as string[]).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
