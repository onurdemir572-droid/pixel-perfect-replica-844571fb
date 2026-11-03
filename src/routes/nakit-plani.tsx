import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Wallet, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { FinanceShell, StatCard, Badge, SectionHead } from "@/components/finance-shell";

export const Route = createFileRoute("/nakit-plani")({
  head: () => ({
    meta: [
      { title: "Nakit Planı | İnşaatÇevrem ERP" },
      { name: "description", content: "Haftalık nakit giriş-çıkış planı, banka bakiyeleri ve tahmini bakiye." },
      { property: "og:title", content: "Nakit Planı | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Haftalık nakit giriş-çıkış planı, banka bakiyeleri ve tahmini bakiye." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const weeks = [
  { w: "1. Hafta", r: "1 – 7 Kas", giris: 620000, cikis: 410000, bakiye: 950000 },
  { w: "2. Hafta", r: "8 – 14 Kas", giris: 350000, cikis: 540000, bakiye: 760000 },
  { w: "3. Hafta", r: "15 – 21 Kas", giris: 470000, cikis: 320000, bakiye: 910000 },
  { w: "4. Hafta", r: "22 – 30 Kas", giris: 290000, cikis: 490000, bakiye: 720000 },
];
const banks = [
  { n: "Garanti BBVA", h: "TR12 •••• 4521", b: "₺318.000" },
  { n: "İş Bankası", h: "TR45 •••• 8890", b: "₺276.000" },
  { n: "Merkez Kasa", h: "Nakit", b: "₺146.000" },
];
const fmt = (v: number) => "₺" + v.toLocaleString("tr-TR");

function Page() {
  const max = 650000;
  return (
    <FinanceShell page="Nakit Planı">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <StatCard icon={<Landmark className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Kasa + Banka" value="₺740.000" sub="3 hesap" />
            <StatCard icon={<TrendingUp className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Planlanan Giriş" value="₺1.730.000" sub="30 gün" />
            <StatCard icon={<TrendingDown className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="Planlanan Çıkış" value="₺1.760.000" sub="30 gün" />
            <StatCard icon={<Wallet className="h-6 w-6" />} iconCls="bg-violet-soft text-violet" title="Dönem Sonu Bakiye" value="₺720.000" sub="Tahmini" />
          </div>

          <div className="card p-3">
            <SectionHead title="Haftalık Nakit Planı" link="Planı Düzenle" />
            <div className="space-y-4">
              {weeks.map((w) => (
                <div key={w.w} className="grid grid-cols-[110px_minmax(0,1fr)_110px] items-center gap-3">
                  <div><div className="font-semibold">{w.w}</div><div className="text-xs text-muted-foreground">{w.r}</div></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-success" style={{ width: `${(w.giris / max) * 100}%` }} />
                      <span className="whitespace-nowrap text-xs font-semibold">{fmt(w.giris)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-primary" style={{ width: `${(w.cikis / max) * 100}%` }} />
                      <span className="whitespace-nowrap text-xs font-semibold">{fmt(w.cikis)}</span>
                    </div>
                  </div>
                  <div className="text-right"><div className="text-xs text-muted-foreground">Bakiye</div><div className="font-bold text-violet">{fmt(w.bakiye)}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card overflow-x-auto p-3">
            <SectionHead title="Plan Detayı" />
            <table className="w-full min-w-[600px] text-sm">
              <thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="py-2 font-medium">Kalem</th>{weeks.map((w) => <th key={w.w} className="text-right font-medium">{w.w}</th>)}</tr></thead>
              <tbody>
                {[
                  ["Müşteri tahsilatları", [560000, 300000, 420000, 250000]],
                  ["Diğer girişler", [60000, 50000, 50000, 40000]],
                  ["Tedarikçi ödemeleri", [-280000, -390000, -210000, -340000]],
                  ["Personel & SGK", [-90000, -100000, -70000, -110000]],
                  ["Vergi & diğer", [-40000, -50000, -40000, -40000]],
                ].map(([k, vals]) => (
                  <tr key={k as string} className="border-b border-border">
                    <td className="py-2.5 font-medium">{k as string}</td>
                    {(vals as number[]).map((v, i) => <td key={i} className={`text-right font-semibold ${v < 0 ? "text-primary" : "text-success"}`}>{fmt(v)}</td>)}
                  </tr>
                ))}
                <tr><td className="py-2.5 font-bold">Tahmini Bakiye</td>{weeks.map((w) => <td key={w.w} className="text-right font-bold text-violet">{fmt(w.bakiye)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="card p-3">
            <SectionHead title="Banka & Kasa" />
            {banks.map((b) => (
              <div key={b.n} className="flex items-center gap-3 py-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-soft text-success"><Landmark className="h-5 w-5" /></span>
                <div><div className="text-sm font-semibold">{b.n}</div><div className="text-xs text-muted-foreground">{b.h}</div></div>
                <span className="ml-auto font-bold">{b.b}</span>
              </div>
            ))}
          </div>
          <div className="card border-l-4 border-l-danger bg-danger-soft p-3">
            <div className="flex items-center gap-2 font-bold text-danger"><AlertTriangle className="h-5 w-5" /> Nakit Sıkışıklığı Uyarısı</div>
            <p className="mt-2 text-sm">2. haftada çıkışlar girişleri <b>₺190.000</b> aşıyor. Tahsilatları öne çekmeyi veya ödemeleri ertelemeyi değerlendirin.</p>
            <div className="mt-2"><Badge tone="danger">Yüksek Öncelik</Badge></div>
          </div>
        </aside>
      </div>
    </FinanceShell>
  );
}
