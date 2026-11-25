import { PRODUTOS, asset, type ProdutoId } from "@/data/produtos";

/* Silhueta ilustrada, sem nome de produto. Dá lugar ao mockup quando `imagem` for preenchida em produtos.ts. */
export function Embalagem({ id, className = "" }: { id: ProdutoId; className?: string }) {
  const p = PRODUTOS[id];
  if (p.imagem) return <img src={asset(p.imagem)} alt={`Embalagem de ${p.nome}`} className={`object-contain ${className}`} />;
  return <img src={asset(`/products/silhueta-${id}.svg`)} alt={id === "capsulas" ? "Ilustração do frasco de cápsulas" : "Ilustração da bisnaga de gel"} className={`object-contain ${className}`} />;
}

/** Conjunto de 1, 3 ou 5 unidades para a galeria de compra. */
export function Grupo({ ids, qtd, mini = false }: { ids: ProdutoId[]; qtd: number; mini?: boolean }) {
  const kit = ids.length > 1;
  return (
    <div className={`flex size-full items-center justify-center ${kit ? "flex-col" : ""} ${mini ? "p-1.5" : "gap-4 p-8 sm:p-12"}`}>
      {ids.map((id) => (
        <div key={id} className="flex min-h-0 w-full flex-1 items-center justify-center self-stretch">
          {Array.from({ length: qtd }, (_, i) => (
            <div key={i} className="h-full min-w-0" style={{ flex: `0 1 ${kit ? 24 : qtd === 1 ? 60 : qtd === 3 ? 38 : 27}%`, marginInline: qtd > 1 ? "-3%" : 0, zIndex: 5 - Math.abs(i - (qtd - 1) / 2) }}>
              <Embalagem id={id} className="size-full drop-shadow-lg" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
