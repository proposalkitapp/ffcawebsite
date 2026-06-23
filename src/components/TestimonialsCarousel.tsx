import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I'm thrilled with the education and care my child receives at Firstfruits Christian Academy. I wholeheartedly recommend this school to anyone seeking a well-rounded education in a nurturing environment.",
    name: "Faith Omowhe",
    role: "Parent",
  },
  {
    quote:
      "The teachers at Firstfruits are dedicated and the discipline is excellent. My son has grown both academically and spiritually since joining.",
    name: "Mr. & Mrs. Eze",
    role: "Parents",
  },
  {
    quote:
      "A safe boarding environment, sound Christian values, and strong WAEC results — Firstfruits is everything we hoped a secondary school would be.",
    name: "Dr. A. Ibekwe",
    role: "Parent",
  },
  {
    quote:
      "From the science labs to the daily devotions, every part of school life is designed to build character and competence. I'm proud to be a Firstfruits student.",
    name: "Chiamaka O.",
    role: "SSS 3 Student",
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
