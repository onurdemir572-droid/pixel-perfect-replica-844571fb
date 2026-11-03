import { Link } from "@tanstack/react-router";
import {
  Search, Bell, HelpCircle, Grid3x3, ChevronDown, ChevronUp, ChevronRight, Calendar, Filter,
  Home, Users, ArrowLeftRight, BarChart3, TrendingUp, FileText, Database, ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { label: "Genel Bakış", icon: Home, to: "/" },
  { label: "Cari Hesaplar", icon: Users, to: "/cari-hesaplar" },
  { label: "Tahsilat / Ödeme", icon: ArrowLeftRight, to: "/tahsilat-odeme" },
  { label: "Nakit Planı", icon: BarChart3, to: "/nakit-plani" },
  { label: "Akıllı Analizler", icon: TrendingUp, to: "/akilli-analizler" },
] as const;

export function FinanceShell({ page, children }: { page?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <header className="flex h-14 items-center gap-4 bg-topbar px-6">
        <div className="mx-auto flex w-full min-w-0 max-w-xl items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-card">
          <Search className="h-4 w-4 shrink-0" />
          <span className="truncate">Ürün, cari, fatura, sipariş veya rapor ara...</span>
          <span className="ml-auto hidden shrink-0 sm:inline">(Ctrl + K)</span>
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <div className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-danger" />
          </div>
          <HelpCircle className="h-6 w-6" />
          <Grid3x3 className="h-6 w-6" />
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">MK</div>
            <div className="hidden leading-tight md:block">
              <div className="text-sm font-semibold">Mehmet Kaya</div>
              <div className="text-xs text-muted-foreground">Merkez Şube</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="px-6 pb-8">
        <div className="flex items-center gap-2 py-2.5 text-sm">
          <span className="text-muted-foreground">Raporlar</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {page ? (
            <>
              <Link to="/" className="text-muted-foreground">Cari & Finans Merkezi</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{page}</span>
            </>
          ) : (
            <span className="font-semibold">Cari & Finans Merkezi</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-card">
            <Database className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold leading-tight">Cari & Finans Merkezi</h1>
            <p className="text-sm">Alacak, borç, tahsilat, ödeme ve nakit yönetimi</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <div className="card flex items-center gap-4 px-4 py-2">
              <Calendar className="h-5 w-5" />
              <div className="leading-tight">
                <div className="text-xs font-medium">Dönem</div>
                <div className="text-sm font-semibold">Son 30 Gün</div>
                <div className="text-[11px] text-muted-foreground">01 Eki 2026 – 30 Eki 2026</div>
              </div>
              <ChevronUp className="ml-4 h-4 w-4" />
            </div>
            <div className="card flex w-52 items-center px-4 py-2">
              <div className="leading-tight">
                <div className="text-xs font-medium">Şube</div>
                <div className="text-base">Tüm Şubeler</div>
              </div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </div>
            <button className="card flex items-center gap-2 px-5 py-3 text-base font-medium">
              <Filter className="h-5 w-5" /> Diğer Filtreler
            </button>
          </div>
        </div>

        <nav className="mt-4 flex items-center gap-2 overflow-x-auto border-b border-border pb-2">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeOptions={{ exact: true }}
              className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-5 py-2.5 text-base font-medium xl:px-7"
              activeProps={{ className: "bg-primary font-semibold text-primary-foreground shadow-card" }}
            >
              <t.icon className="h-5 w-5" /> {t.label}
            </Link>
          ))}
          <Link
            to="/raporlar"
            className="ml-auto flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-5 py-2.5 text-base font-medium"
            activeProps={{ className: "bg-primary font-semibold text-primary-foreground shadow-card" }}
          >
            <FileText className="h-5 w-5" /> Raporlar
          </Link>
        </nav>

        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}

export function SectionHead({ title, extra, link = "Tümü" }: { title: string; extra?: ReactNode; link?: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <h2 className="truncate text-lg font-bold">{title}</h2>
      {extra}
      <a className="ml-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">{link} <ArrowRight className="h-3.5 w-3.5" /></a>
    </div>
  );
}

export function StatCard({ icon, iconCls, title, value, sub, tone }: {
  icon: ReactNode; iconCls: string; title: string; value: string; sub: string; tone?: "danger";
}) {
  const d = tone === "danger";
  return (
    <div className={`card flex min-w-0 gap-3 p-3 ${d ? "bg-danger-soft" : ""}`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconCls}`}>{icon}</div>
      <div className="min-w-0">
        <div className={`truncate text-xs font-medium ${d ? "text-danger" : ""}`}>{title}</div>
        <div className={`truncate text-lg font-bold ${d ? "text-danger" : ""}`}>{value}</div>
        <div className="truncate text-xs">{sub}</div>
      </div>
    </div>
  );
}

export function Badge({ tone, children }: { tone: "success" | "danger" | "warning" | "info" | "violet"; children: ReactNode }) {
  const cls = {
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
    warning: "bg-warning-soft text-orange",
    info: "bg-info-soft text-primary",
    violet: "bg-violet-soft text-violet",
  }[tone];
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}
