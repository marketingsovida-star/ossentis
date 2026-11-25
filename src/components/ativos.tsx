import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Activity, Atom, Bone, ChevronLeft, ChevronRight, Citrus, Droplets, Layers, Leaf, SunMedium, type LucideIcon } from "lucide-react";
import { Embalagem } from "@/components/embalagem";
import { Reveal } from "@/components/reveal";
import { PRODUTO } from "@/data/produtos";

type Ativo = [LucideIcon, string, string];

const ATIVOS: Ativo[] = [
  [Layers, "Colágeno tipo II", "Principal proteína estrutural da cartilagem, com a estrutura preservada."],
  [Droplets, "Ácido hialurônico", "Faz parte do líquido que lubrifica e amortece as articulações."],
  [Activity, "MSM", "Fonte de enxofre, mineral presente no tecido que une as articulações."],
  [Leaf, "Cúrcuma", "Rica em curcuminoides, compostos com ação antioxidante."],
  [Bone, "Vitamina K2", "Auxilia na manutenção dos ossos, na forma MK-7."],
  [SunMedium, "Vitamina D", "Auxilia na absorção do cálcio e na formação dos ossos."],
  [Atom, "Magnésio", "Auxilia na formação dos ossos e no funcionamento muscular."],
  [Citrus, "Vitamina C", "Auxilia na formação do colágeno, base da cartilagem e dos ossos."],
];

/** Apresentação do produto: texto, embalagem e carrossel de ativos (estrutura da Viva One / Duet). */
export function ProdutoAtivos({ rotulo, titulo, descricao }: { rotulo: string; titulo: ReactNode; descricao: string }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [fim, setFim] = useState<"ini" | "meio" | "fim">("ini");

  const mover = (d: 1 | -1) => {
    const t = trilho.current;
    if (t) t.scrollBy({ left: d * t.clientWidth, behavior: "smooth" });
  };

  const seta = (d: 1 | -1) => (
    <button aria-label={d === 1 ? "Próximos ativos" : "Ativos anteriores"} disabled={fim === (d === 1 ? "fim" : "ini")} onClick={() => mover(d)}
      className={`hidden size-12 shrink-0 place-items-center rounded-full text-white shadow-md transition-opacity disabled:opacity-35 sm:grid bg-vivo`}>
      {d === 1 ? <ChevronRight /> : <ChevronLeft />}
    </button>
  );

  return (
    <section id="produto" className={`flex scroll-mt-14 items-center overflow-hidden px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-60px)] lg:py-6`} aria-labelledby={`t-produto`}>
      <div className="mx-auto w-full max-w-[80rem]">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,42rem)_auto] lg:justify-center lg:gap-16">
          <Reveal className="text-center lg:text-left">
            <p className={`font-semibold text-vivo`}>{rotulo}</p>
            <h2 id={`t-produto`} className="mt-2 text-balance text-[2.2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl">{titulo}</h2>
            <p className="mx-auto mt-4 max-w-[36em] text-lg leading-relaxed lg:mx-0">{descricao}</p>
            <Link to="/#comprar" className={`brilho mt-6 flex h-14 items-center justify-center rounded-md text-lg font-semibold text-white bg-vivo`}>Comprar agora</Link>
          </Reveal>
          <Reveal className="order-first flex justify-center lg:order-none">
            <Embalagem className={`h-64 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-[1.04] sm:h-80 lg:h-[min(23rem,42svh)] -rotate-12`} />
          </Reveal>
        </div>
        <Reveal className="mt-8 flex items-center gap-5">
          {seta(-1)}
          <ul ref={trilho} tabIndex={0} aria-label={`Ativos: ${PRODUTO.nome}`}
            onScroll={(e) => {
              const t = e.currentTarget;
              setFim(t.scrollLeft < 8 ? "ini" : t.scrollLeft + t.clientWidth > t.scrollWidth - 8 ? "fim" : "meio");
            }}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none]">
            {ATIVOS.map(([I, nome, texto]) => (
              <li key={nome} className="flex shrink-0 basis-[82%] snap-start flex-col items-center rounded-xl border border-prof/15 bg-white/75 px-4 py-6 text-center sm:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-4rem)/5)]">
                <I className={`size-8 stroke-[1.6] text-vivo`} aria-hidden />
                <p className="mt-3 text-xl font-bold leading-tight">{nome}</p>
                <p className="mt-2 text-[15px] leading-snug text-prof/85">{texto}</p>
              </li>
            ))}
          </ul>
          {seta(1)}
        </Reveal>
      </div>
    </section>
  );
}
