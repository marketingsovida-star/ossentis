import { useEffect, useRef, useState } from "react";
import { BookOpen, Eye, HeartPulse, Headset, Leaf, ShieldCheck, Stethoscope, UserRound, type LucideIcon } from "lucide-react";
import { ProdutoAtivos } from "@/components/ativos";
import { Beneficios } from "@/components/beneficios";
import { Compra } from "@/components/compra";
import { Faixa, Faq, Footer, Header } from "@/components/ui";
import { asset } from "@/data/produtos";
import { useHead } from "@/lib/head";

const DIFERENCIAIS: [LucideIcon, string, string][] = [
  [Eye, "Você sabe o que está escolhendo", "Ativos e quantidades apresentados de forma clara, para uma escolha mais consciente."],
  [HeartPulse, "Cuidado completo", "Ossos, cartilagens, articulações e músculos reunidos em uma só fórmula."],
  [Leaf, "Ingredientes selecionados", "Cada fórmula nasce de uma escolha criteriosa de ativos e combinações."],
  [Stethoscope, "Ao lado de quem entende", "O Dr. Luca, reumatologista, é coprodutor da marca e acompanha de perto quem quer se mover melhor."],
  [ShieldCheck, "Transparência de verdade", "Informações completas e acessíveis para você entender melhor o que está consumindo."],
  [Headset, "Estamos perto de você", "Atendimento ágil, humano e uma comunicação simples e clara."],
];

function Hero({ refHero }: { refHero: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={refHero} id="topo" className="relative overflow-hidden sm:min-h-svh">
      <img src={asset("/photos/movimento.webp")} alt="Mulher de cabelos grisalhos caminhando ao ar livre, sorrindo" fetchPriority="high" className="aspect-square w-full object-cover object-[82%_20%] sm:absolute sm:inset-0 sm:size-full sm:object-[78%_25%]" />
      <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-gelo/85 via-gelo/55 via-40% to-transparent to-60% sm:block" />
      <Faixa className="py-3 sm:py-4 sm:absolute sm:inset-x-0 sm:bottom-0" />
      <div className="relative mx-auto flex max-w-7xl items-center px-5 py-9 sm:min-h-svh sm:px-8 sm:pb-24">
        <div className="sobe w-full max-w-[35rem] text-center sm:text-left">
          <img src={asset("/brand/logo-azul.svg")} alt="Ossentis" className="mx-auto h-12 w-auto sm:mx-0 sm:h-16" />
          <h1 className="mt-5 text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-[3.5rem]">Cuidado articular para <span className="text-vivo">seguir em movimento</span></h1>
          <p className="mt-5 text-lg leading-relaxed">Oito ativos em uma só fórmula para cuidar de ossos e articulações e viver o que o movimento permite.</p>
          <div className="mt-7 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            <a href="#produto" className="brilho grid h-14 place-items-center rounded-md bg-vivo text-lg font-semibold text-white">Conhecer o produto</a>
            <a href="#comprar" className="brilho grid h-14 place-items-center rounded-md bg-prof text-lg font-semibold text-white">Comprar agora</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  return (
    <section id="diferenciais" className="scroll-mt-14 px-5 pb-8 pt-12 text-white sm:px-8 sm:pt-14">
      <div className="mx-auto max-w-[72rem]">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-[2.6rem]">O cuidado que faz a <span className="text-ciano">diferença</span></h2>
        <p className="mt-2 text-center text-white/85">Mais clareza em cada escolha. Mais confiança em cada movimento.</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {DIFERENCIAIS.map(([I, t, d]) => (
            <li key={t} className="rounded-2xl bg-gelo p-5 text-prof transition-transform duration-300 lg:hover:-translate-y-1">
              <span className="grid size-10 place-items-center rounded-xl bg-vivo/10 text-vivo"><I className="size-5" strokeWidth={1.6} aria-hidden /></span>
              <h3 className="mt-3 text-xl font-bold leading-snug">{t}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-suave">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Especialista() {
  const [aba, setAba] = useState(0);
  const abas = [["A história da Ossentis", BookOpen], ["Quem é o Dr. Luca", UserRound]] as const;
  return (
    <section id="especialista" className="scroll-mt-20 px-5 pb-12 pt-4 sm:px-8 sm:pb-14" aria-label="Conheça o Dr. Luca">
      <div className="mx-auto grid max-w-[72rem] gap-6 rounded-2xl bg-gelo p-4 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-9 md:p-7">
        {/* TODO: foto do Dr. Luca */}
        <div className="grid aspect-[4/5] max-h-96 w-full place-items-center rounded-t-[10rem] rounded-b-2xl bg-ciano">
          <div className="flex flex-col items-center gap-3"><img src={asset("/brand/simbolo.svg")} alt="" className="w-28" /><span className="text-sm">Foto em breve</span></div>
        </div>
        <div className="flex flex-col justify-center">
          <div role="tablist" aria-label="Sobre a marca e o especialista" className="grid grid-cols-2 gap-2 md:gap-3">
            {abas.map(([t, I], i) => (
              <button key={t} role="tab" aria-selected={aba === i} onClick={() => setAba(i)} className={`flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 px-3 py-2 font-semibold leading-tight transition-colors ${aba === i ? "border-prof bg-prof text-white" : "border-prof/20 bg-white hover:border-vivo"}`}>
                <I className="size-5 shrink-0" aria-hidden />{t}
              </button>
            ))}
          </div>
          <div className="mt-5 grid leading-relaxed">
            <div className={`col-start-1 row-start-1 space-y-3 ${aba === 0 ? "" : "invisible"}`}>
              <p className="text-2xl font-bold leading-snug text-vivo">Da clínica para a rotina.</p>
              <p>O movimento está em tudo: no passeio, no encontro, no plano feito de última hora. É ele que dá a liberdade de escolher o próprio ritmo.</p>
              <p>A Ossentis nasceu para proteger essa liberdade, com uma fórmula que reúne o cuidado com ossos, cartilagens e articulações em duas cápsulas ao dia.</p>
              <p className="font-semibold">Cuidar é abrir espaço para a vida seguir.</p>
            </div>
            <div className={`col-start-1 row-start-1 space-y-3 ${aba === 1 ? "" : "invisible"}`}>
              <p className="text-2xl font-bold leading-snug text-vivo">Dr. Luca, reumatologista e coprodutor da Ossentis.</p>
              <p>A reumatologia é a especialidade médica dedicada às articulações, aos ossos e aos músculos. É dessa vivência que vem o olhar do Dr. Luca para a marca.</p>
              <p>Ele também está à frente da Cortical, empresa de instrumentos ortopédicos para ortopedistas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  useHead({
    title: "Ossentis | Cuidado articular para seguir em movimento",
    description: "Cápsulas com oito ativos para o cuidado com ossos, cartilagens e articulações.",
    path: "/",
  });
  const refHero = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisivel(!e.isIntersecting), { rootMargin: "-80px 0px 0px" });
    if (refHero.current) io.observe(refHero.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header home visivel={visivel} />
      <main>
        <Hero refHero={refHero} />
        <div className="campo-claro">
        <ProdutoAtivos
          rotulo="Saúde óssea e articular · 60 cápsulas"
          titulo={<>Ossos e articulações <span className="text-vivo">cuidados em uma só fórmula</span></>}
          descricao="Colágeno tipo II, ácido hialurônico, MSM e cúrcuma para as articulações. Magnésio e vitaminas C, D e K2 para os ossos. Oito ativos em duas cápsulas ao dia, para quem quer continuar se movendo com liberdade."
        />
        <Beneficios />
        <Compra />
        </div>
        <div className="campo-azul">
          <Diferenciais />
          <Especialista />
        </div>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
