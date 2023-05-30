import { TipoTransacao } from "./TipoTransacao.js";

export type Transacao = {
    tipo: TipoTransacao;
    valor: number;
    data: Date;
}