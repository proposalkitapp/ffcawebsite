import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">


      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Firstfruits Christian Academy logo" width={44} height={44} className="h-11 w-11 rounded-md object-contain bg-white" />
            <div className="leading-tight">
              <div className="font-bold text-ink">Firstfruits</div>
              <div className="text-[11px] tracking-wide uppercase text-muted-foreground">Christian Academy</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-ink/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-sm font-medium text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admissions" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Apply Now
            </Link>
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-6 py-4 flex flex-col gap-3">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm font-medium text-ink/80">
                  {n.label}
                </Link>
              ))}
              <Link to="/admissions" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-ink text-white/75 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Firstfruits Christian Academy" width={48} height={48} className="h-12 w-12 rounded-md object-contain bg-white p-1" />
              <div>
                <div className="text-white font-bold leading-tight">Firstfruits Christian Academy</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Obedience and Excellence</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">Raising a generation grounded in Godly Christian principles, academic excellence, and sound character.</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-white transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" /><span>Adjacent Government Estate, Opposite Palm View Estate, Chokwota, Igbo-Etche, Rivers State</span></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary" /><a href="mailto:firstfruit.academy@gmail.com" className="hover:text-white break-all">firstfruit.academy@gmail.com</a></li>
              <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" /><span>09056215807, 08066170299, 0808652232</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 text-xs flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} Firstfruits Christian Academy. All rights reserved.</span>
            <span>Obedience and Excellence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
