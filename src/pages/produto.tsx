import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Acordeao, Comprar, Footer, Header, PalcoProduto } from "@/components/ui";
import { PRODUTOS, type ProdutoId } from "@/data/produtos";
import { useHead } from "@/lib/head";

export function ProdutoPage({ id }: { id: ProdutoId }) {
  const p = PRODUTOS[id];
  const outro = PRODUTOS[id === "gel" ? "capsulas" : "gel"];
  useHead({ title: `${p.nome} | Ossentis`, description: p.descricao, path: p.slug, ogType: "product" });
  return (
    <>
      <Header />
      <main className="pdp">
        <div className="wrap pdp-grade">
          <PalcoProduto id={id} className="pdp-palco" />
          <div className="pdp-info">
            <span className="via">{p.via}</span>
            <h1>{p.nome}</h1>
            <p className="pdp-chamada">{p.chamada}</p>
            <p>{p.descricao}</p>
            <ul className="checks">{p.destaques.map((d) => <li key={d}><Check />{d}</li>)}</ul>
            {p.preco && <p className="preco">{p.preco}</p>}
            <Comprar id={id} />
            <dl className="ficha">{p.ficha.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <Acordeao itens={[["Para quem é", p.paraQuem], ["Como usar", p.modoUso], ["Cuidados", p.aviso]]} />
          </div>
        </div>
        <section className="comp">
          <div className="wrap comp-grade">
            <h2>{p.composicaoTitulo}</h2>
            <ul className="comp-lista">
              {p.composicao.map((a) => (
                <li key={a.nome}><div><strong>{a.nome}</strong>{a.nota && <span>{a.nota}</span>}</div><b>{a.qtd}</b></li>
              ))}
            </ul>
          </div>
        </section>
        <Link to={outro.slug} className={`outro outro-${outro.id}`}>
          <div className="wrap">
            <span className="via">{outro.via}</span>
            <strong>{outro.nome}</strong>
            <ArrowRight />
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
