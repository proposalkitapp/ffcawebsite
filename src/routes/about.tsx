import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import students from "@/assets/students.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Firstfruits Christian Academy" },
      { name: "description", content: "Our vision, mission, and Christian philosophy of education at Firstfruits Christian Academy." },
      { property: "og:title", content: "About Firstfruits Christian Academy" },
      { property: "og:description", content: "Vision, mission, and the people behind Firstfruits Christian Academy." },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-semibold text-primary">About Us</span>
          <h1 className="mt-3 text-5xl font-bold text-ink">A Haven of Excellence</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-lg">"Of his own will begat he us with the word of truth, that we should be a kind of Firstfruits of his creatures." — James 1:18</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-2xl font-bold text-ink">Vision & Background</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">The school is established to offer high quality educational services based on Christian values. Our aim is to give young people the benefit of high-standard education where Christian principles are practiced. The school is located in Chokwota, Igbo-Etche, Rivers State — deliberately rural, quiet and conducive for learning, while within easy reach of Port Harcourt metropolis. The school is fully fenced and secure.</p>

            <h2 className="mt-10 text-2xl font-bold text-ink">Mission Statement</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">To be a foremost high school educational institution raising a generation based on Godly Christian Principles.</p>

            <h2 className="mt-10 text-2xl font-bold text-ink">Motto</h2>
            <p className="mt-2 text-primary font-semibold text-xl">Obedience and Excellence</p>
          </div>
          <div>
            <img src={students} alt="Firstfruits Christian Academy students in school uniform in a classroom setting" width={1000} height={1200} loading="lazy" className="rounded-lg w-full h-[520px] object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-ink">Our Guiding Principles</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              "Children are encouraged to build a proper, inquiring and informed mind, fostering creativity across subjects.",
              "Students are assisted to develop valuable principles of obedience, excellence, hard work, self-discipline and sound morals — acquired and practiced.",
              "The high school years are a critical stage. We prepare students with the foundation needed for higher education and life.",
              "Education at Firstfruits is a joint venture of the home and school — together raising a well-developed and rounded child.",
            ].map((p, i) => (
              <div key={i} className="rounded-lg bg-white p-6 border border-border">
                <div className="h-8 w-8 rounded-md bg-primary/10 text-primary grid place-items-center font-bold">{i + 1}</div>
                <p className="mt-4 text-sm text-ink/80 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-ink">From the Head of School</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">Our students are exposed to quality teaching and learning experiences as well as good moral discipline. We operate top-notch boarding facilities — hostel rooms, feeding and warm water bath — emphasising that ours is indeed a home away from home. Education at Firstfruits Christian Academy is a total package, caring for the academic needs and Christian upbringing of every student.</p>
          <p className="mt-6 font-semibold text-ink">Dr. Kate O. Omokhoa</p>
          <p className="text-sm text-muted-foreground">Head of Schools</p>
        </div>
      </section>
    </SiteLayout>
  );
}
