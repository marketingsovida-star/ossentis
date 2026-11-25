import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Bone, Layers, Snowflake, Zap } from "lucide-react";
import { PRODUTOS, type ProdutoId } from "@/data/produtos";

type B = { zona: string; aba: string; icon: typeof Bone; titulo: string; texto: string; ativos: [string, string][]; produto: ProdutoId; cta: string };

const BS: B[] = [
  { zona: "osso", aba: "Ossos", icon: Bone, produto: "capsulas", cta: "Quero cuidar dos meus ossos",
    titulo: "Ossos bem cuidados para sustentar seus planos.",
    texto: "De nada adianta o cálcio se o corpo não consegue aproveitá-lo. A fórmula reúne os nutrientes que participam da absorção do cálcio e da formação e manutenção dos ossos.",
    ativos: [["Vitamina D", "ajuda o corpo a absorver o cálcio"], ["Vitamina K2", "auxilia na manutenção dos ossos"], ["Magnésio", "auxilia na formação dos ossos"]] },
  { zona: "cart", aba: "Cartilagem", icon: Layers, produto: "capsulas", cta: "Quero cuidar das minhas articulações",
    titulo: "Atenção para a parte que absorve cada passo.",
    texto: "A cartilagem amortece o contato entre os ossos todos os dias. A fórmula leva o colágeno próprio dela, junto da vitamina que o corpo usa para formar colágeno.",
    ativos: [["Colágeno tipo II", "o colágeno próprio da cartilagem"], ["Vitamina C", "auxilia na formação do colágeno"]] },
  { zona: "liquido", aba: "Mobilidade", icon: Activity, produto: "capsulas", cta: "Quero seguir em movimento",
    titulo: "Para agachar, subir e caminhar no seu ritmo.",
    texto: "Movimento confortável depende de uma articulação hidratada e de um tecido firme ao redor dela. Três ativos completam esse cuidado na mesma dose.",
    ativos: [["Ácido hialurônico", "presente no líquido que lubrifica a articulação"], ["MSM", "fonte de enxofre para o tecido conectivo"], ["Cúrcuma", "fonte de compostos antioxidantes"]] },
  { zona: "musculo", aba: "Músculos", icon: Zap, produto: "capsulas", cta: "Quero começar agora",
    titulo: "Músculos ativos protegem cada movimento.",
    texto: "São eles que dão firmeza ao passo e dividem o esforço com as articulações. Por isso a fórmula também cuida do funcionamento muscular.",
    ativos: [["Magnésio", "auxilia no funcionamento muscular"], ["Vitamina D", "auxilia no funcionamento muscular"]] },
  { zona: "pele", aba: "Alívio", icon: Snowflake, produto: "gel", cta: "Quero sentir esse alívio",
    titulo: "Frescor na hora em que o dia pesa.",
    texto: "Enquanto as cápsulas cuidam por dentro, o gel traz conforto imediato por fora. Absorve rápido, não gruda e deixa as pernas com sensação de leveza.",
    ativos: [["Mentol", "sensação imediata de frescor"], ["Arnica", "tradicional na massagem do corpo"], ["Castanha da Índia", "cuidado para pernas pesadas"]] },
];

const FEMUR = "M150 0V150C150 200 90 205 88 255C87 300 130 318 165 308C185 302 190 285 200 285C210 285 215 302 235 308C270 318 313 300 312 255C310 205 250 200 250 150V0Z";
const TIBIA = "M96 362C96 344 120 342 160 347C185 349 190 338 200 338C210 338 215 349 240 347C280 342 304 344 304 362C304 410 250 430 248 480L246 600H154L152 480C150 430 96 410 96 362Z";

export function Beneficios() {
  const [n, setN] = useState(0);
  const b = BS[n];
  const z = (zona: string) => ({ className: `zona z-${zona} ${b.zona === zona ? "on" : ""}`, onClick: () => setN(BS.findIndex((x) => x.zona === zona)) });
  return (
    <section id="beneficios" className="flex scroll-mt-14 items-center bg-gelo px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-60px)] lg:py-8" aria-labelledby="t-ben">
      <div className="mx-auto w-full max-w-[76rem]">
        <h2 id="t-ben" className="text-center text-balance text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">O que a Ossentis <span className="text-vivo">faz por você</span></h2>
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <svg viewBox="20 70 360 450" role="img" aria-label={`Joelho com destaque: ${b.aba}`} className="mx-auto h-56 w-auto sm:h-72 lg:h-[min(29rem,60svh)]" style={{ mask: "linear-gradient(transparent, #000 12%, #000 88%, transparent)" }}>
            <path {...z("pele")} d="M62 0C66 110 26 190 34 290C40 390 74 450 80 600H320C326 450 360 390 366 290C374 190 334 110 338 0Z" />
            <path {...z("musculo")} d="M96 0C100 120 52 200 54 300C56 390 96 440 104 600H296C304 440 344 390 346 300C348 200 300 120 304 0Z" />
            <ellipse {...z("liquido")} cx="200" cy="322" rx="134" ry="72" />
            <g {...z("osso")}><path d={FEMUR} /><path d={TIBIA} /></g>
            <g {...z("cart")}>
              <path d="M91 264C93 302 132 316 165 307C185 301 190 286 200 286C210 286 215 301 235 307C268 316 307 302 309 264" />
              <path d="M102 356C108 346 130 345 160 349C185 351 190 341 200 341C210 341 215 351 240 349C270 345 292 346 298 356" />
            </g>
          </svg>
          <div>
            <div role="tablist" aria-label="Benefícios" className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {BS.map(({ aba, icon: I }, i) => (
                <button key={aba} role="tab" aria-selected={i === n} onClick={() => setN(i)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 font-semibold transition-colors ${i === n ? "border-vivo bg-vivo text-white" : "border-prof/15 bg-white hover:border-vivo hover:text-vivo"}`}>
                  <I className="size-6 stroke-[1.6]" aria-hidden />{aba}
                </button>
              ))}
            </div>
            <div key={b.zona} role="tabpanel" className="sobe mt-6 lg:min-h-[21rem]">
              <h3 className="text-balance text-[1.7rem] font-bold leading-tight sm:text-4xl">{b.titulo}</h3>
              <p className="mt-3 max-w-[38em] text-lg leading-relaxed text-suave">{b.texto}</p>
              <ul className="mt-4">
                {b.ativos.map(([nome, t]) => (
                  <li key={nome} className="flex flex-col border-t border-prof/15 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                    <strong className="text-lg font-bold text-vivo sm:w-44 sm:shrink-0">{nome}</strong><span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link to={PRODUTOS[b.produto].slug} className="brilho mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-md bg-vivo px-7 text-lg font-semibold text-white sm:w-auto">{b.cta} <ArrowRight className="size-5" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
