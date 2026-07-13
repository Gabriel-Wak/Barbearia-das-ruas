"use client";

const items = [
  "BARBEARIA DE COMUNIDADE",
  "◆",
  "ESTILO DE RUA",
  "◆",
  "GRAFITE & ATITUDE",
  "◆",
  "PRODUTOS PRO",
  "◆",
  "RESPEITA O CRAFT",
  "◆",
  "BARBER DA RUA",
  "◆",
  "DEGRADÊ PERFEITO",
  "◆",
];

export default function MarqueeStrip() {
  const content = items.join("   ");

  return (
    <div className="relative overflow-hidden border-y border-yellow-500/20 bg-black py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="font-display mx-4 text-sm font-bold uppercase tracking-widest text-yellow-400">
          {content}
        </span>
        <span className="font-display mx-4 text-sm font-bold uppercase tracking-widest text-yellow-400">
          {content}
        </span>
      </div>
    </div>
  );
}
