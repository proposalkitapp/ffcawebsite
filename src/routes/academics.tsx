import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Beaker, Library, Monitor, BedDouble, Sprout, Trophy } from "lucide-react";
import lab from "@/assets/lab.jpg";
import library from "@/assets/library.jpg";
import computer from "@/assets/computer.jpg";
import boarding from "@/assets/boarding.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Firstfruits Christian Academy" },
      { name: "description", content: "Curriculum, facilities, sports and student life at Firstfruits Christian Academy." },
    ],
  }),
  component: Academics,
});

function Academics() {
  return (
    <SiteLayout>
      <section className="bg-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-semibold text-primary">Academics</span>
          <h1 className="mt-3 text-5xl font-bold text-ink">Curriculum & Facilities</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-lg">Our curriculum follows the national policy on education — three years of junior secondary (JSS 1–3) and three years of senior secondary (SSS 1–3) — preparing students for BECE, WAEC and beyond.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: lab, icon: Beaker, t: "Science Laboratories", d: "Well-equipped Chemistry, Biology and Physics labs where students conduct experiments and develop a love for scientific inquiry." },
            { img: computer, icon: Monitor, t: "Computer Laboratory", d: "Modern computer lab fostering creativity, digital literacy, programming and web development under experienced teachers." },
            { img: library, icon: Library, t: "School Library", d: "A quiet reading environment with books neatly arranged on shelves and seating for focused study." },
            { img: boarding, icon: BedDouble, t: "Boarding House", d: "Spacious, neat rooms with constant power, water heaters in the laundry area and warm showers all year round." },
            { icon: Trophy, t: "Sports & Inter-House", d: "Inter-house sports across Yellow, Blue, Green and Red houses — building teamwork, leadership and confidence." },
            { icon: Sprout, t: "Agriculture", d: "Hands-on agricultural studies on campus — practical learning rooted in community and stewardship." },
          ].map((f) => (
            <article key={f.t} className="rounded-lg overflow-hidden bg-white border border-border">
              {f.img && (
                <div className="h-44 overflow-hidden">
                  <img src={f.img} alt={f.t} width={800} height={600} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <f.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold text-ink">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-ink">Spiritual Life</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">Christian values are woven through every part of school life — from morning devotions and Bible study sessions like "Mystery Beyond the Veil" to daily conduct in the classroom and boarding house. We believe the fear of God is the beginning of wisdom.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
