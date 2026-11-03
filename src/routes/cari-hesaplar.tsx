import { createFileRoute } from "@tanstack/react-router";
import { Users, Coins, ShoppingCart, AlertTriangle, Search, Plus, Download, MoreHorizontal, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { FinanceShell, StatCard, Badge, SectionHead } from "@/components/finance-shell";

export const Route = createFileRoute("/cari-hesaplar")({
  head: () => ({
    meta: [
      { title: "Cari Hesaplar | İnşaatÇevrem ERP" },
      { name: "description", content: "Müşteri ve tedarikçi cari hesaplarının bakiye, risk ve vade takibi." },
      { property: "og:title", content: "Cari Hesaplar | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Müşteri ve tedarikçi cari hesaplarının bakiye, risk ve vade takibi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CariHesaplar,
});

const rows = [
  { ad: "ABC İnşaat A.Ş.", tip: "Müşteri", sehir: "İstanbul", bakiye: "₺425.000", vadesi: "₺125.000", limit: 82, durum: "Gecikmiş" },
  { ad: "Yıldız İnşaat Ltd.", tip: "Müşteri", sehir: "Ankara", bakiye: "₺310.000", vadesi: "₺64.000", limit: 71, durum: "Takip" },
  { ad: "Demir Yapı Market", tip: "Tedarikçi", sehir: "Kocaeli", bakiye: "-₺185.000", vadesi: "₺0", limit: 40, durum: "Normal" },
  { ad: "Kuzey Beton San.", tip: "Tedarikçi", sehir: "Bursa", bakiye: "-₺240.000", vadesi: "₺0", limit: 55, durum: "Normal" },
  { ad: "Mavi Konut Yapı", tip: "Müşteri", sehir: "İzmir", bakiye: "₺268.000", vadesi: "₺42.000", limit: 63, durum: "Takip" },
  { ad: "Özkan Taahhüt", tip: "Müşteri", sehir: "Antalya", bakiye: "₺198.000", vadesi: "₺0", limit: 38, durum: "Normal" },
  { ad: "Ege Hırdavat", tip: "Tedarikçi", sehir: "İzmir", bakiye: "-₺96.000", vadesi: "₺0", limit: 22, durum: "Normal" },
  { ad: "Atlas Gayrimenkul", tip: "Müşteri", sehir: "İstanbul", bakiye: "₺354.000", vadesi: "₺154.000", limit: 94, durum: "Gecikmiş" },
];

function CariHesaplar() {
  return (
    <FinanceShell page="Cari Hesaplar">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <StatCard icon={<Users className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="Toplam Cari" value="102" sub="28 müşteri / 74 tedarikçi" />
            <StatCard icon={<Coins className="h-6 w-6" />} iconCls="bg-success-soft text-success" title="Müşteri Bakiyesi" value="₺2.450.000" sub="Alacak" />
            <StatCard icon={<ShoppingCart className="h-6 w-6" />} iconCls="bg-info-soft text-primary" title="Tedarikçi Bakiyesi" value="₺1.180.000" sub="Borç" />
            <StatCard tone="danger" icon={<AlertTriangle className="h-6 w-6" />} iconCls="text-danger" title="Riskli Cari" value="7" sub="Limit %80 üzeri" />
          </div>

          <div className="card p-3">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold">Cari Listesi</h2>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" /> Cari ara...
                </div>
                {["Tümü", "Müşteri", "Tedarikçi"].map((f, i) => (
                  <button key={f} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border"}`}>{f}</button>
                ))}
                <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm"><Download className="h-4 w-4" /> Excel</button>
                <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Yeni Cari</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="py-2 font-medium">Cari Adı</th><th className="font-medium">Tip</th><th className="font-medium">Şehir</th>
                    <th className="text-right font-medium">Bakiye</th><th className="text-right font-medium">Vadesi Geçen</th>
                    <th className="pl-6 font-medium">Risk Limiti</th><th className="font-medium">Durum</th><th />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.ad} className="border-b border-border last:border-0">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-info-soft text-xs font-bold text-primary">{r.ad.slice(0, 2).toUpperCase()}</span>
                          <span className="font-semibold">{r.ad}</span>
                        </div>
                      </td>
                      <td><Badge tone={r.tip === "Müşteri" ? "success" : "info"}>{r.tip}</Badge></td>
                      <td>{r.sehir}</td>
                      <td className={`text-right font-semibold ${r.bakiye.startsWith("-") ? "text-primary" : ""}`}>{r.bakiye}</td>
                      <td className={`text-right font-semibold ${r.vadesi !== "₺0" ? "text-danger" : ""}`}>{r.vadesi}</td>
                      <td className="pl-6">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted">
                            <div className={`h-2 rounded-full ${r.limit >= 80 ? "bg-danger" : r.limit >= 60 ? "bg-warning" : "bg-success"}`} style={{ width: `${r.limit}%` }} />
                          </div>
                          <span className="text-xs">%{r.limit}</span>
                        </div>
                      </td>
                      <td><Badge tone={r.durum === "Gecikmiş" ? "danger" : r.durum === "Takip" ? "warning" : "success"}>{r.durum}</Badge></td>
                      <td><MoreHorizontal className="h-4 w-4" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>102 kayıttan 1–8 gösteriliyor</span>
              <div className="flex items-center gap-1">
                <button className="rounded-md border border-border p-1"><ChevronLeft className="h-4 w-4" /></button>
                {[1, 2, 3].map((n) => <button key={n} className={`h-7 w-7 rounded-md ${n === 1 ? "bg-primary text-primary-foreground" : "border border-border"}`}>{n}</button>)}
                <button className="rounded-md border border-border p-1"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="card p-3">
            <SectionHead title="Seçili Cari" link="Detay" />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-soft font-bold text-danger">AB</span>
              <div><div className="font-bold">ABC İnşaat A.Ş.</div><div className="text-xs text-muted-foreground">Müşteri • İstanbul</div></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[["Bakiye", "₺425.000"], ["Vadesi Geçen", "₺125.000"], ["Risk Limiti", "₺520.000"], ["Ort. Gecikme", "12 gün"]].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-background p-2"><div className="text-muted-foreground">{k}</div><div className="text-sm font-bold">{v}</div></div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> 0212 555 10 20</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> muhasebe@abcinsaat.com</div>
            </div>
          </div>
          <div className="card p-3">
            <SectionHead title="En Yüksek Bakiyeler" />
            {rows.filter((r) => r.tip === "Müşteri").slice(0, 5).map((r, i) => (
              <div key={r.ad} className="flex items-center gap-2 py-1.5 text-sm">
                <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
                <span className="truncate">{r.ad}</span>
                <span className="ml-auto font-bold">{r.bakiye}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </FinanceShell>
  );
}
