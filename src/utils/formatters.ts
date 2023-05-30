import { FormatoData } from "../types/FormatoData.js";

/**
 * Formata um valor para o padrão de moeda brasileiro.
 * @param valor         Valor a ser formatado.
 * @returns             Formata o valor para o padrão de moeda brasileiro.
 */
export function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

/**
 * Formata uma data para o padrão brasileiro.
 * @param data              Data a ser formatada.
 * @param formato           Formato da data a ser retornado.   
 * @returns                 Formata a data para o padrão brasileiro.
 */
export function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
    if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    } else if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-br", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
    }

    return data.toLocaleDateString("pt-br");
}