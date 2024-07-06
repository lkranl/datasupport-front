import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GetTicketService } from '../service/ticketService';
import { useEffect, useState } from 'react';
import { TicketView } from '../models/ticket';

export const Tickets = () => {
    const [data, setData] = useState<TicketView[]>([])
    const [loading, setLoading] = useState(false)

    const columns:GridColDef[] = [
        {field: 'id', headerName: 'ID', sortable: true, align: 'center', width: 80},
        {field: 'cliente', headerName: 'Client', sortable: true, width: 300},
        {field: 'horas_contratadas', headerName: 'Hours', sortable: true, width: 80},
        {field: 'fecha_inicio', headerName: 'Start date', sortable: true, width: 350},
        {field: 'fecha_fin', headerName: 'End date', sortable: true, width: 350},
    ]

    const updateData = async () => {
        setLoading(true)

        const tmpData = await GetTicketService()
        setData([])
        
        tmpData.map(tmpRow => {
            setData((currentData) => [...currentData, {
                id: tmpRow.id_contrato,
                cliente: tmpRow.cliente.nombre,
                horas_contratadas: tmpRow.horas_contratadas,
                fecha_inicio: tmpRow.fecha_inicio,
                fecha_fin: tmpRow.fecha_fin
            }])
        })
        setLoading(false)
    }

    useEffect(() => {
        updateData()
    },[])
    return(
        <div className='tickets-container'>
            <div className="new-ticket">inputs to create new ticket</div>
            <DataGrid
                rows={data}
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
    )
}