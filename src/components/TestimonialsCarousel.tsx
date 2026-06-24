import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The school's serene location and top-notch security give me peace of mind. Academically, the school excels, with dedicated teachers and well-equipped science laboratories that foster hands-on learning. I wholeheartedly recommend this school to anyone seeking a well-rounded education in a nurturing environment.",
    name: "Faith Omowhe",
    role: "Parent",
  },
  {
    quote:
      "Firstfruits Christian Academy is a beacon of academic excellence and spiritual growth. As a student, I'm proud to call it my second home. Our teachers are passionate and dedicated, making complex concepts easy to grasp.",
    name: "Chukwu-Ebuka Obinna",
    role: "JSS 1 Student",
  },
  {
    quote:
      "FFCA Boarding House is truly a home away from home. The rooms are spacious and neat, the food is always delicious, and the staff are friendly, caring, and always there to support us.",
    name: "Bralatei Ayebatari Love",
    role: "JSS 3 Student",
  },
  {
    quote:
      "My first day at Firstfruits was filled with pleasant surprises. The teachers are well-coordinated and well-dressed, and my classmates gave me a warm welcome. I'm grateful to God for bringing me back to Firstfruits.",
    name: "Ezenwa Sophia",
    role: "JSS 2 Student",
  },
  {
    quote:
      "Mystery Beyond the Veil inspired me to seek God more. FFCA is not just helping me grow academically, but spiritually too — and for that, I'm truly grateful.",
    name: "Samuel Joshua",
    role: "JSS 2 Student",
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const current = testimonials[index];

  return (
    <section
      className="py-20 bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Parents and students testimonials"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-sm font-semibold text-white/60 uppercase tracking-[0.2em]">
          What People Say
        </span>
        <Quote className="mx-auto mt-6 h-8 w-8 text-primary" aria-hidden />
        <div className="relative mt-4 min-h-[180px]">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <p className="text-xl md:text-2xl font-medium leading-snug">
                "{t.quote}"
              </p>
              <footer className="mt-6 text-white/70 text-sm">
                — <span className="font-semibold text-white">{t.name}</span>, {t.role}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="h-10 w-10 rounded-full border border-white/20 grid place-items-center hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="h-10 w-10 rounded-full border border-white/20 grid place-items-center hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
