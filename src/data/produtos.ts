/* ---------- Ossentis: produtos, marca e contato ---------- */

// TODO: domínio definitivo.
export const BASE_URL = "https://marketingsovida-star.github.io/ossentis";
export const asset = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}`;

export type Item = { nome: string; qtd: string; nota?: string };

/** Preço e link vazios = "Em breve". */
export type Opcao = { qtd: 1 | 3 | 5; label: string; preco?: string; parcela?: string; economia?: string; selo?: string; link?: string };
const opcoes = (um: string, varios: string): Opcao[] => [
  { qtd: 1, label: "1 " + um },
  { qtd: 3, label: "3 " + varios, selo: "Mais vendido" },
  { qtd: 5, label: "5 " + varios, selo: "Melhor escolha" },
];

export type Produto = {
  nome: string;
  chamada: string;
  descricao: string;
  destaques: string[];
  ficha: [string, string][];
  paraQuem: string;
  modoUso: string;
  composicaoTitulo: string;
  composicao: Item[];
  aviso: string;
  /** Mockup da embalagem em /public. Vazio = mostra a silhueta ilustrada. */
  imagem?: string;
  opcoes: Opcao[];
};

export const PRODUTO: Produto = {
  // TODO: nome provisório (descreve a linha) até a definição do nome comercial.
  nome: "Saúde Óssea e Articular",
  chamada: "Oito ativos para ossos, cartilagens e articulações.",
  descricao:
    "Colágeno tipo II, ácido hialurônico, MSM e cúrcuma ao lado do magnésio e das vitaminas C, D e K2. Uma única fórmula em cápsulas para acompanhar a sua rotina.",
  destaques: [
    "Vitamina C, que auxilia na formação do colágeno",
    "Vitamina D, que auxilia na absorção do cálcio",
    "Vitamina K, que auxilia na manutenção dos ossos",
    "Magnésio, que auxilia no funcionamento muscular",
  ],
  ficha: [["Forma", "Cápsulas"], ["Conteúdo", "60 cápsulas"], ["Porção", "2 cápsulas ao dia"]],
  opcoes: opcoes("frasco", "frascos"),
  paraQuem: "Adultos a partir de 19 anos que querem incluir o cuidado com ossos e articulações no dia a dia.",
  modoUso: "Ingerir 2 cápsulas ao dia, ou conforme orientação profissional.",
  composicaoTitulo: "Em cada porção de 2 cápsulas",
  composicao: [
    { nome: "Colágeno tipo II não desnaturado", qtd: "1,6 mg", nota: "O colágeno próprio da cartilagem, com a estrutura preservada." },
    { nome: "Ácido hialurônico", qtd: "50 mg", nota: "Presente naturalmente no líquido que lubrifica as articulações." },
    { nome: "MSM", qtd: "100 mg", nota: "Fonte de enxofre orgânico, mineral que compõe o tecido conectivo." },
    { nome: "Curcumina", qtd: "130 mg", nota: "Extraída dos rizomas da Curcuma longa, rica em curcuminoides." },
    { nome: "Magnésio", qtd: "63 mg", nota: "Auxilia na formação de ossos e no funcionamento muscular." },
    { nome: "Vitamina C", qtd: "100 mg", nota: "Auxilia na formação do colágeno." },
    { nome: "Vitamina D", qtd: "50 mcg", nota: "Auxilia na formação de ossos e na absorção de cálcio e fósforo." },
    { nome: "Vitamina K2 (MK-7)", qtd: "120 mcg", nota: "Auxilia na manutenção dos ossos." },
  ],
  aviso:
    "Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem. Não deve ser consumido por gestantes, lactantes e crianças. Quem usa medicamentos, principalmente anticoagulantes, deve consultar um profissional de saúde antes do uso. Alérgicos: pode conter derivados de soja, peixe, crustáceos (caranguejo), amendoim, amêndoa, avelã, castanha de caju, castanha-do-brasil, macadâmias, nozes, pistache e castanhas. Não contém glúten.",
};

export const FAQ: [string, string][] = [
  ["Para que serve?", "É um suplemento alimentar que reúne oito ativos ligados ao cuidado com ossos, cartilagens, articulações e músculos, em uma única fórmula."],
  ["Como tomar?", "A recomendação é de 2 cápsulas ao dia, ou conforme orientação profissional."],
  ["Quanto tempo dura um frasco?", "Cada frasco tem 60 cápsulas. Com 2 cápsulas ao dia, dura 30 dias."],
  ["Quem não deve usar?", "Gestantes, lactantes e crianças. Quem usa medicamentos, principalmente anticoagulantes, deve consultar um profissional de saúde antes."],
  ["Substitui o acompanhamento médico?", "Não. A fórmula faz parte de uma rotina de cuidado e não substitui diagnóstico, consulta ou tratamento."],
];
