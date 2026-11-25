import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Acordeao, Footer, Header, PalcoProduto, Simbolo } from "@/components/ui";
import { Hero } from "@/components/hero";
import { Articulacao } from "@/components/articulacao";
import { Reveal } from "@/components/reveal";
import { FAQ, PRODUTOS, asset } from "@/data/produtos";
import { useHead } from "@/lib/head";

export function HomePage() {
  useHead({
    title: "Ossentis | Cuidado articular para seguir em movimento",
    description: "Cuidado articular por dentro e por fora: cápsulas com oito ativos para ossos e articulações e gel de alívio para o dia a dia.",
    path: "/",
  });
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="produtos" id="produtos">
          <div className="wrap">
            <Reveal className="cabeca">
              <h2>Dois produtos.<br />Um mesmo caminho.</h2>
              <p>Cada metade do nosso símbolo representa um cuidado. Juntas, elas mantêm o caminho aberto.</p>
            </Reveal>
            <div className="dupla">
              {Object.values(PRODUTOS).map((p) => (
                <article key={p.id} className={`cartao cartao-${p.id}`}>
                  <PalcoProduto id={p.id} />
                  <div className="cartao-corpo">
                    <span className="via">{p.via}</span>
                    <h3>{p.nome}</h3>
                    <p>{p.chamada}</p>
                    <dl>{p.ficha.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                    <Link to={p.slug} className="link">Conhecer a fórmula <ArrowRight /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="movimento">
          <img src={asset("/photos/movimento.webp")} alt="Mulher de cabelos grisalhos caminhando ao ar livre, sorrindo" loading="lazy" />
          <div className="wrap">
            <Reveal className="movimento-texto">
              <h2>A liberdade de escolher o próprio ritmo.</h2>
              <p>Um passeio, um encontro, um plano feito de última hora. O valor do movimento está em tudo o que ele permite viver.</p>
            </Reveal>
          </div>
        </section>

        <Articulacao />

        <section className="ativos">
          <div className="wrap ativos-grade">
            <div className="ativos-cabeca">
              <h2>Oito ativos, duas cápsulas ao dia.</h2>
              <p>O colágeno tipo II é o centro da fórmula. Os outros sete completam o cuidado com ossos, cartilagens e músculos.</p>
              <Link to={PRODUTOS.capsulas.slug} className="btn btn-claro">Ver a composição <ArrowRight /></Link>
            </div>
            <ul className="ativos-lista">
              {PRODUTOS.capsulas.composicao.map((a) => (
                <Reveal as="li" key={a.nome}>
                  <strong>{a.nome}</strong><span>{a.nota}</span><b>{a.qtd}</b>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="gel">
          <img src={asset("/photos/vidro.webp")} alt="" loading="lazy" />
          <div className="wrap gel-grade">
            <Reveal className="gel-texto">
              <h2>Frescor que chega na hora.</h2>
              <p>{PRODUTOS.gel.descricao}</p>
              <Link to={PRODUTOS.gel.slug} className="btn btn-azul">Conhecer o gel <ArrowRight /></Link>
            </Reveal>
            <ul className="gel-lista">
              {PRODUTOS.gel.destaques.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </section>

        <section className="especialista" id="especialista">
          <div className="wrap esp-grade">
            {/* TODO: trocar por foto do Dr. Luca. */}
            <div className="esp-retrato"><Simbolo /><span>Foto em breve</span></div>
            <Reveal className="esp-texto">
              <h2>Da clínica para a rotina.</h2>
              <p className="esp-lead">A Ossentis nasce ao lado de quem acompanha o movimento de perto.</p>
              <p>
                <strong>Dr. Luca</strong> é reumatologista e coprodutor da Ossentis. Também está à frente da Cortical, empresa de instrumentos ortopédicos para ortopedistas.
              </p>
              <dl>
                <div><dt>Especialidade</dt><dd>Reumatologia</dd></div>
                <div><dt>Empresa</dt><dd>Cortical</dd></div>
                <div><dt>Na Ossentis</dt><dd>Coprodutor</dd></div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="duvidas" id="duvidas">
          <div className="wrap duvidas-grade">
            <h2>Clareza em cada movimento.</h2>
            <Acordeao itens={FAQ} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
