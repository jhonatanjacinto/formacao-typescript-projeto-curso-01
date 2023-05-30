import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
/**
 * Deposita um valor na conta e registra o novo saldo
 * @param valor            Valor a ser depositado.
 */
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}
/**
 * Debita um valor da conta e registra o novo saldo
 * @param valor            Valor a ser debitado.
 **/
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Seu saldo é insuficiente para realizar a operação!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}
/**
 * Objeto que representa a conta bancária do usuário na aplicação e que exporta suas funcionalidades para uso externo.
 */
const Conta = {
    /**
     * Retorna o saldo atual da conta.
     */
    getSaldo() {
        return saldo;
    },
    /**
     * Retorna todas as transações registradas na conta.
     */
    getTransacoes() {
        return structuredClone(transacoes);
    },
    /**
     * Registra uma nova transação na conta.
     * @param transacao             Transação a ser registrada.
     */
    registrarTransacao(transacao) {
        if (transacao.tipo === TipoTransacao.DEPOSITO) {
            depositar(transacao.valor);
        }
        else {
            debitar(transacao.valor);
            transacao.valor *= -1;
        }
        transacoes.push(transacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
