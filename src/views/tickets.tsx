import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GetTicketService } from '../service/ticketService';
import { useEffect, useState } from 'react';
import { TicketView } from '../models/ticket';

export const Tickets = () => {
    const [data, setData] = useState<TicketView[]>([])

    const columns:GridColDef[] = [
        {field: 'id', headerName: 'ID', sortable: true},
        {field: 'cliente', headerName: 'Client', sortable: true},
        {field: 'horas_contratadas', headerName: 'Hours', sortable: false},
        {field: 'fecha_inicio', headerName: 'Start date', sortable: true},
        {field: 'fecha_fin', headerName: 'End date', sortable: true},
    ]

    const updateData = async () => {
        setData([])
        const tmpData = await GetTicketService()
        tmpData.map(tmpRow => {
            setData((currentData) => [...currentData, {
                id: tmpRow.id_contrato,
                ...tmpRow
            }])
        })
    }

    useEffect(() => {
        updateData()
    },[])
    return(
        <>
            <div className="new-ticket">inputs to create new ticket</div>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
            />
        </>
    )
}