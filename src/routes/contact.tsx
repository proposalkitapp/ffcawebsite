import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Firstfruits Christian Academy" },
      { name: "description", content: "Get in touch with Firstfruits Christian Academy in Chokwota, Igbo-Etche, Rivers State." },
    ],
  }),
  component: Contact,
});

function Contact() {
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
              { icon: Mail, t: "Email", d: "info@firstfruitsacademy.edu.ng" },
              { icon: Phone, t: "Phone", d: "+234 (0) 800 000 0000" },
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

          <form className="rounded-lg border border-border bg-white p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-bold text-ink">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="text-ink/80 font-medium">Full name</span>
                <input className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block text-sm">
                <span className="text-ink/80 font-medium">Email</span>
                <input type="email" className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-ink/80 font-medium">Subject</span>
              <input className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="block text-sm">
              <span className="text-ink/80 font-medium">Message</span>
              <textarea rows={5} className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <button className="inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
