import { createFileRoute } from "@tanstack/react-router";
import { Coins, ShoppingCart, CalendarDays, CheckCircle2, Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { FinanceShell, StatCard, Badge, SectionHead } from "@/components/finance-shell";

export const Route = createFileRoute("/tahsilat-odeme")({
  head: () => ({
    meta: [
      { title: "Tahsilat / Ödeme | İnşaatÇevrem ERP" },
      { name: "description", content: "Yaklaşan tahsilat ve ödemeler, vade takvimi ve hareket geçmişi." },
      { property: "og:title", content: "Tahsilat / Ödeme | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Yaklaşan tahsilat ve ödemeler, vade takvimi ve hareket geçmişi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const tahsilat = [
  { c: "ABC İnşaat A.Ş.", v: "03 Kas 2026", t: "₺125.000", d: "Gecikmiş" },
  { c: "Yıldız İnşaat Ltd.", v: "04 Kas 2026", t: "₺86.000", d: "Bugün" },
  { c: "Mavi Konut Yapı", v: "06 Kas 2026", t: "₺142.000", d: "Planlı" },
  { c: "Atlas Gayrimenkul", v: "08 Kas 2026", t: "₺180.000", d: "Planlı" },
  { c: "Özkan Taahhüt", v: "09 Kas 2026", t: "₺87.000", d: "Planlı" },
];
const odeme = [
  { c: "Kuzey Beton San.", v: "04 Kas 2026", t: "₺120.000", d: "Bugün" },
  { c: "Demir Yapı Market", v: "05 Kas 2026", t: "₺95.000", d: "Planlı" },
  { c: "Ege Hırdavat", v: "07 Kas 2026", t: "₺48.000", d: "Planlı" },
  { c: "Anadolu Nakliyat", v: "09 Kas 2026", t: "₺147.000", d: "Onay Bekliyor" },
];
const hareket = [
  { tip: "in", c: "Özkan Taahhüt", a: "Havale - Garanti BBVA", t: "₺64.000", z: "02 Kas 14:20" },
  { tip: "out", c: "Kuzey Beton San.", a: "EFT - İş Bankası", t: "₺110.000", z: "02 Kas 11:05" },
  { tip: "in", c: "Mavi Konut Yapı", a: "Çek tahsili", t: "₺95.000", z: "01 Kas 16:42" },
  { tip: "out", c: "Demir Yapı Market", a: "Kasa - Nakit", t: "₺18.500", z: "01 Kas 10:15" },
];

const tone = (d: string) => (d === "Gecikmiş" ? "danger" : d === "Bugün" ? "warning" : d === "Onay Bekliyor" ? "violet" : "info");

function List({ title, items, color }: { title: string; items: typeof tahsilat; color: string }) {
  return (
    <div className="card min-w-0 p-3">
      <SectionHead title={title} />
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="py-2 font-medium">Cari</th><th className="font-medium">Vade</th><th className="text-right font-medium">Tutar</th><th className="pl-3 font-medium">Durum</th></tr></thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.c} className="border-b border-border last:border-0">
              <td className="py-2.5 font-semibold">{i.c}</td><td className="whitespace-nowrap">{i.v}</td>
              <td className={`text-right font-bold ${color}`}>{i.t}</td>
              <td className="pl-3"><Badge tone={tone(i.d)}>{i.d}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Page() {
  const days = Array.from({ length: 14 }, (_, i) => i + 3);
  const load: Record<number, [number, number]> = { 3: [1, 0], 4: [1, 1], 5: [0, 1], 6: [1, 0], 7: [0, 1], 8: [1, 0], 9: [1, 1], 12: [2, 0], 14: [0, 2], 16: [1, 1] };
  return (
    <FinanceShell page="Tahsilat / Ödeme">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <StatCard icon={<Coins className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="7 Günlük Tahsilat" value="₺620.000" sub="24 vade" />
          <StatCard icon={<ShoppingCart className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="7 Günlük Ödeme" value="₺410.000" sub="18 vade" />
          <StatCard icon={<CalendarDays className="h-6 w-6" />} iconCls="bg-violet-soft text-violet" title="Net Nakit Etkisi" value="+₺210.000" sub="Önümüzdeki 7 gün" />
          <StatCard icon={<CheckCircle2 className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Bu Ay Tahsil Edilen" value="₺1.340.000" sub="Hedefin %78'i" />
        </div>

        <div className="card p-3">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-lg font-bold">Vade Takvimi (Kasım 2026)</h2>
            <div className="ml-auto flex gap-2">
              <button className="flex items-center gap-1 rounded-lg bg-success px-3 py-1.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Tahsilat</button>
              <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Ödeme</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 lg:grid-cols-14">
            {days.map((d) => (
              <div key={d} className={`rounded-lg border p-2 text-center ${d === 3 ? "border-primary bg-info-soft" : "border-border"}`}>
                <div className="text-xs text-muted-foreground">Kas</div>
                <div className="text-lg font-bold">{d}</div>
                <div className="mt-1 flex justify-center gap-1">
                  {Array.from({ length: load[d]?.[0] ?? 0 }).map((_, i) => <i key={"t" + i} className="h-1.5 w-1.5 rounded-full bg-success" />)}
                  {Array.from({ length: load[d]?.[1] ?? 0 }).map((_, i) => <i key={"o" + i} className="h-1.5 w-1.5 rounded-full bg-primary" />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <List title="Yaklaşan Tahsilatlar" items={tahsilat} color="text-success" />
          <List title="Yaklaşan Ödemeler" items={odeme} color="text-primary" />
        </div>

        <div className="card p-3">
          <SectionHead title="Son Hareketler" />
          <div className="divide-y divide-border">
            {hareket.map((h) => (
              <div key={h.c + h.z} className="flex items-center gap-3 py-2.5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${h.tip === "in" ? "bg-success-soft text-success" : "bg-info-soft text-primary"}`}>
                  {h.tip === "in" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </span>
                <div className="min-w-0"><div className="font-semibold">{h.c}</div><div className="text-xs text-muted-foreground">{h.a}</div></div>
                <div className="ml-auto text-right">
                  <div className={`font-bold ${h.tip === "in" ? "text-success" : "text-primary"}`}>{h.tip === "in" ? "+" : "-"}{h.t}</div>
                  <div className="text-xs text-muted-foreground">{h.z}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FinanceShell>
  );
}
