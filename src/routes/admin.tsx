import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import {
  listContactMessages,
  updateMessageStatus,
  deleteMessage,
  getMyAdminStatus,
} from "@/lib/contact.functions";
import { Mail, Trash2, Check, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Inbox — Firstfruits Christian Academy" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const fetchList = useServerFn(listContactMessages);
  const fetchAdmin = useServerFn(getMyAdminStatus);
  const setStatus = useServerFn(updateMessageStatus);
  const remove = useServerFn(deleteMessage);

  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  const load = async () => {
    try {
      const list = (await fetchList()) as Message[];
      setMessages(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      try {
        const status = (await fetchAdmin()) as { isAdmin: boolean };
        setIsAdmin(status.isAdmin);
        if (status.isAdmin) await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed");
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatus = async (id: string, status: "new" | "read" | "archived") => {
    await setStatus({ data: { id, status } });
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await remove({ data: { id } });
    await load();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth" });
  };

  if (!ready) {
    return (
      <SiteLayout>
        <section className="py-20 max-w-7xl mx-auto px-6 text-muted-foreground">Loading…</section>
      </SiteLayout>
    );
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <section className="py-20 max-w-2xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-ink">Admin access required</h1>
          <p className="mt-3 text-muted-foreground">
            Your account is signed in but does not yet have the admin role. Ask an existing admin to grant
            it via the user_roles table.
          </p>
          <button onClick={signOut} className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Sign out
          </button>
        </section>
      </SiteLayout>
    );
  }

  const filtered = messages.filter((m) => filter === "all" || m.status === filter);
  const counts = {
    all: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
  };

  return (
    <SiteLayout>
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Inbox className="h-7 w-7 text-primary" /> Contact Inbox
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Messages submitted via the contact form.</p>
          </div>
          <button onClick={signOut} className="text-sm font-medium text-ink/70 hover:text-primary">
            Sign out
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          {(["all", "new", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-border text-ink/70 hover:border-primary/40"
              }`}
            >
              {f[0].toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

        <div className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              No messages.
            </div>
          )}
          {filtered.map((m) => (
            <article key={m.id} className="rounded-lg border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{m.subject}</h3>
                    {m.status === "new" && (
                      <span className="text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {m.name} •{" "}
                    <a className="hover:text-primary" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>{" "}
                    • {new Date(m.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.subject)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary/50"
                  >
                    <Mail className="h-3.5 w-3.5" /> Reply
                  </a>
                  {m.status !== "read" && (
                    <button
                      onClick={() => handleStatus(m.id, "read")}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary/50"
                    >
                      <Check className="h-3.5 w-3.5" /> Mark read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-red-600 hover:border-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/80 whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
