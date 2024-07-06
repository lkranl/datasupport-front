import { ClientTicket } from "./client"

export type TicketCreate = {
    descripcion: string
    estado: string
    fecha_apertura: string
    contrato: {id_contrato: number}
    especialidad: {id_especialidad: number}
}

export type TicketGet = {
    id_contrato: number
    fecha_inicio: string
    fecha_fin: string
    horas_contratadas: number,
    cliente: ClientTicket
}

export type TicketView = {
    id: number
    fecha_inicio: string
    fecha_fin: string
    horas_contratadas: number,
    cliente: ClientTicket
}