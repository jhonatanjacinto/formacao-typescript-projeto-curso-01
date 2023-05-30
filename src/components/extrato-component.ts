import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";

/**
 * Elemento HTML que exibe o registro de transações na tela da aplicação.
 */
const registroTransacoesExtratoElement: HTMLElement = document.querySelector(".extrato .registro-transacoes") as HTMLElement;

/**
 * Agrupa as transações por mês e ano.
 * @returns                 Array de objetos que representam os grupos de transações realizadas pelo usuário.
 */
function agruparTransacoes(): GrupoTransacao[]
{
    const gruposTransacoes: GrupoTransacao[] = [];
    const transacoes: Transacao[] = Conta.getTransacoes();
    const transacoesOrdenadas: Transacao[] = transacoes.sort((a, b) => b.data.getTime() - a.data.getTime());
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
        const labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
        if (labelGrupoTransacao !== labelAtualGrupoTransacao) {
            labelAtualGrupoTransacao = labelGrupoTransacao;
            gruposTransacoes.push({
                label: labelGrupoTransacao,
                transacoes: [],
            });
        }
        gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
    }

    

    return gruposTransacoes;
}

/**
 * Renderiza as transações realizadas pelo usuário na tela da aplicação.
 */
renderizarExtrato();
function renderizarExtrato(): void 
{
    const gruposTransacoes: GrupoTransacao[] = agruparTransacoes();
    registroTransacoesExtratoElement.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacao: string = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacao += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipo}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacao}
            </div>
        `;
    }

    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = `<div>Não há transações registradas.</div>`;
    }

    registroTransacoesExtratoElement.innerHTML = htmlRegistroTransacoes;
}

/**
 * Objeto que representa o componente visual de extrato na aplicação e que exporta suas funcionalidades para uso externo.
 */
const ExtratoComponent = {
    /**
     * Atualiza a visualização do extrato na tela da aplicação.
     */
    atualizar(): void {
        renderizarExtrato();
    },
};

export default ExtratoComponent;