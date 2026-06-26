import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { GraduationCap, BookOpen, Building2, ArrowRight, Beaker, Library, Monitor, BedDouble, Trophy, Sprout, Clock, ShieldCheck } from "lucide-react";
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
      { property: "og:image", content: "https://ffcawebsite.lovable.app/og-image.jpg" },
      { property: "og:url", content: "https://ffcawebsite.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:image", content: "https://ffcawebsite.lovable.app/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://ffcawebsite.lovable.app/" },
      { rel: "preload", as: "image", href: hero, fetchpriority: "high" },
    ],
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
          email: "firstfruit.academy@gmail.com",
          telephone: "+234-905-621-5807",
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
          <img src={hero} alt="Firstfruits Christian Academy campus building exterior with students" width={1600} height={1000} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
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
              { icon: GraduationCap, title: "BECE & WAEC Centre", desc: "Admitting into JSS 1–3 and SSS 1–3 with approved examination centres.", to: "/admissions" as const, cta: "Admission Details" },
              { icon: BookOpen, title: "Christian Values", desc: "Daily devotion, Bible study, obedience, excellence, discipline and sound morals.", to: "/about" as const, cta: "Our Mission" },
              { icon: Building2, title: "Boarding Facilities", desc: "Spacious rooms, caring hostel parents, treated water, warm showers and meals.", to: "/academics" as const, cta: "View Facilities" },
            ].map((f, i) => (
              <div key={f.title} className={`p-8 ${i < 2 ? "md:border-r border-border" : ""}`}>
                <f.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <Link to={f.to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-primary">
                  {f.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Firstfruits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src={students} alt="Firstfruits students" width={1000} height={1200} loading="lazy" className="rounded-lg shadow-lg w-full h-[520px] object-cover" />
          </div>
          <div>
            <span className="text-sm font-semibold text-primary">Explore Firstfruits</span>
            <h2 className="mt-3 text-4xl font-bold text-ink leading-tight">A Citadel of Learning rooted in Christian Values</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Firstfruits Christian Academy is established to offer high quality educational services based on Christian values. Located in a quiet, secure, and conducive setting in Chokwota, Igbo-Etche — within easy reach of Port Harcourt — we raise students with the fear of God and a sound academic foundation.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Secure Campus", desc: "Fully fenced, serene environment for focused learning.", to: "/about" as const },
                { icon: Beaker, title: "Practical Learning", desc: "Science practicals, laboratories and computer skills.", to: "/academics" as const },
                { icon: Trophy, title: "Sports & Talent", desc: "Inter-house sports, debate, spelling bee, music and drama.", to: "/academics" as const },
                { icon: Sprout, title: "Life Skills", desc: "Summer lessons include soap making, catering and baking.", to: "/admissions" as const },
              ].map((item) => (
                <Link key={item.title} to={item.to} className="group rounded-lg border border-border bg-white p-5 hover:border-primary/40 hover:shadow-md transition">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold text-ink group-hover:text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-ink hover:border-primary/40 hover:text-primary">
                Visit or Enquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-10 grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Morning Devotion", desc: "Students and teachers gather Monday to Friday from 7:45 am to 8:10 am for prayer, worship, Bible reading and encouragement.", to: "/academics" as const },
              { icon: GraduationCap, title: "2025/2026 Session", desc: "The academic session commences on 5th September, 2025, with admission into Junior and Senior Secondary classes.", to: "/admissions" as const },
              { icon: Monitor, title: "Digital Readiness", desc: "Our computer laboratory builds skills from basic computer literacy to programming, web development and project-based learning.", to: "/academics" as const },
            ].map((item) => (
              <article key={item.title} className="rounded-xl bg-white border border-border p-6">
                <item.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <Link to={item.to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
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
