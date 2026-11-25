import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GIRO, METADE } from "@/data/simbolo";
import { PRODUTOS, asset, type ProdutoId } from "@/data/produtos";

const IDS: ProdutoId[] = ["capsulas", "gel"];

/* As duas metades do símbolo são os dois produtos. Ao rolar, o caminho entre elas se abre. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState<ProdutoId | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const f = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--abre", String(Math.min(1, window.scrollY / 600)));
      });
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => { window.removeEventListener("scroll", f); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" ref={ref} data-ativo={ativo ?? ""}>
      <div className="wrap hero-grade">
        <div className="hero-texto">
          <h1>Cuidado articular para seguir em movimento.</h1>
          <p>Por dentro, em cápsulas. Por fora, em gel. Duas formas de cuidar de ossos e articulações, feitas para caber na mesma rotina.</p>
          <div className="hero-acoes">
            <Link to="/#produtos" className="btn btn-azul">Conhecer os produtos <ArrowRight /></Link>
            <Link to="/#articulacao" className="btn btn-linha">Ver como age</Link>
          </div>
        </div>

        <div className="hero-simbolo">
          <svg className="hero-marca" viewBox="90 128 450 490" aria-hidden>
            <defs>
              <clipPath id="c1"><path d={METADE} /></clipPath>
              <clipPath id="c2"><path d={METADE} transform={GIRO} /></clipPath>
            </defs>
            <g className="metade m1">
              <g clipPath="url(#c1)">
                <rect x="100" y="140" width="380" height="320" fill="#1957B2" />
                <g className="capsulas">
                  {Array.from({ length: 34 }, (_, i) => {
                    const x = 112 + (i % 7) * 58 + (Math.floor(i / 7) % 2) * 24;
                    const y = 168 + Math.floor(i / 7) * 62 + (i % 3) * 8;
                    return (
                      <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 180})`}>
                        <rect x="-25" y="-10" width="50" height="20" rx="10" fill="#2F74D0" />
                        <path d="M0-10h15a10 10 0 0 1 0 20H0z" fill="#B9DCE1" opacity=".75" />
                        <path d="M-16-5h28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".45" />
                      </g>
                    );
                  })}
                </g>
              </g>
            </g>
            <g className="metade m2">
              <g clipPath="url(#c2)">
                <image className="gel-img" href={asset("/photos/vidro.webp")} x="-40" y="230" width="720" height="405" preserveAspectRatio="xMidYMid slice" />
                <rect x="160" y="280" width="380" height="320" fill="#5FA3E0" style={{ mixBlendMode: "multiply" }} />
              </g>
            </g>
          </svg>
          {IDS.map((id) => (
            <Link
              key={id}
              to={PRODUTOS[id].slug}
              className={`hero-etiqueta et-${id}`}
              onMouseEnter={() => setAtivo(id)}
              onMouseLeave={() => setAtivo(null)}
              onFocus={() => setAtivo(id)}
              onBlur={() => setAtivo(null)}
            >
              <small>{PRODUTOS[id].via}</small>
              <strong>{PRODUTOS[id].nome}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
