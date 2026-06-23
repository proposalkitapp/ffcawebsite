import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Firstfruits Christian Academy" },
      { name: "description", content: "How to apply for admission into Firstfruits Christian Academy junior and senior secondary school." },
      { property: "og:title", content: "Admissions — Firstfruits Christian Academy" },
      { property: "og:description", content: "Application process and requirements for JSS and SSS admissions." },
      { property: "og:url", content: "/admissions" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: Admissions,
});

function Admissions() {
  return (
    <SiteLayout>
      <section className="bg-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-semibold text-primary">Admissions</span>
          <h1 className="mt-3 text-5xl font-bold text-ink">Join the Firstfruits Family</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-lg">We welcome applications from families seeking a Christ-centred, high-quality secondary education for their children.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-ink">Application Process</h2>
              <ol className="mt-6 space-y-5">
                {[
                  { t: "Obtain & complete the application form", d: "Forms are available at the school office or by request via email." },
                  { t: "Submit required documents", d: "Recent passport photographs, birth certificate, and last school report." },
                  { t: "Entrance examination & interview", d: "Applicants sit a written assessment in Mathematics and English, followed by a short interview with parents/guardians." },
                  { t: "Admission offer & enrolment", d: "Successful applicants receive an offer letter with details on fees and resumption." },
                ].map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">{i + 1}</div>
                    <div>
                      <h3 className="font-semibold text-ink">{s.t}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink">Why Choose Firstfruits</h2>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  "BECE & WAEC approved examination centre",
                  "Co-educational Christian environment",
                  "Fully functional boarding facilities",
                  "Modern science and computer laboratories",
                  "Qualified, passionate teachers",
                  "Safe, fully fenced rural campus",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-ink/80">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-lg border border-border bg-surface p-8 h-fit">
            <h3 className="font-semibold text-ink">Admissions Office</h3>
            <p className="text-sm text-muted-foreground mt-2">For enquiries about the application process, fees and visits.</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="text-ink font-medium">admissions@firstfruitsacademy.edu.ng</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-ink font-medium">+234 (0) 800 000 0000</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Address</dt>
                <dd className="text-ink font-medium">Adjacent Government Estate, Opposite Palm View Estate, Chokwota, Igbo-Etche, Rivers State</dd>
              </div>
            </dl>
            <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Contact Us
            </Link>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
