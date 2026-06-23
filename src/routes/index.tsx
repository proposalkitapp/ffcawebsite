import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { GraduationCap, BookOpen, Building2, Check, ArrowRight, Beaker, Library, Monitor, BedDouble } from "lucide-react";
import hero from "@/assets/hero-school.jpg";
import students from "@/assets/students.jpg";
import lab from "@/assets/lab.jpg";
import library from "@/assets/library.jpg";
import computer from "@/assets/computer.jpg";
import boarding from "@/assets/boarding.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Firstfruits Christian Academy — Obedience and Excellence" },
      { name: "description", content: "A co-educational Christian secondary school in Igbo-Etche, Rivers State. BECE & WAEC approved with fully functional boarding facilities." },
      { property: "og:title", content: "Firstfruits Christian Academy" },
      { property: "og:description", content: "Raising a generation grounded in Godly Christian principles and academic excellence." },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: "Firstfruits Christian Academy",
          description: "Co-educational Christian secondary school in Igbo-Etche, Rivers State.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Adjacent Government Estate, Opposite Palm View Estate, Chokwota",
            addressRegion: "Rivers State",
            addressCountry: "NG",
          },
          email: "info@firstfruitsacademy.edu.ng",
          slogan: "Obedience and Excellence",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[640px] overflow-hidden">
          <img src={hero} alt="Firstfruits Christian Academy campus" width={1600} height={1000} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/80 mb-4">Firstfruits Christian Academy</span>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.05]">Together We'll Explore New Things</h1>
              <p className="mt-6 text-lg text-white/80 max-w-lg">We believe everyone should have the opportunity to grow through Christ-centered, high-quality education that nurtures mind, character, and faith.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/admissions" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/academics" className="inline-flex items-center rounded-md border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                  Explore Academics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating feature cards */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
          <div className="grid md:grid-cols-3 bg-white rounded-lg shadow-xl border border-border overflow-hidden">
            {[
              { icon: GraduationCap, title: "Graduation", desc: "Approved BECE and WAEC centre with strong academic outcomes." },
              { icon: BookOpen, title: "Christian Values", desc: "Faith-based education rooted in obedience, excellence, and integrity." },
              { icon: Building2, title: "Boarding Facilities", desc: "A safe, well-equipped home away from home for boarding students." },
            ].map((f, i) => (
              <div key={f.title} className={`p-8 ${i < 2 ? "md:border-r border-border" : ""}`}>
                <f.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-primary">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src={students} alt="Firstfruits students" width={1000} height={1200} loading="lazy" className="rounded-lg shadow-lg w-full h-[520px] object-cover" />
          </div>
          <div>
            <span className="text-sm font-semibold text-primary">About Firstfruits</span>
            <h2 className="mt-3 text-4xl font-bold text-ink leading-tight">A Citadel of Learning rooted in Christian Values</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Firstfruits Christian Academy is established to offer high quality educational services based on Christian values. Located in a quiet, secure, and conducive setting in Chokwota, Igbo-Etche — within easy reach of Port Harcourt — we raise students with the fear of God and a sound academic foundation.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Access to a complete junior and senior secondary curriculum",
                "Learn the latest skills in modern laboratories and computer studies",
                "Develop character through obedience, excellence and discipline",
                "Fully functional boarding facilities — a true home away from home",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 grid place-items-center"><Check className="h-3 w-3 text-primary" /></span>
                  <span className="text-ink/80">{t}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "15+", l: "Years of Educational Excellence" },
            { n: "30+", l: "Qualified Teachers & Staff" },
            { n: "20+", l: "Subjects across JSS & SSS" },
            { n: "500+", l: "Students Enrolled" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="text-4xl font-bold text-primary">{s.n}</div>
              <div className="mt-2 text-sm text-muted-foreground max-w-[180px]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary">Our Facilities</span>
            <h2 className="mt-3 text-4xl font-bold text-ink">Equipped for Discovery and Growth</h2>
            <p className="mt-4 text-muted-foreground">From science laboratories to a modern computer lab and a quiet library — every space at Firstfruits is built to spark curiosity and develop skill.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: lab, icon: Beaker, title: "Science Laboratories", desc: "Hands-on Chemistry, Biology and Physics experiments." },
              { img: library, icon: Library, title: "School Library", desc: "Quiet reading rooms with a rich collection of texts." },
              { img: computer, icon: Monitor, title: "Computer Laboratory", desc: "Digital literacy, programming and web development." },
              { img: boarding, icon: BedDouble, title: "Boarding House", desc: "Spacious rooms, warm showers and nutritious meals." },
            ].map((f) => (
              <article key={f.title} className="group rounded-lg overflow-hidden bg-white border border-border hover:shadow-lg transition">
                <div className="h-44 overflow-hidden">
                  <img src={f.img} alt={f.title} width={800} height={600} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <f.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials carousel */}
      <TestimonialsCarousel />

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-primary text-primary-foreground p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Begin your Firstfruits journey today.</h2>
              <p className="mt-3 text-primary-foreground/85 max-w-xl">Admissions are open for the new academic session. Apply now and join a community committed to Obedience and Excellence.</p>
            </div>
            <Link to="/admissions" className="inline-flex items-center gap-2 rounded-md bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-white/90">
              Start Application <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
