import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

const rowOne = [
  {
    title: "Kit Iniciante",
    desc: "Navalha, pente e pomada pra começar",
    tag: "A partir de R$ 299",
    image: images.razor,
    link: "/buscar?category=navalhas-laminas",
  },
  {
    title: "Máquinas Pro",
    desc: "Fade, degradê e precisão no dia a dia",
    tag: "Linha profissional",
    image: images.clipper,
    link: "/buscar?category=maquinas-aparadores",
  },
  {
    title: "Pomadas & Estilo",
    desc: "Matte, brilho e fixação forte",
    tag: "Mais vendidos",
    image: images.pomade,
    link: "/buscar?category=pomadas-finalizadores",
  },
];

const rowWide = [
  {
    title: "Frete grátis acima de R$ 200",
    desc: "Pra capital e região metropolitana. Cupom: RUAFREE",
    image: images.shelf,
    link: "/buscar",
  },
  {
    title: "Equipamentos de barbearia",
    desc: "Cadeiras, espelhos e aquecedores em até 12x",
    image: images.chair,
    link: "/buscar?category=equipamentos-barbearia",
  },
];

const rowTwo = [
  {
    title: "Navalhas & Lâminas",
    image: images.razor,
    link: "/buscar?category=navalhas-laminas",
  },
  {
    title: "Escovas & Pentes",
    image: images.tools,
    link: "/buscar?category=escovas-pentes",
  },
  {
    title: "Pós-barba & Skincare",
    image: images.skincare,
    link: "/buscar?category=pomadas-finalizadores",
  },
  {
    title: "Ver catálogo completo",
    image: images.barberAction,
    link: "/buscar",
  },
];

export default function HomeBanners() {
  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {rowOne.map((banner) => (
          <Link
            key={banner.title}
            href={banner.link}
            className="group relative block h-52 overflow-hidden rounded-lg border border-stone-800"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                {banner.tag}
              </span>
              <h3 className="mt-1 font-display text-xl font-black uppercase text-white">
                {banner.title}
              </h3>
              <p className="mt-1 text-sm text-stone-300">{banner.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rowWide.map((banner) => (
          <Link
            key={banner.title}
            href={banner.link}
            className="group relative block h-44 overflow-hidden rounded-lg border border-stone-800 md:h-52"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
              <h3 className="max-w-xs font-display text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                {banner.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-stone-300">{banner.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {rowTwo.map((banner) => (
          <Link
            key={banner.title}
            href={banner.link}
            className="group relative block h-36 overflow-hidden rounded-lg border border-stone-800"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/50 transition group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-end p-4">
              <h3 className="font-display text-sm font-black uppercase leading-tight text-white md:text-base">
                {banner.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
