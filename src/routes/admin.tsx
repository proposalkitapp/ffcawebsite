import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import {
  listContactMessages,
  updateMessageStatus,
  deleteMessage,
  getMyAdminStatus,
} from "@/lib/contact.functions";
import { Mail, Trash2, Check, Inbox, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

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

type SortKey = "created_at" | "name" | "email" | "subject" | "status";
type StatusFilter = "all" | "new" | "read" | "archived";

const PAGE_SIZES = [10, 25, 50, 100];

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
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = (await fetchList({
        data: { page, pageSize, sort, order, status: filter },
      })) as { rows: Message[]; total: number };
      setMessages(res.rows);
      setTotal(res.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [fetchList, page, pageSize, sort, order, filter]);

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
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed");
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready && isAdmin) load();
  }, [ready, isAdmin, load]);

  const handleStatus = async (id: string, status: "new" | "read" | "archived") => {
    await setStatus({ data: { id, status } });
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await remove({ data: { id } });
    // If we removed the last item on the page, step back one page
    if (messages.length === 1 && page > 1) setPage((p) => p - 1);
    else await load();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth" });
  };

  const toggleSort = (key: SortKey) => {
    if (sort === key) setOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSort(key);
      setOrder("desc");
    }
    setPage(1);
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

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  const SortHeader = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => toggleSort(k)}
      className="inline-flex items-center gap-1 font-semibold text-ink/70 hover:text-primary text-xs uppercase tracking-wide"
    >
      {label}
      {sort === k && (order === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
    </button>
  );

  return (
    <SiteLayout>
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Inbox className="h-7 w-7 text-primary" /> Contact Inbox
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {total} message{total === 1 ? "" : "s"} total
            </p>
          </div>
          <button onClick={signOut} className="text-sm font-medium text-ink/70 hover:text-primary">
            Sign out
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(["all", "new", "read", "archived"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-border text-ink/70 hover:border-primary/40"
              }`}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm">
            <label className="text-muted-foreground">Per page</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-md border border-border bg-white px-2 py-1.5 text-sm"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

        {/* Sort header bar */}
        <div className="mt-6 grid grid-cols-12 gap-4 px-5 py-3 text-xs bg-surface rounded-md border border-border">
          <div className="col-span-5"><SortHeader k="subject" label="Subject / Message" /></div>
          <div className="col-span-2"><SortHeader k="name" label="From" /></div>
          <div className="col-span-2"><SortHeader k="email" label="Email" /></div>
          <div className="col-span-1"><SortHeader k="status" label="Status" /></div>
          <div className="col-span-2 text-right"><SortHeader k="created_at" label="Received" /></div>
        </div>

        <div className="mt-3 space-y-3">
          {loading && messages.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              Loading…
            </div>
          )}
          {!loading && messages.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              No messages.
            </div>
          )}
          {messages.map((m) => (
            <article key={m.id} className="rounded-lg border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{m.subject}</h3>
                    {m.status === "new" && (
                      <span className="text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                    {m.status === "archived" && (
                      <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        Archived
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
                  {m.status !== "archived" && (
                    <button
                      onClick={() => handleStatus(m.id, "archived")}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary/50"
                    >
                      Archive
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

        {/* Pagination */}
        {total > 0 && (
          <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex}–{endIndex} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-40 hover:border-primary/50"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <span className="text-sm text-ink/70">
                Page <span className="font-semibold text-ink">{page}</span> of {totalPages}
              </span>
              <button
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-40 hover:border-primary/50"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
