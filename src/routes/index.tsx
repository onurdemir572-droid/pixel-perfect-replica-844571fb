import { createFileRoute } from "@tanstack/react-router";
import {
  Search, Bell, HelpCircle, Grid3x3, ChevronDown, ChevronUp, ChevronRight, Calendar, Filter,
  Home, Users, ArrowLeftRight, BarChart3, TrendingUp, FileText, Coins, ShoppingCart,
  AlertTriangle, Landmark, Info, ArrowRight, Clock, ShieldCheck, Layers, CalendarDays,
  UserCheck, Star, FileSpreadsheet, Download, Database, Banknote,
} from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cari & Finans Merkezi | İnşaatÇevrem ERP" },
      { name: "description", content: "Alacak, borç, tahsilat, ödeme ve nakit yönetimi paneli." },
      { property: "og:title", content: "Cari & Finans Merkezi | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Alacak, borç, tahsilat, ödeme ve nakit yönetimi paneli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tabs = [
  { label: "Genel Bakış", icon: Home, active: true },
  { label: "Cari Hesaplar", icon: Users },
  { label: "Tahsilat / Ödeme", icon: ArrowLeftRight },
  { label: "Nakit Planı", icon: BarChart3 },
  { label: "Akıllı Analizler", icon: TrendingUp },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Top bar */}
      <header className="flex h-14 items-center bg-topbar px-6">
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-card">
          <Search className="h-4 w-4" />
          <span className="truncate">Ürün, cari, fatura, sipariş veya rapor ara...</span>
          <span className="ml-auto">(Ctrl + K)</span>
        </div>
        <div className="ml-6 flex items-center gap-6">
          <div className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-danger" />
          </div>
          <HelpCircle className="h-6 w-6" />
          <Grid3x3 className="h-6 w-6" />
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">MK</div>
            <div className="leading-tight">
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
          <span className="font-semibold">Cari & Finans Merkezi</span>
        </div>

        {/* Title row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-card">
            <Database className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold leading-tight">Cari & Finans Merkezi</h1>
            <p className="text-sm">Alacak, borç, tahsilat, ödeme ve nakit yönetimi</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <div className="card flex items-center gap-4 px-4 py-2">
              <Calendar className="h-5 w-5" />
              <div className="leading-tight">
                <div className="text-xs font-medium">Dönem</div>
                <div className="text-sm font-semibold">Son 30 Gün</div>
                <div className="text-[11px] text-muted-foreground">01 Eki 2026 – 30 Eki 2026</div>
              </div>
              <ChevronUp className="ml-6 h-4 w-4" />
            </div>
            <div className="card flex w-56 items-center px-4 py-2">
              <div className="leading-tight">
                <div className="text-xs font-medium">Şube</div>
                <div className="text-base">Tüm Şubeler</div>
              </div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </div>
            <button className="card flex items-center gap-2 px-6 py-3 text-base font-medium">
              <Filter className="h-5 w-5" /> Diğer Filtreler
            </button>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mt-4 flex items-center gap-10 border-b border-border pb-2">
          {tabs.map((t) =>
            t.active ? (
              <button key={t.label} className="flex items-center gap-3 rounded-xl bg-primary px-9 py-2.5 text-base font-semibold text-primary-foreground shadow-card">
                <t.icon className="h-5 w-5" /> {t.label}
              </button>
            ) : (
              <button key={t.label} className="flex items-center gap-2.5 text-base font-medium">
                <t.icon className="h-5 w-5" /> {t.label}
              </button>
            ),
          )}
          <button className="ml-auto mr-28 flex items-center gap-2.5 text-base font-medium">
            <FileText className="h-5 w-5" /> Raporlar
          </button>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_330px]">
          <div className="space-y-4 min-w-0">
            <KpiRow />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr]">
              <CashFlow />
              <Aging />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
              <Attention />
              <Analyses />
            </div>
          </div>
          <RightColumn />
        </div>
      </main>
    </div>
  );
}

function Kpi({ icon, iconCls, title, value, sub, trend, danger }: {
  icon: ReactNode; iconCls: string; title: string; value: string; sub: string; trend?: ReactNode; danger?: boolean;
}) {
  return (
    <div className={`card flex gap-3 p-3 ${danger ? "bg-danger-soft" : ""}`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconCls}`}>{icon}</div>
      <div className="min-w-0">
        <div className={`text-xs font-medium ${danger ? "text-danger" : ""}`}>{title}</div>
        <div className={`text-lg font-bold whitespace-nowrap ${danger ? "text-danger" : ""}`}>{value}</div>
        <div className="text-xs">{sub}</div>
        {trend}
      </div>
    </div>
  );
}

function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
      <Kpi icon={<Coins className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Toplam Alacak" value="₺2.450.000" sub="28 müşteri"
        trend={<div className="mt-0.5 text-[9px] text-muted-foreground"><span className="font-semibold text-success">↗ %12</span> (Önceki 30 gün)</div>} />
      <Kpi icon={<ShoppingCart className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="Toplam Borç" value="₺1.180.000" sub="74 tedarikçi"
        trend={<div className="mt-0.5 text-[9px] text-muted-foreground"><span className="font-semibold text-danger">↗ %8</span> (Önceki 30 gün)</div>} />
      <Kpi danger icon={<AlertTriangle className="h-6 w-6" />} iconCls="text-danger" title="Gecikmiş Alacak" value="₺385.000" sub="7 müşteri / 12 fatura" />
      <Kpi icon={<CalendarDays className="h-6 w-6" />} iconCls="bg-violet-soft text-violet" title="7 Günlük Tahsilat" value="₺620.000" sub="24 vade" />
      <Kpi icon={<CalendarDays className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="7 Günlük Ödeme" value="₺410.000" sub="18 vade" />
      <Kpi icon={<Landmark className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Kasa + Banka" value="₺740.000" sub="3 hesap" />
    </div>
  );
}

function CashFlow() {
  // chart geometry
  const W = 620, H = 210, left = 60, bottom = 180, top = 20;
  const max = 1200000;
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const groups = [
    { x: 135, label: ["Başlangıç", ""], bal: 740000 },
    { x: 240, label: ["1. haftta", "(1 – 7 Kas)"], bal: 950000, t: 620000, o: 410000 },
    { x: 350, label: ["2. Haftta", "(8 – 14 Kas)"], bal: 760000, t: 350000, o: 540000 },
    { x: 455, label: ["3. Haftta", "(15 – 21 Kas)"], bal: 910000, t: 470000, o: 320000 },
    { x: 565, label: ["4. Haftta", "(22 – 30 Kas)"], bal: 720000, t: 290000, o: 490000 },
  ];
  const fmt = (v: number) => "₺" + v.toLocaleString("tr-TR");
  const pts = groups.map((g) => `${g.x},${y(g.bal) - 5}`).join(" ");
  return (
    <div className="card p-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">Nakit Akışı ve Bakiye Görünümü</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-1 flex justify-end gap-4 text-[10px] font-medium">
        <span className="flex items-center gap-1"><i className="h-2.5 w-4 rounded-sm bg-success" />Beklenen Tahsilat</span>
        <span className="flex items-center gap-1"><i className="h-2.5 w-4 rounded-sm bg-primary" />Planlanan Ödeme</span>
        <span className="flex items-center gap-1 text-violet">—●— <span className="text-foreground">Tahmini Bakiye</span></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "Inter" }}>
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--violet)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[1200000, 1000000, 800000, 600000, 400000, 200000, 0].map((v) => (
          <text key={v} x={left - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill="var(--foreground)">
            {v === 0 ? "₺0" : fmt(v)}
          </text>
        ))}
        <polygon points={`${groups[0]!.x},${bottom} ${pts} ${groups[4]!.x + 40},${y(720000) + 10} ${groups[4]!.x + 40},${bottom}`} fill="url(#area)" />
        {groups.map((g) =>
          g.t ? (
            <g key={g.x}>
              <rect x={g.x - 38} y={y(g.t * 0.55)} width={36} height={bottom - y(g.t * 0.55)} rx="3" fill="var(--success)" opacity="0.75" />
              <rect x={g.x} y={y(g.o * 0.55)} width={36} height={bottom - y(g.o * 0.55)} rx="3" fill="var(--primary)" opacity="0.8" />
              <text x={g.x - 20} y={y(g.t * 0.55) - 5} fontSize="8.5" fontWeight="600" textAnchor="middle" fill="var(--foreground)">{fmt(g.t)}</text>
              <text x={g.x + 18} y={y(g.o * 0.55) - 5} fontSize="8.5" fontWeight="600" textAnchor="middle" fill="var(--foreground)">{fmt(g.o)}</text>
            </g>
          ) : null,
        )}
        <polyline points={pts} fill="none" stroke="var(--violet)" strokeWidth="2" />
        {groups.map((g) => (
          <g key={"p" + g.x}>
            <circle cx={g.x} cy={y(g.bal) - 5} r="4.5" fill="var(--card)" stroke="var(--violet)" strokeWidth="2" />
            <rect x={g.x - 36} y={y(g.bal) - 37} width="72" height="20" rx="6" fill="var(--violet-soft)" />
            <text x={g.x} y={y(g.bal) - 23} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--violet)">{fmt(g.bal)}</text>
            <text x={g.x} y={bottom + 14} fontSize="10" textAnchor="middle" fill="var(--foreground)">{g.label[0]}</text>
            <text x={g.x} y={bottom + 27} fontSize="10" textAnchor="middle" fill="var(--foreground)">{g.label[1]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Aging() {
  const rows = [
    { c: "var(--success)", l: "Vadesi gelmemiş", v: "₺1.260.000", p: 51 },
    { c: "var(--warning)", l: "0 – 30 gün", v: "₺805.000", p: 33 },
    { c: "var(--orange)", l: "31 – 60 gün", v: "₺210.000", p: 9 },
    { c: "var(--danger)", l: "60+ gün", v: "₺175.000", p: 7 },
  ];
  const r = 60, C = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="card p-3">
      <h2 className="text-lg font-bold">Alacak Yaşlandırma (₺2.450.000)</h2>
      <div className="mt-3 flex items-center gap-4">
        <svg viewBox="0 0 160 160" className="h-40 w-40 shrink-0 -rotate-90">
          {rows.map((row) => {
            const len = (row.p / 100) * C;
            const el = <circle key={row.l} cx="80" cy="80" r={r} fill="none" stroke={row.c} strokeWidth="22" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />;
            off += len;
            return el;
          })}
          <g className="rotate-90 origin-center">
            <text x="80" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--foreground)">₺2.450.000</text>
            <text x="80" y="96" textAnchor="middle" fontSize="10" fill="var(--foreground)">Toplam Alacak</text>
          </g>
        </svg>
        <div className="flex-1 space-y-3 text-xs">
          {rows.map((row) => (
            <div key={row.l} className="grid grid-cols-[1fr_auto_36px] items-center gap-2">
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm" style={{ background: row.c }} />{row.l}</span>
              <span className="font-semibold">{row.v}</span>
              <span className="text-right font-semibold">%{row.p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, extra }: { title: string; extra?: ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      {extra}
      <a className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary">Tümü <ArrowRight className="h-3.5 w-3.5" /></a>
    </div>
  );
}

function Attention() {
  const items = [
    { icon: <AlertTriangle className="h-6 w-6 text-danger" />, t: "ABC İnşaat", d: "₺125.000 vadesi geçmiş alacak (3 fatura)", b: "Gecikmiş - 12 gün", bar: "border-l-danger", bg: "bg-danger-soft", badge: "bg-danger-soft text-danger" },
    { icon: <Calendar className="h-6 w-6 text-orange" />, t: "Tedarikçi ödemeleri", d: "Gelecek hafta ₺410.000 ödeme planı (4 tedarikçi)", b: "İzlenmeli", bar: "border-l-warning", bg: "bg-card", badge: "bg-warning-soft text-orange" },
    { icon: <UserCheck className="h-6 w-6 text-orange" />, t: "Yıldız İnşaat", d: "Ödeme geçmişinde ortalama 19 gün gecikme", b: "Takip", bar: "border-l-warning", bg: "bg-card", badge: "bg-warning-soft text-orange" },
  ];
  return (
    <div className="card p-3">
      <SectionHead title="Dikkat Gerektirenler" extra={<span className="rounded-full bg-danger px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">3 konu</span>} />
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.t} className={`flex items-center gap-3 rounded-lg border border-border border-l-4 ${i.bar} ${i.bg} px-3 py-2.5`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-soft">{i.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="font-bold">{i.t}</div>
              <div className="truncate text-sm">{i.d}</div>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${i.badge}`}>{i.b}</span>
            <ChevronRight className="h-5 w-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Analyses() {
  const items = [
    { icon: <Clock className="h-9 w-9 text-danger" />, bg: "bg-danger-soft", t: "Sürekli Geç Ödeyenler", s: "4 müşteri" },
    { icon: <ShieldCheck className="h-9 w-9 text-primary" />, bg: "bg-info-soft", t: "Risk Limitine Yaklaşanlar", s: "2 müşteri" },
    { icon: <Layers className="h-9 w-9 text-violet" />, bg: "bg-violet-soft", t: "Alacak Yaşlandırması", s: "Toplam %51\n5 müşteride" },
    { icon: <TrendingUp className="h-9 w-9 text-success" />, bg: "bg-success-soft", t: "Nakit Sıkışıklığı Riski", s: "2. haftada\n₺190.000 açık" },
  ];
  return (
    <div className="card p-3">
      <SectionHead title="Öne Çıkan Analizler" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((i) => (
          <div key={i.t} className="flex flex-col items-center rounded-lg border border-border px-2 py-3 text-center">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${i.bg}`}>{i.icon}</div>
            <div className="mt-2 text-sm font-semibold leading-snug">{i.t}</div>
            <div className="mt-2 whitespace-pre-line text-sm">{i.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Gauge() {
  // semicircle arc gauge, 78/100
  const r = 50, cx = 60, cy = 60;
  const arc = (a0: number, a1: number) => {
    const p = (a: number) => [cx + r * Math.cos(Math.PI - a * Math.PI), cy - r * Math.sin(Math.PI - a * Math.PI)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}`;
  };
  return (
    <svg viewBox="0 0 120 80" className="h-24 w-36 shrink-0">
      <path d={arc(0, 0.33)} stroke="var(--warning)" strokeWidth="12" fill="none" />
      <path d={arc(0.33, 0.66)} stroke="oklch(0.85 0.17 110)" strokeWidth="12" fill="none" />
      <path d={arc(0.66, 1)} stroke="var(--success)" strokeWidth="12" fill="none" />
      <line x1="94" y1="30" x2="102" y2="22" stroke="var(--foreground)" strokeWidth="2" />
      <text x="60" y="58" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--foreground)">78<tspan fontSize="8" fontWeight="400"> /100</tspan></text>
      <rect x="47" y="63" width="26" height="13" rx="6" fill="var(--success-soft)" />
      <text x="60" y="73" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--success)">İyi</text>
    </svg>
  );
}

function RightColumn() {
  const quick = [
    { icon: <Coins className="h-4 w-4 text-success" />, l: "Tahsilat Girişi" },
    { icon: <CalendarDays className="h-4 w-4 text-primary" />, l: "Ödeme Planı Oluştur" },
    { icon: <FileText className="h-4 w-4 text-violet" />, l: "Cari Ekstre Görüntüle" },
    { icon: <BarChart3 className="h-4 w-4 text-primary" />, l: "Nakit Planını Güncelle" },
    { icon: <ShieldCheck className="h-4 w-4 text-orange" />, l: "Risk Limiti Tanımla" },
  ];
  const upcoming = [
    { icon: <Banknote className="h-5 w-5 text-success" />, bg: "bg-success-soft", t: "Tahsilatlar", s: "7 gün içinde 5 tahsilat", v: "₺620.000" },
    { icon: <ShoppingCart className="h-5 w-5 text-primary" />, bg: "bg-info-soft", t: "Ödemeler", s: "7 gün içinde 4 ödeme", v: "₺410.000" },
    { icon: <CalendarDays className="h-5 w-5 text-orange" />, bg: "bg-warning-soft", t: "Vadesi Gelen Faturalar", s: "7 gün içinde 6 fatura", v: "₺285.000" },
  ];
  const reports = ["Cari Ekstre", "Alacak Yaşlandırma", "Borç Yaşlandırma", "Nakit Akışı"];
  return (
    <aside className="space-y-3">
      <div className="card p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">Finansal Durum</h3>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Gauge />
          <div className="text-xs">
            <div className="font-semibold">Genel finansal sağlık</div>
            <p className="mt-1 text-muted-foreground">Likidite iyi seviyede, ancak alacak tahsilat dengesi izlenmeli.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-1.5 text-base font-bold">Hızlı İşlemler</h3>
        <div className="card divide-y divide-border">
          {quick.map((q) => (
            <button key={q.l} className="flex w-full items-center gap-3 px-3 py-1.5 text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-info-soft">{q.icon}</span>
              {q.l}
              <ChevronRight className="ml-auto h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="card p-3">
        <div className="mb-2 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h3 className="text-base font-bold">Yaklaşan İşlemler</h3>
          <a className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary">Tümü <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
        <div className="space-y-2.5">
          {upcoming.map((u) => (
            <div key={u.t} className="flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${u.bg}`}>{u.icon}</span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{u.t}</div>
                <div className="text-[11px]">{u.s}</div>
              </div>
              <span className="ml-auto text-sm font-bold">{u.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-3">
        <div className="mb-2 flex items-center gap-2">
          <Star className="h-5 w-5 fill-warning text-warning" />
          <h3 className="text-base font-bold">Sık Kullanılan Raporlar</h3>
          <a className="ml-auto text-xs font-semibold text-primary">Düzenle</a>
        </div>
        <div className="space-y-1.5">
          {reports.map((r) => (
            <div key={r} className="flex items-center gap-3 px-2 py-0.5 text-sm">
              <FileSpreadsheet className="h-5 w-5 text-success" />
              {r}
              <Download className="ml-auto h-4 w-4" />
            </div>
          ))}
        </div>
        <a className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
          Tüm raporları görüntüle <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
