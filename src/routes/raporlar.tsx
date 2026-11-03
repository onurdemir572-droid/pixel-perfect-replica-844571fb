import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet, FileText, Download, Star } from "lucide-react";
import { FinanceShell, Badge } from "@/components/finance-shell";

export const Route = createFileRoute("/raporlar")({
  head: () => ({
    meta: [
      { title: "Finans Raporları | İnşaatÇevrem ERP" },
      { name: "description", content: "Cari ekstre, yaşlandırma, nakit akışı ve diğer finans raporları." },
      { property: "og:title", content: "Finans Raporları | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Cari ekstre, yaşlandırma, nakit akışı ve diğer finans raporları." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const groups = [
  { g: "Cari Raporları", items: [["Cari Ekstre", true], ["Cari Bakiye Listesi", false], ["Risk Limiti Raporu", false]] },
  { g: "Yaşlandırma", items: [["Alacak Yaşlandırma", true], ["Borç Yaşlandırma", true], ["Vade Analizi", false]] },
  { g: "Nakit", items: [["Nakit Akışı", true], ["Banka Hareketleri", false], ["Kasa Raporu", false]] },
  { g: "Tahsilat / Ödeme", items: [["Tahsilat Listesi", false], ["Ödeme Listesi", false], ["Çek / Senet Portföyü", false]] },
] as const;

function Page() {
  return (
    <FinanceShell page="Raporlar">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((g) => (
          <div key={g.g} className="card p-3">
            <h2 className="mb-2 text-lg font-bold">{g.g}</h2>
            <div className="divide-y divide-border">
              {g.items.map(([n, fav]) => (
                <div key={n} className="flex items-center gap-3 py-2.5 text-sm">
                  {fav ? <FileSpreadsheet className="h-5 w-5 text-success" /> : <FileText className="h-5 w-5 text-primary" />}
                  <span className="font-medium">{n}</span>
                  {fav && <Star className="h-3.5 w-3.5 fill-warning text-warning" />}
                  <Download className="ml-auto h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-4 p-3">
        <h2 className="mb-2 text-lg font-bold">Son Oluşturulan Raporlar</h2>
        {[["Alacak Yaşlandırma – Ekim 2026", "02 Kas 2026", "Excel"], ["Cari Ekstre – ABC İnşaat", "01 Kas 2026", "PDF"], ["Nakit Akışı – Kasım Planı", "31 Eki 2026", "Excel"]].map(([n, d, f]) => (
          <div key={n} className="flex items-center gap-3 border-b border-border py-2.5 text-sm last:border-0">
            <span className="font-semibold">{n}</span>
            <span className="ml-auto text-muted-foreground">{d}</span>
            <Badge tone={f === "PDF" ? "danger" : "success"}>{f}</Badge>
            <Download className="h-4 w-4" />
          </div>
        ))}
      </div>
    </FinanceShell>
  );
}
