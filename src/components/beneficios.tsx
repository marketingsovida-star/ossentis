import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Bone, Layers, Zap } from "lucide-react";

const BS = [
  { zona: "osso", icon: Bone, titulo: "Sustenta seus ossos", texto: "Reúne o que o corpo usa para absorver o cálcio e formar e manter os ossos.", ativos: "Vitamina D, vitamina K2 e magnésio" },
  { zona: "cart", icon: Layers, titulo: "Cuida da cartilagem", texto: "Leva o colágeno próprio da cartilagem, que amortece cada passo do seu dia.", ativos: "Colágeno tipo II e vitamina C" },
  { zona: "liquido", icon: Activity, titulo: "Acompanha seus movimentos", texto: "Combina ativos ligados à lubrificação e ao tecido que envolve as articulações.", ativos: "Ácido hialurônico, MSM e cúrcuma" },
  { zona: "musculo", icon: Zap, titulo: "Mantém os músculos ativos", texto: "Auxilia o funcionamento dos músculos, que dão firmeza a cada passo.", ativos: "Magnésio e vitamina D" },
];

const FEMUR = "M150 0V150C150 200 90 205 88 255C87 300 130 318 165 308C185 302 190 285 200 285C210 285 215 302 235 308C270 318 313 300 312 255C310 205 250 200 250 150V0Z";
const TIBIA = "M96 362C96 344 120 342 160 347C185 349 190 338 200 338C210 338 215 349 240 347C280 342 304 344 304 362C304 410 250 430 248 480L246 600H154L152 480C150 430 96 410 96 362Z";


/** Joelho no centro, benefícios dos dois lados (todos visíveis); passar o mouse acende a parte correspondente. */
export function Beneficios() {
  const [zona, setZona] = useState("osso");
  const z = (nome: string) => ({ className: `zona z-${nome} ${zona === nome ? "on" : ""}`, onClick: () => setZona(nome) });

  const card = (i: number) => {
    const { zona: zn, icon: I, titulo, texto, ativos } = BS[i];
    const on = zona === zn;
    return (
      <li key={zn} className="flex shrink-0 basis-[86%] snap-center lg:basis-auto">
        <button aria-pressed={on} onClick={() => setZona(zn)} onMouseEnter={() => setZona(zn)} onFocus={() => setZona(zn)}
          className={`flex w-full flex-col justify-center rounded-2xl border bg-white p-5 text-left transition-[border-color,box-shadow] duration-300 ${on ? "border-vivo shadow-lg shadow-vivo/10" : "border-prof/15"}`}>
          <span className="flex items-center gap-3">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${on ? "bg-vivo text-white" : "bg-vivo/10 text-vivo"}`}><I className="size-5.5" strokeWidth={1.7} aria-hidden /></span>
            <span className="text-xl font-bold leading-tight">{titulo}</span>
          </span>
          <span className="mt-3 block leading-snug text-suave">{texto}</span>
          <span className="mt-3 block font-semibold leading-snug text-vivo">{ativos}</span>
        </button>
      </li>
    );
  };

  return (
    <section id="beneficios" className="flex scroll-mt-14 items-center overflow-hidden px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-60px)] lg:py-6" aria-labelledby="t-ben">
      <div className="mx-auto w-full max-w-[76rem]">
        <h2 id="t-ben" className="text-center text-balance text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">O que a Ossentis <span className="text-vivo">faz por você</span></h2>
        <p className="mx-auto mt-2 max-w-[38em] text-center text-lg text-suave">Um cuidado para a articulação inteira, para você seguir no seu ritmo.</p>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem_minmax(0,1fr)] lg:gap-8">
          <div className="grid place-items-center lg:col-start-2 lg:row-start-1">
            <svg viewBox="20 70 360 450" role="img" aria-label="Ilustração de um joelho" className="h-52 w-auto sm:h-64 lg:h-[min(24rem,50svh)]" style={{ mask: "linear-gradient(transparent, #000 12%, #000 88%, transparent)" }}>
              <path className="z-pele" d="M62 0C66 110 26 190 34 290C40 390 74 450 80 600H320C326 450 360 390 366 290C374 190 334 110 338 0Z" />
            <path {...z("musculo")} d="M96 0C100 120 52 200 54 300C56 390 96 440 104 600H296C304 440 344 390 346 300C348 200 300 120 304 0Z" />
            <ellipse {...z("liquido")} cx="200" cy="322" rx="134" ry="72" />
            <g {...z("osso")}><path d={FEMUR} /><path d={TIBIA} /></g>
            <g {...z("cart")}>
              <path d="M91 264C93 302 132 316 165 307C185 301 190 286 200 286C210 286 215 301 235 307C268 316 307 302 309 264" />
              <path d="M102 356C108 346 130 345 160 349C185 351 190 341 200 341C210 341 215 351 240 349C270 345 292 346 298 356" />
            </g>
          
            </svg>
          </div>
          <ul className="hidden grid-rows-2 gap-4 lg:col-start-1 lg:row-start-1 lg:grid">{card(0)}{card(1)}</ul>
          <ul className="hidden grid-rows-2 gap-4 lg:col-start-3 lg:row-start-1 lg:grid">{card(2)}{card(3)}</ul>
          <ul
            className="-mx-5 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden"
            onScroll={(e) => {
              const t = e.currentTarget;
              const max = t.scrollWidth - t.clientWidth;
              if (max > 0) setZona(BS[Math.round((t.scrollLeft / max) * (BS.length - 1))]?.zona ?? "osso");
            }}
          >
            {BS.map((_, i) => card(i))}
          </ul>
        </div>

        <Link to="/#comprar" className="brilho mx-auto mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-vivo px-8 py-4 text-center text-lg font-semibold leading-tight text-white lg:max-w-xl">Quero cuidar dos ossos e articulações <ArrowRight className="size-5 shrink-0" /></Link>
      </div>
    </section>
  );
}
