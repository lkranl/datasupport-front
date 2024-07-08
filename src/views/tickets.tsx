import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GetTicketService, PostTicketService } from '../service/ticketService';
import { FormEvent, useEffect, useState } from 'react';
import { TicketView } from '../models/ticket';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ContractGet } from '../models/contract';
import { GetContractService } from '../service/contractService';
import { AddOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ContractModal } from './contract';
import { GetSpecialtyService } from '../service/specialtyService';
import { SpecialtyGet } from '../models/specialty';
import { SpecialtyModal } from './specialty';

export const Tickets = () => {
    const [rows, setRows] = useState<TicketView[]>([])
    const [loading, setLoading] = useState(false)
    const [newCon, setNewCon] = useState(false)
    const [newSpe, setNewSpe] = useState(false)
    const [contracts, setContracts] = useState<ContractGet[]>([])
    const [specialties, setSpecialties] = useState<SpecialtyGet[]>([])
    const [description, setDescription] = useState('')
    const [contract, setContract] = useState<number>(Number(''))
    const [specialty, setSpecialty] = useState<number>(Number(''))

    const columns:GridColDef[] = [
        {field: 'id', headerName: 'ID', sortable: true, align: 'center', width: 80},
        {field: 'cliente', headerName: 'Client', sortable: true, width: 150},
        {field: 'contrato', headerName: 'Contract ID', sortable: true, align: 'center', width: 100},
        {field: 'horas_contratadas', headerName: 'Hours', sortable: true, width: 80},
        {field: 'especialidad', headerName: 'Specialty', sortable: true, width: 100},
        {field: 'fecha_apertura', headerName: 'Start date', sortable: true, width: 160},
        {field: 'fecha_cierre', headerName: 'End date', sortable: true, width: 160},
        {field: 'estado', headerName: 'Status', sortable: true, width: 80},
    ]

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            descripcion: description,
            estado: 'open',
            fecha_apertura: new Date().toISOString(),
            contrato: {id_contrato: contract as number},
            especialidad: {id_especialidad: specialty as number}
        }

        const response = await PostTicketService(data)
        if (response)
            updateData()
    }

    const updateData = async () => {
        setLoading(true)

        const tmpData = await GetTicketService()
        setRows([])
        
        tmpData.map(tmpRow => setRows((currentData) => [...currentData, {
                id: tmpRow.id_ticket,
                cliente: tmpRow.contrato.cliente.nombre,
                contrato: tmpRow.contrato.id_contrato,
                horas_contratadas: tmpRow.contrato.horas_contratadas,
                especialidad: tmpRow.especialidad.nombre,
                fecha_apertura: tmpRow.fecha_apertura.split('.',1)[0],
                fecha_cierre: tmpRow.fecha_cierre?.split('.',1)[0],
                estado: tmpRow.estado
            }])
        )

        const tmpContracts = await GetContractService()
        setContracts(tmpContracts)
        const tmpSpecialties = await GetSpecialtyService()
        setSpecialties(tmpSpecialties)
        setLoading(false)
    }

    useEffect(() => {
        updateData()
    },[])
    return(
        <>
            <div className="new-ticket">
                    <h3>New ticket: &emsp;</h3>
                <form action="" onSubmit={e => onSubmit(e)}>
                    <FormControl >
                        <InputLabel htmlFor='description' >Description</InputLabel>
                        <Input id='description' type='text' onChange={e => setDescription(e.target.value)} required />
                    </FormControl>
                    &emsp;
                    <FormControl >
                        <InputLabel id='contract-label' htmlFor='contract' >Contract</InputLabel>
                        <Select
                            sx={{minWidth: '120px'}}
                            labelId='contract-label'
                            id='contract' value={contract}
                            onChange={e=>setContract((e.target.value as number))}
                            required
                        >
                            {contracts.map(val => <MenuItem value={val.id_contrato} >{val.id_contrato} | {val.cliente.nombre} | {val.horas_contratadas} </MenuItem>)}
                        </Select>
                    </FormControl>
                    <Link to={''} onClick={() => setNewCon(!newCon)} ><AddOutlined /></Link>
                    &emsp;
                    <FormControl >
                        <InputLabel id='specialty-label' htmlFor='specialty' >Specialty</InputLabel>
                        <Select
                            sx={{minWidth: '120px'}}
                            labelId='specialty-label'
                            id='specialty' value={specialty}
                            onChange={e=>setSpecialty((e.target.value as number))}
                            required
                        >
                            {specialties.map(val => <MenuItem value={val.id_especialidad} >{val.id_especialidad} | {val.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Link to={''} onClick={() => setNewSpe(!newSpe)} ><AddOutlined /></Link>
                    &emsp;
                    <Button type='submit' variant='outlined' ><AddOutlined />Create</Button>
                </form>
            </div>
            <div className='tickets-container'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    disableColumnResize
                />
            </div>
            <ContractModal open={newCon} setOpen={setNewCon} update={updateData} />
            <SpecialtyModal open={newSpe} setOpen={setNewSpe} update={updateData} />
        </>
    )
}