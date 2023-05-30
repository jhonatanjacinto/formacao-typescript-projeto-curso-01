import ExtratoComponent from "./extrato-component.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";

/**
 * Formulário de novas transações.
 */
const formNovaTransacao: HTMLFormElement = document.querySelector(".block-nova-transacao form");

/**
 * Registra o evento submit ao formulário de novas transações que, ao ser enviado, cria uma nova transação e a adiciona ao extrato da aplicação.
 */
formNovaTransacao.addEventListener("submit", (event: Event) => {
    try 
    {
        event.preventDefault();
        if (!formNovaTransacao.checkValidity()) {
            throw new Error("Por favor, preencha todos os campos com dados válidos antes de prosseguir!");
        }
        
        // Inputs do formulário
        const inputTipoTransacao: HTMLSelectElement = formNovaTransacao.querySelector("#tipoTransacao");
        const inputValorTransacao: HTMLInputElement = formNovaTransacao.querySelector("#valor");
        const inputDataTransacao: HTMLInputElement = formNovaTransacao.querySelector("#data");

        // Valores dos inputs
        const tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        const valorTransacao: number = inputValorTransacao.valueAsNumber;
        const dataTransacao: Date = new Date(inputDataTransacao.value + " 00:00:00");

        // Criação do registro da nova transação
        const novaTransacao: Transacao = {
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