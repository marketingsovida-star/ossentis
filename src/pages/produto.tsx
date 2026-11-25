import { useState } from "react";
import { ChevronDown, Info, Leaf, Pill, Droplets } from "lucide-react";
import { Compra } from "@/components/compra";
import { Faixa, Footer, Header } from "@/components/ui";
import { PRODUTOS, type ProdutoId } from "@/data/produtos";
import { useHead } from "@/lib/head";

export function ProdutoPage({ id }: { id: ProdutoId }) {
  const p = PRODUTOS[id];
  const [aberta, setAberta] = useState(true);
  useHead({ title: `${p.nome} | Ossentis`, description: p.descricao, path: p.slug, ogType: "product" });
  const Uso = id === "gel" ? Droplets : Pill;
  const barra = "flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left sm:px-6";
  const bola = "grid size-11 shrink-0 place-items-center rounded-full text-white";
  return (
    <>
      <Header />
      <main>
        <Faixa className="py-2" />
        <Compra h1 ids={[id]} titulo={<>Ossentis <span className="text-vivo sm:whitespace-nowrap">{p.nome}</span></>} subtitulo={p.chamada} selo={p.ficha[1][1]} opcoes={p.opcoes} />
        <section className="mx-auto max-w-[76rem] space-y-3 px-4 pb-12 sm:px-8">
          <div className={`${barra} border-prof/15 bg-bruma`}>
            <span className={`${bola} bg-prof`}><Uso className="size-5" aria-hidden /></span>
            <p><strong className="mr-2 font-bold">Modo de uso</strong>{p.modoUso}</p>
          </div>
          <div>
            <button aria-expanded={aberta} onClick={() => setAberta(!aberta)} className={`${barra} border-vivo/25 bg-vivo/8`}>
              <span className={`${bola} bg-vivo`}><Leaf className="size-5" aria-hidden /></span>
              <span className="flex-1"><strong className="mr-2 font-bold text-vivo">Composição</strong>Conheça os ativos e o que cada um faz.</span>
              <ChevronDown className={`size-5 shrink-0 text-vivo transition-transform ${aberta ? "rotate-180" : ""}`} />
            </button>
            {aberta && (
              <div className="sobe mt-3 rounded-xl border border-vivo/25 bg-white px-5 py-4 sm:px-6">
                <h2 className="border-b border-vivo/25 pb-3 text-xl font-bold text-vivo">{p.composicaoTitulo}</h2>
                <dl className="grid sm:grid-cols-2 sm:gap-x-10">
                  {p.composicao.map((a) => (
                    <div key={a.nome} className="flex justify-between gap-4 border-b border-vivo/15 py-3">
                      <dt><span className="font-semibold">{a.nome}</span>{a.nota && <span className="block text-[15px] leading-snug text-suave">{a.nota}</span>}</dt>
                      <dd className="whitespace-nowrap font-bold">{a.qtd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
          <div className={`${barra} !items-start border-prof/15 bg-white`}>
            <span className={`${bola} bg-ciano !text-prof`}><Info className="size-5" aria-hidden /></span>
            <p className="text-[15px] leading-relaxed"><strong className="mr-2 font-bold">Cuidados</strong>{p.aviso}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
