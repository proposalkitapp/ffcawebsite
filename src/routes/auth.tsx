import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Firstfruits Christian Academy" },
      { name: "description", content: "Administrator sign-in for Firstfruits Christian Academy." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold text-ink">Administrator {mode === "signin" ? "Sign In" : "Sign Up"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access the school's contact inbox and admin tools.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-lg border border-border bg-white p-6">
            <label className="block text-sm">
              <span className="text-ink/80 font-medium">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="text-ink/80 font-medium">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="block w-full text-center text-sm text-muted-foreground hover:text-primary"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            New accounts are created without admin access. Ask an existing admin to grant you the admin role.
            <Link to="/" className="ml-1 text-primary hover:underline">Back to site</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
