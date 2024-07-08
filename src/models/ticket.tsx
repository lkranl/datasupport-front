import { ContractGet } from "./contract"
import { SpecialtyGet } from "./specialty"

export type TicketCreate = {
    descripcion: string
    estado: string
    fecha_apertura: string
    contrato: {id_contrato: number}
    especialidad: {id_especialidad: number}
}

export type TicketGet = {
    id_ticket: number
    fecha_apertura: string
    fecha_cierre: string
    estado: string
    contrato: ContractGet
    especialidad: SpecialtyGet
    descripcion: string
}

export type TicketView = {
    id: number
    fecha_apertura: string
    fecha_cierre: string
    horas_contratadas: number
    cliente: string
    contrato: number
    especialidad: string
    estado: string
}

export type TicketStatus = 'open' | 'closed'