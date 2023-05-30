import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
/**
 * Elementos HTML que exibe o saldo atual da conta na tela e que exibe
 * a data atual de acesso à aplicação pelo usuário.
 */
const valorSaldoElement = document.querySelector(".block-saldo .saldo-valor .valor");
const dataAcessoElement = document.querySelector(".block-saldo time");
/**
 * Renderiza a data atual de acesso à aplicação pelo usuário.
 */
const dataAtual = new Date();
dataAcessoElement.innerHTML = formatarData(dataAtual, FormatoData.DIA_SEMANA_DIA_MES_ANO);
/**
 * Renderiza o saldo atual da conta na tela da aplicação.
 */
renderizarSaldo();
function renderizarSaldo() {
    valorSaldoElement.innerHTML = formatarMoeda(Conta.getSaldo());
}
/**
 * Objeto que representa o componente visual de Saldo da aplicação e que exporta suas funcionalidades para uso externo.
 */
const SaldoComponent = {
    /**
     * Atualiza o saldo na tela da aplicação.
     */
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
