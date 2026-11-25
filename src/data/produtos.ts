/* ---------- Ossentis: produtos, marca e contato ---------- */

// TODO: domínio definitivo.
export const BASE_URL = "https://marketingsovida-star.github.io/ossentis";
export const asset = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}`;

export type Item = { nome: string; qtd: string; nota?: string };
export type ProdutoId = "capsulas" | "gel";

/** Preço e link vazios = "Em breve". */
export type Opcao = { qtd: 1 | 3 | 5; label: string; preco?: string; parcela?: string; economia?: string; selo?: string; link?: string };
const opcoes = (um: string, varios: string): Opcao[] => [
  { qtd: 1, label: "1 " + um },
  { qtd: 3, label: "3 " + varios, selo: "Mais vendido" },
  { qtd: 5, label: "5 " + varios, selo: "Melhor escolha" },
];

export type Produto = {
  id: ProdutoId;
  slug: string;
  nome: string;
  via: string;
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

export const PRODUTOS: Record<ProdutoId, Produto> = {
  capsulas: {
    id: "capsulas",
    slug: "/saude-ossea-articular",
    // TODO: nome provisório (descreve a linha) até a definição do nome comercial.
    nome: "Saúde Óssea e Articular",
    via: "Por dentro",
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
  },
  gel: {
    id: "gel",
    slug: "/gel-de-alivio",
    nome: "Gel de Alívio",
    via: "Por fora",
    chamada: "Frescor instantâneo, leveza que dura.",
    descricao:
      "Arnica, mentol, castanha da Índia, picnogenol e nano cafeína em uma textura leve, de rápida absorção. Para o cuidado diário de pernas e corpo.",
    destaques: [
      "Sensação imediata de frescor e alívio",
      "Textura leve, não gruda e absorve rápido",
      "Ajuda a desinchar e a tonificar a pele",
      "Para depois de um dia longo em pé ou sentado",
    ],
    ficha: [["Forma", "Gel"], ["Conteúdo", "150 g"], ["Rendimento", "150 aplicações"]],
    opcoes: opcoes("bisnaga", "bisnagas"),
    paraQuem: "Para o uso diário de quem sente as pernas cansadas ou passa muitas horas na mesma posição.",
    modoUso: "Aplicar sobre a pele limpa, com movimentos suaves, até a completa absorção.",
    composicaoTitulo: "Composição",
    composicao: [
      { nome: "Arnica", qtd: "10%" },
      { nome: "Semente de uva", qtd: "3,5%" },
      { nome: "Tintura de picnogenol", qtd: "3%" },
      { nome: "Castanha da Índia", qtd: "2%" },
      { nome: "Nano cafeína", qtd: "1,5%" },
      { nome: "Vitamina E", qtd: "0,5%" },
      { nome: "Alfa bisabolol", qtd: "0,5%" },
      { nome: "Mentol", qtd: "0,3%" },
      { nome: "Gel base", qtd: "q.s.p." },
    ],
    aviso:
      "Uso externo. Não aplicar sobre feridas, mucosas ou pele irritada. Em caso de sensibilidade, suspenda o uso e procure orientação profissional. Manter fora do alcance de crianças.",
  },
};

export const KIT_OPCOES = opcoes("kit", "kits");

export const FAQ: [string, string][] = [
  ["Qual a diferença entre os dois produtos?", "As cápsulas são um suplemento de uso oral com oito ativos. O gel é de uso externo, aplicado sobre a pele. São dois caminhos diferentes para a mesma rotina."],
  ["Posso usar as cápsulas e o gel juntos?", "Um é de uso oral e o outro de uso externo, e eles podem fazer parte da mesma rotina. Se você usa medicamentos ou faz algum tratamento, converse antes com o seu médico."],
  ["Como tomar as cápsulas?", "A recomendação é de 2 cápsulas ao dia. O frasco com 60 cápsulas dura um mês."],
  ["Como aplicar o gel?", "Sobre a pele limpa, com movimentos suaves, até absorver por completo. Não aplique em feridas, mucosas ou pele irritada."],
  ["Quem não deve usar as cápsulas?", "Gestantes, lactantes e crianças. Quem usa medicamentos, principalmente anticoagulantes, deve consultar um profissional de saúde antes."],
  ["Substitui o acompanhamento médico?", "Não. Os produtos Ossentis fazem parte de uma rotina de cuidado e não substituem diagnóstico, consulta ou tratamento."],
];
