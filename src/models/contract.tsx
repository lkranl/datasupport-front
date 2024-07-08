import { ClientTicket } from "./client"

export type ContractCreate = {
    fecha_inicio: string
    horas_contratadas: number
    cliente: {id_cliente: number}
}

export type ContractGet = {
    id_contrato: number
    fecha_inicio: string
    fecha_fin: string
    horas_contratadas: number
    cliente: ClientTicket
}