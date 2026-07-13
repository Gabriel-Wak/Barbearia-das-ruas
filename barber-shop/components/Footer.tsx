import Link from "next/link";
import Logo from "@/components/Logo";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black">
      <MarqueeStrip />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 md:grid-cols-4 sm:px-6 lg:px-8">
        <div className="sm:col-span-2">
          <Logo size="md" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
            Produtos de barbearia com a energia da rua. Grafite, rap, comunidade
            e precisão no fade. Equipando barbeiros da quebrada desde o dia zero.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-black uppercase tracking-wider text-yellow-400">
            Loja
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-500">
            <li>
              <Link href="/buscar" className="transition hover:text-white">
                Todos os Produtos
              </Link>
            </li>
            <li>
              <Link href="/buscar?featured=true" className="transition hover:text-white">
                Destaques
              </Link>
            </li>
            <li>
              <Link
                href="/buscar?category=maquinas-aparadores"
                className="transition hover:text-white"
              >
                Máquinas
              </Link>
            </li>
            <li>
              <Link
                href="/buscar?category=pomadas-finalizadores"
                className="transition hover:text-white"
              >
                Pomadas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-black uppercase tracking-wider text-pink-400">
            Conta
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-500">
            <li>
              <Link href="/login" className="transition hover:text-white">
                Entrar
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition hover:text-white">
                Criar Conta
              </Link>
            </li>
            <li>
              <Link href="/orders" className="transition hover:text-white">
                Meus Pedidos
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition hover:text-white">
                Carrinho
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
