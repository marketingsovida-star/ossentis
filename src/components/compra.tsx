import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Headset, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import { Grupo } from "@/components/embalagem";
import { asset, type Opcao, type ProdutoId } from "@/data/produtos";

const ABAS = [
  { label: "Garantia", icon: HeartHandshake, texto: "Você tem 7 dias de garantia após receber o pedido. Se tiver qualquer questão com a sua compra, fale com o nosso atendimento e nós resolveremos, sem burocracia." },
  { label: "Meios de pagamento", icon: CreditCard, texto: "O pagamento é processado de forma segura no checkout. As opções disponíveis e o parcelamento aparecem antes de você finalizar o pedido." },
  { label: "Meios de envio", icon: Truck, texto: "Enviamos para todo o Brasil. O prazo é calculado pelo seu CEP e aparece no checkout antes de você finalizar o pedido." },
];

/** Galeria + escolha de 1, 3 ou 5 (layout da venda da Duet / Viva One). Usada no kit da home e nas páginas de produto. */
export function Compra({ ids, titulo, subtitulo, selo, opcoes, h1 = false, id }: {
  ids: ProdutoId[]; titulo: ReactNode; subtitulo: string; selo: string; opcoes: Opcao[]; h1?: boolean; id?: string;
}) {
  const [qtd, setQtd] = useState<Opcao["qtd"]>(3);
  const [vista, setVista] = useState<Opcao["qtd"] | "rotina">(3);
  const [aba, setAba] = useState(0);
  const op = opcoes.find((o) => o.qtd === qtd)!;
  const H = h1 ? "h1" : "h2";
  const card = "rounded-2xl border border-prof/15 bg-white p-4 shadow-xl shadow-prof/5 sm:p-5";
  const foto = <img src={asset("/photos/movimento.webp")} alt="Mulher caminhando ao ar livre" className="size-full object-cover object-[82%_center]" />;

  return (
    <section id={id} className="mx-auto max-w-[76rem] scroll-mt-14 px-4 py-8 sm:px-8 sm:py-10" aria-label="Comprar">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
        <div className={`flex flex-col ${card}`}>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl lg:aspect-auto lg:min-h-0 lg:flex-1" style={{ background: "radial-gradient(circle at 50% 55%, #fff, #dcecf3 78%)" }}>
            <span className="absolute left-3 top-3 z-10 rounded-full bg-prof px-3 py-1 text-xs font-semibold text-white">{selo}</span>
            <div key={vista} className="sobe absolute inset-0">{vista === "rotina" ? foto : <Grupo ids={ids} qtd={vista} />}</div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {([1, 3, 5, "rotina"] as const).map((v) => (
              <button key={v} aria-label={v === "rotina" ? "Ver na rotina" : `Ver ${v}`} aria-pressed={vista === v} onClick={() => setVista(v)}
                className={`aspect-square overflow-hidden rounded-lg border bg-bruma transition lg:aspect-[5/4] ${vista === v ? "border-vivo ring-2 ring-vivo/30" : "border-prof/15 hover:border-vivo/50"}`}>
                {v === "rotina" ? foto : <Grupo ids={ids} qtd={v} mini />}
              </button>
            ))}
          </div>
        </div>

        <div className={`flex flex-col ${card}`}>
          <div className="text-center">
            <H className="text-[1.95rem] font-bold leading-tight sm:text-[2.3rem]">{titulo}</H>
            <p className="mt-1 font-semibold text-suave">{subtitulo}</p>
          </div>
          <div className="mt-5 space-y-3.5" role="radiogroup" aria-label="Escolha a quantidade">
            {opcoes.map((o) => {
              const on = o.qtd === qtd;
              return (
                <button key={o.qtd} role="radio" aria-checked={on} onClick={() => { setQtd(o.qtd); setVista(o.qtd); }}
                  className={`relative flex w-full items-center gap-4 rounded-xl border px-5 py-3.5 text-left transition sm:px-6 ${on ? "border-vivo bg-bruma ring-1 ring-vivo/30" : "border-prof/15 hover:border-vivo/50"}`}>
                  {o.selo && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-vivo px-3 py-0.5 text-xs font-semibold text-white">{o.selo}</span>}
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-vivo bg-vivo" : "border-prof/25"}`}>{on && <span className="size-2 rounded-full bg-white" />}</span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold">{o.label}</span>
                    {o.economia && <span className="block text-sm text-vivo">{o.economia}</span>}
                  </span>
                  <span className="text-right">
                    <span className="block text-lg font-bold">{o.preco ?? "Em breve"}</span>
                    {o.parcela && <span className="block text-sm text-suave">{o.parcela}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          {op.link ? (
            <a href={op.link} className="brilho mt-5 flex h-13 items-center justify-center rounded-full bg-linear-to-r from-prof to-vivo text-lg font-bold text-white">Comprar {op.label}{op.preco && ` · ${op.preco}`}</a>
          ) : (
            <button disabled className="mt-5 flex h-13 cursor-default items-center justify-center rounded-full bg-linear-to-r from-prof to-vivo text-lg font-bold text-white">Disponível em breve</button>
          )}
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-suave">
            {([[ShieldCheck, "Compra segura"], [Truck, "Entrega para todo o Brasil"]] as const).map(([I, t]) => (
              <li key={t} className="flex items-center gap-1.5"><I className="size-4 text-vivo" aria-hidden />{t}</li>
            ))}
            <li><Link to="/sac" className="flex items-center gap-1.5 underline-offset-2 hover:underline"><Headset className="size-4 text-vivo" aria-hidden />Suporte rápido</Link></li>
          </ul>
          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Informações da compra">
              {ABAS.map(({ label, icon: I }, i) => (
                <button key={label} role="tab" aria-selected={aba === i} onClick={() => setAba(i)}
                  className={`flex min-h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${aba === i ? "border-vivo bg-bruma text-vivo" : "border-prof/15 text-suave hover:text-vivo"}`}>
                  <I className="size-4 shrink-0" aria-hidden />{label}
                </button>
              ))}
            </div>
            <div className="mt-2.5 grid">
              {ABAS.map(({ label, texto }, i) => (
                <p key={label} role="tabpanel" className={`col-start-1 row-start-1 rounded-xl border border-vivo/25 bg-bruma px-4 py-3 text-[15px] leading-normal ${aba === i ? "" : "invisible"}`}>{texto}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
