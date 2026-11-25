import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, Plus, X } from "lucide-react";
import { GIRO, METADE, VIEWBOX } from "@/data/simbolo";
import { PRODUTOS, asset, type ProdutoId } from "@/data/produtos";

export function Metade({ id, className = "" }: { id: ProdutoId; className?: string }) {
  return (
    <svg className={className} viewBox={id === "capsulas" ? "110 148 350 306" : "170 292 350 306"} aria-hidden>
      <path d={METADE} transform={id === "gel" ? GIRO : undefined} fill="currentColor" />
    </svg>
  );
}

export function Simbolo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox={VIEWBOX} aria-hidden>
      <path d={METADE} fill="currentColor" />
      <path d={METADE} transform={GIRO} fill="currentColor" />
    </svg>
  );
}

/** Espaço do mockup: mostra a embalagem quando houver `imagem`; até lá, a metade do símbolo. */
export function PalcoProduto({ id, className = "" }: { id: ProdutoId; className?: string }) {
  const p = PRODUTOS[id];
  return (
    <div className={`palco palco-${id} ${className}`}>
      <img className="palco-vidro" src={asset("/photos/vidro.webp")} alt="" />
      {p.imagem ? (
        <img className="palco-mockup" src={asset(p.imagem)} alt={`Embalagem de ${p.nome}`} />
      ) : (
        <>
          <Metade id={id} className="palco-metade" />
          <span className="palco-nota">Embalagem em breve</span>
        </>
      )}
    </div>
  );
}

export function Comprar({ id }: { id: ProdutoId }) {
  const p = PRODUTOS[id];
  if (!p.link) return <button className="btn btn-azul" disabled>Disponível em breve</button>;
  return <a className="btn btn-azul" href={p.link}>Comprar agora <ArrowRight /></a>;
}

const NAV = [
  ["/#produtos", "Produtos"],
  ["/#articulacao", "Como age"],
  ["/#especialista", "Especialista"],
  ["/#duvidas", "Dúvidas"],
] as const;

export function Header() {
  const [fixo, setFixo] = useState(false);
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const f = () => setFixo(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`topo ${fixo || aberto ? "topo-fixo" : ""}`}>
      <div className="wrap topo-linha">
        <Link to="/" aria-label="Ossentis, página inicial" onClick={() => setAberto(false)}>
          <img src={asset("/brand/logo-azul.svg")} alt="Ossentis" className="topo-logo" />
        </Link>
        <nav className={`topo-nav ${aberto ? "aberta" : ""}`}>
          {NAV.map(([to, t]) => <Link key={to} to={to} onClick={() => setAberto(false)}>{t}</Link>)}
        </nav>
        <Link to="/#produtos" className="btn btn-azul btn-p topo-cta">Conhecer a linha</Link>
        <button className="topo-menu" aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {aberto ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="rodape">
      <Simbolo className="rodape-marca" />
      <div className="wrap">
        <p className="rodape-frase">Cuidar é abrir espaço para a vida seguir.</p>
        <div className="rodape-grade">
          <img src={asset("/brand/logo-branco.svg")} alt="Ossentis" />
          <nav>
            {Object.values(PRODUTOS).map((p) => <Link key={p.id} to={p.slug}>{p.nome}</Link>)}
          </nav>
          <nav>
            {NAV.slice(1).map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}
          </nav>
        </div>
        <p className="rodape-legal">
          As informações deste site não substituem orientação, diagnóstico ou tratamento de um profissional de saúde. © {new Date().getFullYear()} Ossentis.
        </p>
      </div>
    </footer>
  );
}

export function Acordeao({ itens }: { itens: [string, ReactNode][] }) {
  return (
    <div className="acordeao">
      {itens.map(([q, a]) => (
        <details key={q} name="acordeao">
          <summary>{q}<Plus /></summary>
          <div>{a}</div>
        </details>
      ))}
    </div>
  );
}
