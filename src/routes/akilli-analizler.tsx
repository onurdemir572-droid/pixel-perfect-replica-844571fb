import { createFileRoute } from "@tanstack/react-router";
import { Clock, ShieldCheck, Layers, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { FinanceShell, Badge, SectionHead } from "@/components/finance-shell";

export const Route = createFileRoute("/akilli-analizler")({
  head: () => ({
    meta: [
      { title: "Akıllı Analizler | İnşaatÇevrem ERP" },
      { name: "description", content: "Ödeme davranışı, risk limiti ve nakit riski için otomatik analizler." },
      { property: "og:title", content: "Akıllı Analizler | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Ödeme davranışı, risk limiti ve nakit riski için otomatik analizler." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const cards = [
  { icon: <Clock className="h-8 w-8 text-danger" />, bg: "bg-danger-soft", t: "Sürekli Geç Ödeyenler", v: "4 müşteri", d: "Son 6 ayda ortalama 15+ gün gecikme" },
  { icon: <ShieldCheck className="h-8 w-8 text-primary" />, bg: "bg-info-soft", t: "Risk Limitine Yaklaşanlar", v: "2 müşteri", d: "Limitin %80'i aşıldı" },
  { icon: <Layers className="h-8 w-8 text-violet" />, bg: "bg-violet-soft", t: "Alacak Yaşlandırması", v: "Toplam %51", d: "5 müşteride yoğunlaşma" },
  { icon: <TrendingUp className="h-8 w-8 text-success" />, bg: "bg-success-soft", t: "Nakit Sıkışıklığı Riski", v: "2. haftada", d: "₺190.000 açık bekleniyor" },
];
const late = [
  { c: "ABC İnşaat A.Ş.", g: 19, s: 6 },
  { c: "Atlas Gayrimenkul", g: 17, s: 4 },
  { c: "Yıldız İnşaat Ltd.", g: 15, s: 5 },
  { c: "Mavi Konut Yapı", g: 12, s: 3 },
];
const oneri = [
  "ABC İnşaat için yeni sevkiyatları ön ödemeye bağlayın.",
  "2. hafta tedarikçi ödemelerinden ₺120.000'ını 3. haftaya kaydırın.",
  "Atlas Gayrimenkul risk limitini ₺400.000 ile sınırlayın.",
  "60+ gün alacaklar için hukuki takip sürecini başlatın.",
];

function Page() {
  return (
    <FinanceShell page="Akıllı Analizler">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.t} className="card flex flex-col items-center p-4 text-center">
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${c.bg}`}>{c.icon}</div>
              <div className="mt-3 font-semibold">{c.t}</div>
              <div className="mt-1 text-xl font-bold">{c.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="card p-3">
            <SectionHead title="Geç Ödeme Skoru" />
            <div className="space-y-3">
              {late.map((l) => (
                <div key={l.c}>
                  <div className="flex items-center justify-between text-sm"><span className="font-semibold">{l.c}</span><span>Ort. {l.g} gün • {l.s} fatura</span></div>
                  <div className="mt-1 h-2.5 rounded-full bg-muted"><div className={`h-2.5 rounded-full ${l.g > 16 ? "bg-danger" : "bg-warning"}`} style={{ width: `${(l.g / 25) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-3">
            <SectionHead title="Önerilen Aksiyonlar" extra={<Badge tone="violet">Akıllı Öneri</Badge>} />
            <div className="space-y-2">
              {oneri.map((o) => (
                <div key={o} className="flex items-center gap-3 rounded-lg border border-border p-2.5 text-sm">
                  <Sparkles className="h-5 w-5 shrink-0 text-violet" />
                  <span>{o}</span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FinanceShell>
  );
}
