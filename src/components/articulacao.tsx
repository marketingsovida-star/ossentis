import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CAMADAS, PRODUTOS } from "@/data/produtos";

const FEMUR = "M150 0V150C150 200 90 205 88 255C87 300 130 318 165 308C185 302 190 285 200 285C210 285 215 302 235 308C270 318 313 300 312 255C310 205 250 200 250 150V0Z";
const TIBIA = "M96 362C96 344 120 342 160 347C185 349 190 338 200 338C210 338 215 349 240 347C280 342 304 344 304 362C304 410 250 430 248 480L246 600H154L152 480C150 430 96 410 96 362Z";

export function Articulacao() {
  const [n, setN] = useState(0);
  const c = CAMADAS[n];
  const p = PRODUTOS[c.produto];
  const on = (id: string) => (c.id === id ? "camada on" : "camada");
  return (
    <section className="articulacao" id="articulacao">
      <div className="wrap art-grade">
        <div className="art-arte">
          <svg viewBox="0 0 400 600" role="img" aria-label={`Ilustração de um joelho, com destaque para: ${c.nome}`}>
            <path className={on("pele")} data-c="pele" onClick={() => setN(4)} d="M62 0C66 110 26 190 34 290C40 390 74 450 80 600H320C326 450 360 390 366 290C374 190 334 110 338 0Z" />
            <path className={on("conectivo")} data-c="conectivo" onClick={() => setN(3)} d="M118 150C60 200 46 260 52 318C58 380 92 410 130 450H270C308 410 342 380 348 318C354 260 340 200 282 150Z" />
            <path className={on("liquido")} data-c="liquido" onClick={() => setN(1)} d="M74 270C70 320 78 350 90 372H310C322 350 330 320 326 270Z" />
            <g className={on("ossos")} data-c="ossos" onClick={() => setN(2)}>
              <path d={FEMUR} />
              <path d={TIBIA} />
            </g>
            <g className={on("cartilagem")} data-c="cartilagem" onClick={() => setN(0)}>
              <path d="M91 264C93 302 132 316 165 307C185 301 190 286 200 286C210 286 215 301 235 307C268 316 307 302 309 264" />
              <path d="M102 356C108 346 130 345 160 349C185 351 190 341 200 341C210 341 215 351 240 349C270 345 292 346 298 356" />
            </g>
          </svg>
        </div>
        <div className="art-texto">
          <h2>O que se move quando você se move.</h2>
          <div className="art-abas" role="tablist" aria-label="Camadas da articulação">
            {CAMADAS.map((x, i) => (
              <button key={x.id} role="tab" aria-selected={i === n} onClick={() => setN(i)}>{x.nome}</button>
            ))}
          </div>
          <div className="art-painel" role="tabpanel" key={c.id}>
            <p>{c.texto}</p>
            <ul>{c.ativos.map((a) => <li key={a}>{a}</li>)}</ul>
            <Link to={p.slug} className="link">Conhecer {p.nome} <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
