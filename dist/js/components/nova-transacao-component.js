import ExtratoComponent from "./extrato-component.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
/**
 * Formulário de novas transações.
 */
const formNovaTransacao = document.querySelector(".block-nova-transacao form");
/**
 * Registra o evento submit ao formulário de novas transações que, ao ser enviado, cria uma nova transação e a adiciona ao extrato da aplicação.
 */
formNovaTransacao.addEventListener("submit", (event) => {
    try {
        event.preventDefault();
        if (!formNovaTransacao.checkValidity()) {
            throw new Error("Por favor, preencha todos os campos com dados válidos antes de prosseguir!");
        }
        // Inputs do formulário
        const inputTipoTransacao = formNovaTransacao.querySelector("#tipoTransacao");
        const inputValorTransacao = formNovaTransacao.querySelector("#valor");
        const inputDataTransacao = formNovaTransacao.querySelector("#data");
        // Valores dos inputs
        const tipoTransacao = inputTipoTransacao.value;
        const valorTransacao = inputValorTransacao.valueAsNumber;
        const dataTransacao = new Date(inputDataTransacao.value + " 00:00:00");
        // Criação do registro da nova transação
        const novaTransacao = {
            tipo: tipoTransacao,
            valor: valorTransacao,
            data: dataTransacao,
        };
        // Registra a nova transação na Conta e atualiza tanto a visualização do Saldo quanto do Extrato na tela da aplicação.
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        formNovaTransacao.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
