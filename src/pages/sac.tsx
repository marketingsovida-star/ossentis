import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, Paperclip, X } from "lucide-react";
import { Footer, Header } from "@/components/ui";
import { SAC_EMAIL, SAC_ENDPOINT } from "@/data/produtos";
import { useHead } from "@/lib/head";

const MOTIVOS = ["Meu pedido não chegou", "Meu pedido veio com erro", "Quero trocar ou devolver", "Dúvida sobre o produto", "Outro assunto"];
const CANAIS = ["E-mail", "WhatsApp", "Ligação telefônica"];
const MAX_ARQUIVOS = 5;
const MAX_TAMANHO = 10 * 1024 * 1024;

const campo = "w-full rounded-lg border border-prof/25 bg-gelo px-3.5 py-2.5 outline-none transition placeholder:text-suave/80 focus:border-vivo focus:bg-white focus:ring-2 focus:ring-vivo/20";
const rotulo = "mb-1 block text-[15px] font-semibold";

const mascaraCpf = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const mascaraFone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  const meio = d.length > 10 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, meio)}${d.length > meio ? `-${d.slice(meio)}` : ""}`;
};

export function SacPage() {
  useHead({ title: "Atendimento | Ossentis", description: "Abra um chamado com o atendimento da Ossentis: pedidos, entrega, trocas e dúvidas sobre os produtos.", path: "/sac" });
  const [cpf, setCpf] = useState("");
  const [fone, setFone] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [feito, setFeito] = useState<"" | "enviado" | "email">("");

  const anexar = (lista: FileList | null) => {
    const novos = Array.from(lista ?? []);
    if (novos.some((f) => f.size > MAX_TAMANHO)) return setErro("Cada arquivo pode ter no máximo 10 MB.");
    if (arquivos.length + novos.length > MAX_ARQUIVOS) return setErro(`Você pode anexar até ${MAX_ARQUIVOS} arquivos.`);
    setErro("");
    setArquivos([...arquivos, ...novos]);
  };

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const assunto = `[SAC Ossentis] ${dados.get("motivo")}: ${dados.get("assunto")}`;
    setErro("");
    if (SAC_ENDPOINT) {
      dados.append("_subject", assunto);
      arquivos.forEach((f, i) => dados.append(`anexo_${i + 1}`, f, f.name));
      setEnviando(true);
      try {
        const r = await fetch(SAC_ENDPOINT, { method: "POST", body: dados, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error();
        setFeito("enviado");
      } catch {
        setErro("Não foi possível enviar seu chamado. Tente novamente em instantes.");
      } finally {
        setEnviando(false);
      }
    } else if (SAC_EMAIL) {
      const corpo = [...dados].map(([k, v]) => `${k}: ${v}`).join("\n") + (arquivos.length ? "\n\n(Anexe os arquivos neste e-mail.)" : "");
      window.location.href = `mailto:${SAC_EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      setFeito("email");
    } else {
      // Nunca simular envio: sem destino configurado, o cliente precisa saber que o chamado não saiu.
      setErro("O atendimento por aqui ainda não está ativo. Seu chamado não foi enviado.");
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1 px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">Como podemos <span className="text-vivo">te ajudar?</span></h1>
          <p className="mx-auto mt-3 max-w-lg text-center text-lg text-suave">Abra um chamado pelo formulário. Nosso time responde pelo canal que você escolher.</p>

          {feito ? (
            <div role="status" className="mt-8 rounded-2xl border border-prof/15 bg-white p-8 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-vivo text-white"><Check /></span>
              <h2 className="mt-4 text-2xl font-bold">{feito === "enviado" ? "Chamado enviado" : "Chamado preparado"}</h2>
              <p className="mx-auto mt-2 max-w-sm text-suave">{feito === "enviado" ? "Recebemos sua mensagem e vamos responder pelo canal escolhido." : `Abrimos o seu e-mail com o chamado preenchido: é só enviar. Se não abriu, escreva para ${SAC_EMAIL}.`}</p>
              <Link to="/" className="brilho mt-6 inline-flex h-12 items-center rounded-md bg-vivo px-7 font-semibold text-white">Voltar ao site</Link>
            </div>
          ) : (
            <form onSubmit={enviar} className="mt-8 grid gap-4 rounded-2xl border border-prof/15 bg-white p-5 shadow-xl shadow-prof/5 sm:grid-cols-2 sm:p-8">
              <label><span className={rotulo}>E-mail *</span><input name="email" type="email" required autoComplete="email" placeholder="seu@email.com" className={campo} /></label>
              <label><span className={rotulo}>Motivo do contato *</span>
                <select name="motivo" required defaultValue="" className={campo}><option value="" disabled>Selecione um motivo</option>{MOTIVOS.map((m) => <option key={m}>{m}</option>)}</select>
              </label>
              <label><span className={rotulo}>Nome completo *</span><input name="nome" required autoComplete="name" placeholder="Como consta no pedido" className={campo} /></label>
              <label><span className={rotulo}>CPF</span><input name="cpf" inputMode="numeric" value={cpf} onChange={(e) => setCpf(mascaraCpf(e.target.value))} placeholder="000.000.000-00" className={campo} /></label>
              <label><span className={rotulo}>Telefone</span><input name="telefone" type="tel" autoComplete="tel" value={fone} onChange={(e) => setFone(mascaraFone(e.target.value))} placeholder="(00) 00000-0000" className={campo} /></label>
              <label><span className={rotulo}>Assunto *</span><input name="assunto" required placeholder="Resuma o motivo do contato" className={campo} /></label>
              <label className="sm:col-span-2"><span className={rotulo}>Descrição *</span><textarea name="descricao" required minLength={5} rows={4} placeholder="Conte com detalhes o que aconteceu." className={campo} /></label>
              <fieldset className="sm:col-span-2">
                <legend className={rotulo}>Como prefere receber o retorno *</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {CANAIS.map((c, i) => (
                    <label key={c} className="cursor-pointer rounded-lg border border-prof/25 px-4 py-2.5 text-center font-semibold transition-colors hover:border-vivo has-checked:border-vivo has-checked:bg-vivo has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-vivo has-focus-visible:ring-offset-2">
                      <input type="radio" name="retorno" value={c} defaultChecked={i === 0} className="sr-only" />{c}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-prof/35 px-4 py-3 text-center transition-colors hover:border-vivo has-focus-visible:border-vivo">
                  <Paperclip className="size-4 shrink-0" aria-hidden /> Anexar arquivos (até 5, 10 MB cada)
                  <input type="file" multiple accept="image/*,.pdf" className="sr-only" onChange={(e) => { anexar(e.target.files); e.target.value = ""; }} />
                </label>
                {arquivos.map((f, i) => (
                  <p key={i} className="mt-2 flex items-center justify-between gap-3 rounded-lg bg-bruma px-3 py-1.5 text-[15px]">
                    <span className="truncate">{f.name}</span>
                    <button type="button" aria-label={`Remover ${f.name}`} onClick={() => setArquivos(arquivos.filter((_, j) => j !== i))}><X className="size-4" /></button>
                  </p>
                ))}
              </div>
              {erro && <p role="alert" className="rounded-lg bg-[#fdecea] px-4 py-3 text-[#8f1d14] sm:col-span-2">{erro}</p>}
              <button disabled={enviando} className="brilho h-14 rounded-md bg-vivo text-lg font-semibold text-white disabled:opacity-60 sm:col-span-2">{enviando ? "Enviando..." : "Abrir chamado"}</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
