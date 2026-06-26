import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { submitContactMessage } from "@/lib/contact.functions";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Firstfruits Christian Academy" },
      { name: "description", content: "Get in touch with Firstfruits Christian Academy in Chokwota, Igbo-Etche, Rivers State. Phone, email, and inquiry form." },
      { property: "og:title", content: "Contact Firstfruits Christian Academy" },
      { property: "og:description", content: "Phone, email and inquiry form for Firstfruits Christian Academy." },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(submitContactMessage);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await submit({ data: form });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <SiteLayout>
      <section className="bg-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-semibold text-primary">Contact</span>
          <h1 className="mt-3 text-5xl font-bold text-ink">Get in Touch</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-lg">We'd love to hear from you. Reach us by phone, email or by visiting the school.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: MapPin, t: "Address", d: "Adjacent Government Estate, Opposite Palm View Estate, Chokwota, Igbo-Etche, Rivers State, Nigeria." },
              { icon: Mail, t: "Email", d: "firstfruit.academy@gmail.com" },
              { icon: Phone, t: "Phone", d: "09056215807, 08066170299, 0808652232" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 rounded-lg border border-border bg-white p-6">
                <div className="h-11 w-11 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{c.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="rounded-lg border border-border bg-white p-8 space-y-4">
            <h2 className="text-xl font-bold text-ink">Send us a message</h2>

            {status === "sent" && (
              <div className="flex items-start gap-3 rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Message sent — thank you!</div>
                  <div>We've received your inquiry and will be in touch shortly.</div>
                </div>
              </div>
            )}
            {status === "error" && error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="block text-sm">
                <label htmlFor="contact-name" className="text-ink/80 font-medium">Full name</label>
                <input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={update("name")} className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="block text-sm">
                <label htmlFor="contact-email" className="text-ink/80 font-medium">Email</label>
                <input id="contact-email" name="email" autoComplete="email" required type="email" maxLength={255} value={form.email} onChange={update("email")} className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="block text-sm">
              <label htmlFor="contact-subject" className="text-ink/80 font-medium">Subject</label>
              <input id="contact-subject" name="subject" required maxLength={200} value={form.subject} onChange={update("subject")} className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="block text-sm">
              <label htmlFor="contact-message" className="text-ink/80 font-medium">Message</label>
              <textarea id="contact-message" name="message" required maxLength={5000} rows={5} value={form.message} onChange={update("message")} className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
