import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, CreditCard, Headset, HeartHandshake, Info, Leaf, Pill, ShieldCheck, Truck } from "lucide-react";
import { Grupo } from "@/components/embalagem";
import { asset, PRODUTO, type Opcao } from "@/data/produtos";

const ABAS = [
  { label: "Garantia", icon: HeartHandshake, texto: "Você tem 7 dias de garantia após receber o pedido. Se tiver qualquer questão com a sua compra, fale com o nosso atendimento e nós resolveremos, sem burocracia." },
  { label: "Meios de pagamento", icon: CreditCard, texto: "O pagamento é processado de forma segura no checkout. As opções disponíveis e o parcelamento aparecem antes de você finalizar o pedido." },
  { label: "Meios de envio", icon: Truck, texto: "Enviamos para todo o Brasil. O prazo é calculado pelo seu CEP e aparece no checkout antes de você finalizar o pedido." },
];

const DETALHES = [["Composição", Leaf], ["Modo de uso", Pill], ["Cuidados", Info]] as const;

/** Venda do produto: galeria, escolha de 1, 3 ou 5 frascos e, logo abaixo, composição, modo de uso e cuidados. */
export function Compra() {
  const [qtd, setQtd] = useState<Opcao["qtd"]>(3);
  const [vista, setVista] = useState<Opcao["qtd"] | "rotina">(3);
  const [aba, setAba] = useState(0);
  const [detalhe, setDetalhe] = useState<number | null>(null);
  const op = PRODUTO.opcoes.find((o) => o.qtd === qtd)!;
  const card = "rounded-2xl border border-prof/15 bg-white p-4 shadow-xl shadow-prof/5 sm:p-5";
  const foto = <img src={asset("/photos/movimento.webp")} alt="Mulher caminhando ao ar livre" className="size-full object-cover object-[82%_center]" />;

  return (
    <section id="comprar" className="mx-auto max-w-[76rem] scroll-mt-14 px-4 py-8 sm:px-8 sm:py-10 lg:py-6" aria-label="Comprar">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
        <div className={`flex flex-col ${card}`}>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl lg:aspect-auto lg:min-h-0 lg:flex-1" style={{ background: "radial-gradient(circle at 50% 55%, #fff, #dcecf3 78%)" }}>
            <span className="absolute left-3 top-3 z-10 rounded-full bg-prof px-3 py-1 text-xs font-semibold text-white">{PRODUTO.ficha[1][1]}</span>
            <div key={vista} className="sobe absolute inset-0">{vista === "rotina" ? foto : <Grupo qtd={vista} />}</div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {([1, 3, 5, "rotina"] as const).map((v) => (
              <button key={v} aria-label={v === "rotina" ? "Ver na rotina" : `Ver ${v}`} aria-pressed={vista === v} onClick={() => setVista(v)}
                className={`aspect-square overflow-hidden rounded-lg border bg-bruma transition lg:aspect-[5/4] ${vista === v ? "border-vivo ring-2 ring-vivo/30" : "border-prof/15 hover:border-vivo/50"}`}>
                {v === "rotina" ? foto : <Grupo qtd={v} mini />}
              </button>
            ))}
          </div>
        </div>

        <div className={`flex flex-col ${card}`}>
          <div className="text-center">
            <h2 className="text-[1.95rem] font-bold leading-tight sm:text-[2.3rem]">Ossentis <span className="text-vivo sm:whitespace-nowrap">{PRODUTO.nome}</span></h2>
            <p className="mt-1 font-semibold text-suave">{PRODUTO.chamada}</p>
          </div>
          <div className="mt-5 space-y-3.5" role="radiogroup" aria-label="Escolha a quantidade">
            {PRODUTO.opcoes.map((o) => {
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

      <div className="mt-5 lg:mt-6">
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-4">
          {DETALHES.map(([t, I], i) => {
            const on = detalhe === i;
            return (
              <button key={t} aria-expanded={on} aria-controls="detalhes" onClick={() => setDetalhe(on ? null : i)}
                className={`flex min-h-14 items-center gap-3 rounded-xl border px-5 text-lg font-bold transition-colors ${on ? "border-vivo bg-vivo text-white" : "border-prof/15 bg-white hover:border-vivo hover:text-vivo"}`}>
                <I className="size-5 shrink-0" aria-hidden />{t}
                <ChevronDown className={`ml-auto size-5 shrink-0 transition-transform ${on ? "rotate-180" : ""}`} aria-hidden />
              </button>
            );
          })}
        </div>
        {detalhe !== null && (
          <div id="detalhes" key={detalhe} ref={(el) => el?.scrollIntoView({ behavior: "smooth", block: "nearest" })} className="scroll-mb-6 scroll-mt-20 sobe mt-3 rounded-2xl border border-prof/15 bg-white px-5 py-5 sm:px-7">
            {detalhe === 0 && (
              <>
                <h3 className="border-b border-prof/15 pb-3 text-xl font-bold text-vivo">{PRODUTO.composicaoTitulo}</h3>
                <dl className="grid sm:grid-cols-2 sm:gap-x-10">
                  {PRODUTO.composicao.map((a) => (
                    <div key={a.nome} className="flex justify-between gap-4 border-b border-prof/10 py-3">
                      <dt><span className="font-semibold">{a.nome}</span>{a.nota && <span className="block text-[15px] leading-snug text-suave">{a.nota}</span>}</dt>
                      <dd className="whitespace-nowrap font-bold">{a.qtd}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {detalhe === 1 && <p className="leading-relaxed">{PRODUTO.modoUso} {PRODUTO.paraQuem}</p>}
            {detalhe === 2 && <p className="leading-relaxed">{PRODUTO.aviso}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
