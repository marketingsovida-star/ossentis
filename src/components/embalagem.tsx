import { PRODUTO, asset } from "@/data/produtos";

/* Silhueta ilustrada, sem nome de produto. Dá lugar ao mockup quando `imagem` for preenchida em produtos.ts. */
export function Embalagem({ className = "" }: { className?: string }) {
  return <img src={asset(PRODUTO.imagem ?? "/products/silhueta-capsulas.svg")} alt={PRODUTO.imagem ? `Embalagem de ${PRODUTO.nome}` : "Ilustração do frasco"} className={`object-contain ${className}`} />;
}

/** Conjunto de 1, 3 ou 5 unidades para a galeria de compra. */
export function Grupo({ qtd, mini = false }: { qtd: number; mini?: boolean }) {
  return (
    <div className={`flex size-full items-center justify-center ${mini ? "p-1.5" : "p-8 sm:p-12"}`}>
      {Array.from({ length: qtd }, (_, i) => (
        <div key={i} className="h-full min-w-0" style={{ flex: `0 1 ${qtd === 1 ? 60 : qtd === 3 ? 38 : 27}%`, marginInline: qtd > 1 ? "-3%" : 0, zIndex: 5 - Math.abs(i - (qtd - 1) / 2) }}>
          <Embalagem className="size-full drop-shadow-lg" />
        </div>
      ))}
    </div>
  );
}
