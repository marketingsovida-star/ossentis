import { useState } from "react";
import { Link } from "react-router-dom";
import { Headset, HeartPulse, Leaf, Menu, Plus, ShieldCheck, X, type LucideIcon } from "lucide-react";
import { FAQ, asset } from "@/data/produtos";

const NAV = [
  ["/#produto", "O produto"],
  ["/#beneficios", "Benefícios"],
  ["/#especialista", "Dr. Luca"],
  ["/#duvidas", "Dúvidas"],
] as const;

/** Na home fica escondido enquanto o banner está na tela (padrão Duet / Viva One). */
export function Header({ home = false, visivel = true }: { home?: boolean; visivel?: boolean }) {
  const [aberto, setAberto] = useState(false);
  return (
    <header
      className={`${home ? "fixed" : "sticky"} inset-x-0 top-0 z-50 border-b border-prof/10 bg-gelo/95 backdrop-blur-md transition-transform duration-300 ${visivel ? "" : "pointer-events-none -translate-y-full"}`}
      inert={!visivel}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 md:h-[60px]">
        <Link to="/" aria-label="Ossentis, início"><img src={asset("/brand/logo-azul.svg")} alt="Ossentis" className="h-7 w-auto md:h-8" /></Link>
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map(([to, t]) => <Link key={to} to={to} className="text-[15px] font-semibold transition-colors hover:text-vivo">{t}</Link>)}
        </nav>
        <Link to="/#comprar" className="brilho hidden rounded-full bg-vivo px-6 py-2 text-[15px] font-semibold text-white lg:block">Comprar</Link>
        <button className="-mr-2 p-2 lg:hidden" aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {aberto ? <X /> : <Menu />}
        </button>
      </div>
      {aberto && (
        <nav className="flex flex-col border-t border-prof/10 px-5 py-2 lg:hidden">
          {[...NAV, ["/#comprar", "Comprar"] as const, ["/sac", "Atendimento"] as const].map(([to, t]) => (
            <Link key={to} to={to} onClick={() => setAberto(false)} className="border-b border-prof/10 py-3 font-semibold last:border-0">{t}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

const BENEFICIOS: [LucideIcon, string][] = [
  [Headset, "Compra segura com suporte rápido"],
  [ShieldCheck, "7 dias de garantia"],
  [HeartPulse, "Cuidado com ossos e articulações"],
  [Leaf, "Ingredientes selecionados"],
];

export function Faixa({ className = "" }: { className?: string }) {
  return (
    <div className={`campo-azul relative z-10 overflow-hidden text-white ${className}`} aria-label="Benefícios da Ossentis">
      <div className="faixa flex w-max">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="flex shrink-0" aria-hidden={n > 0 || undefined}>
            {BENEFICIOS.map(([Icon, t]) => (
              <div key={t} className="flex items-center gap-2.5 px-8 sm:px-12"><Icon className="size-5 stroke-[1.5]" aria-hidden /><span className="whitespace-nowrap text-sm sm:text-base">{t}</span></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Faq() {
  const [aberta, setAberta] = useState(0);
  return (
    <section id="duvidas" className="scroll-mt-14 bg-gelo py-12 sm:py-14">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-vivo sm:text-4xl">Perguntas frequentes</h2>
        <div className="space-y-2">
          {FAQ.map(([q, a], i) => {
            const on = aberta === i;
            return (
              <div key={q} className={`overflow-hidden rounded-lg border border-prof/15 ${on ? "bg-white" : "bg-bruma"}`}>
                <button aria-expanded={on} onClick={() => setAberta(on ? -1 : i)} className={`flex min-h-13 w-full items-center justify-between gap-6 px-5 py-3 text-left text-lg font-semibold leading-tight sm:px-6 ${on ? "text-vivo" : ""}`}>
                  {q}
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full border transition-transform duration-300 ${on ? "rotate-45 border-vivo bg-vivo text-white" : "border-prof/25"}`}><Plus className="size-4" /></span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <div className="min-h-0 overflow-hidden" inert={!on}><p className="px-5 pb-4 pr-14 text-suave sm:px-6 sm:pr-16">{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/sac" className="mx-auto mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-prof/20 bg-white px-5 py-2 font-semibold transition-colors hover:border-vivo hover:text-vivo sm:w-fit"><Headset className="size-4.5 shrink-0" aria-hidden /> Ainda tem dúvidas? Fale com a nossa equipe</Link>
      </div>
    </section>
  );
}

export function Footer() {
  const a = "underline underline-offset-2 hover:text-white";
  return (
    <footer className="campo-azul border-t border-white/20 text-white">
      <div className="mx-auto max-w-6xl px-5 pb-5 pt-6 sm:px-8 sm:pt-7">
        <div className="flex flex-col items-center text-center">
          <Link to="/" aria-label="Ossentis, início"><img src={asset("/brand/logo-branco.svg")} alt="Ossentis" className="h-8 w-auto sm:h-10" /></Link>
          <p className="mt-4 text-xs font-semibold uppercase leading-relaxed text-white/90">Não exceder a recomendação diária de consumo indicada na embalagem. Este produto não é um medicamento.</p>
        </div>
        <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-white/20 pt-4 text-center text-xs text-white/80 sm:flex-row">
          <p>© {new Date().getFullYear()} Ossentis. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <a className={a} href="https://www.instagram.com/thiagorocha.oficial" target="_blank" rel="noreferrer">Thiago Rocha</a> · Produzido por <a className={a} href="https://www.instagram.com/sovida.life/" target="_blank" rel="noreferrer">Sóvida</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
