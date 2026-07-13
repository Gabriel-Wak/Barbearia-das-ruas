"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/lib/images";

const slides = [
  {
    id: 1,
    tag: "Da quebrada pro mundo",
    title: "BARBER DA RUA",
    subtitle: "Produtos de barbearia com a energia da comunidade. Grafite, rap e precisão no fade.",
    cta: "Explorar Produtos",
    ctaLink: "/buscar",
    image: images.barberAction,
    accent: "#facc15",
  },
  {
    id: 2,
    tag: "Equipamento pesado",
    title: "MÁQUINAS PRO",
    subtitle: "Fade, navalha e degradê. Tudo que o barbeiro da esquina precisa pra entregar arte.",
    cta: "Ver Máquinas",
    ctaLink: "/buscar?category=maquinas-aparadores",
    image: images.clipper,
    accent: "#ec4899",
  },
  {
    id: 3,
    tag: "Finalização de respeito",
    title: "POMADAS & ESTILO",
    subtitle: "Matte, brilho, textura. Finalizadores que seguram o visual do boné ao baile.",
    cta: "Ver Pomadas",
    ctaLink: "/buscar?category=pomadas-finalizadores",
    image: images.shelf,
    accent: "#22d3ee",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 spray-texture" />

      <div
        className="absolute right-10 top-20 hidden h-40 w-40 rounded-full opacity-20 blur-3xl lg:block animate-spray"
        style={{ backgroundColor: slide.accent }}
      />
      <div
        className="absolute bottom-32 left-10 hidden h-32 w-32 rounded-full opacity-15 blur-3xl lg:block animate-spray"
        style={{ backgroundColor: slide.accent, animationDelay: "1.5s" }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span
              className="font-tag inline-block rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: slide.accent, color: slide.accent }}
            >
              {slide.tag}
            </span>

            <h1 className="font-display mt-6 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="text-graffiti">{slide.title.split(" ")[0]}</span>
              {slide.title.includes(" ") && (
                <>
                  <br />
                  <span className="text-white">{slide.title.split(" ").slice(1).join(" ")}</span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-300">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={slide.ctaLink}
                className="btn-street font-display inline-flex items-center justify-center rounded-none bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wider text-black"
              >
                {slide.cta}
              </Link>
              <Link
                href="/buscar?featured=true"
                className="btn-street font-display inline-flex items-center justify-center rounded-none border-2 border-white/30 px-8 py-4 text-sm font-black uppercase tracking-wider text-white backdrop-blur-sm hover:border-yellow-400 hover:text-yellow-400"
              >
                Destaques
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-4 flex gap-2 sm:left-8">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-300 ${
                index === current
                  ? "w-10 bg-yellow-400"
                  : "w-4 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden select-none font-display text-[12rem] font-black uppercase leading-none text-white/[0.03] lg:block">
        BDR
      </div>
    </section>
  );
}
