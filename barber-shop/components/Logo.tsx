import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const titleSize = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-3xl sm:text-4xl",
  };

  const subtitleSize = {
    sm: "text-[9px] sm:text-[10px]",
    md: "text-[10px] sm:text-xs",
    lg: "text-xs sm:text-sm",
  };

  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span
        className={`font-display font-black uppercase tracking-wide text-white transition group-hover:text-yellow-400 ${titleSize[size]}`}
      >
        Barber <span className="text-yellow-400">da Rua</span>
      </span>
      <span
        className={`mt-1 font-medium uppercase tracking-[0.25em] text-stone-500 ${subtitleSize[size]}`}
      >
        Barbearia de comunidade
      </span>
    </Link>
  );
}
