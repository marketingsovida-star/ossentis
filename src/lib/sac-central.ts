/* SAC central (repo pharma-backend, função `sac`): grava o chamado no banco e avisa a equipe por e-mail. */
const SAC_URL = "https://ewxxdtickxiqkjqthodq.supabase.co/functions/v1/sac";
const FALHA = "Não foi possível enviar seu chamado. Tente novamente em instantes.";

export type ChamadoSac = {
  email: string;
  motivo: string;
  nome: string;
  cpf?: string;
  telefone?: string;
  assunto: string;
  descricao: string;
  retorno: string;
};

/** Lança Error com mensagem pronta para o cliente; só retorna quando o chamado foi gravado de verdade. */
export async function enviarChamadoSac(marca: string, chamado: ChamadoSac, anexos: File[] = []): Promise<void> {
  if (anexos.length > 5 || anexos.some((a) => a.size > 10 * 1024 * 1024)) {
    throw new Error("Anexe até 5 arquivos, com no máximo 10 MB cada.");
  }
  const corpo = new FormData();
  corpo.append("marca", marca);
  for (const [campo, valor] of Object.entries(chamado)) corpo.append(campo, valor ?? "");
  for (const a of anexos) corpo.append("anexos", a, a.name);

  let resposta: Response;
  try {
    resposta = await fetch(SAC_URL, { method: "POST", body: corpo });
  } catch {
    throw new Error(FALHA);
  }
  const dados = (await resposta.json().catch(() => null)) as { ok?: boolean; erro?: unknown } | null;
  if (!resposta.ok || !dados?.ok) throw new Error(typeof dados?.erro === "string" ? dados.erro : FALHA);
}

/** Texto de um campo do formulário, pelo name ou id. */
export function campoSac(form: HTMLFormElement, nome: string): string {
  const el = form.elements.namedItem(nome);
  return el && "value" in el ? String(el.value).trim() : "";
}
