import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"
import { FormEvent, useEffect, useState } from "react";
import { ClientTicket } from "../models/client";
import { GetClientService } from "../service/clientService";
import { AddOutlined } from "@mui/icons-material";
import { PostContractService } from "../service/contractService";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '80%',
  bgcolor: 'darkgray',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};

export const ContractModal = (props: {open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>, update:()=>Promise<void>}) => {
    const {open, setOpen, update} = props
    const [clients, setClients] = useState<ClientTicket[]>([])
    const [hours, setHours] = useState<number>(Number(''))
    const [client, setClient] = useState<number>(Number(''))

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            fecha_inicio: new Date().toISOString(),
            horas_contratadas: hours,
            cliente: {id_cliente: client}
        }
        const response = await PostContractService(data)
        if (response) {
            setOpen(!open)
            update()
        }
    }

    const updateData = async () => {
        const tmpClients = await GetClientService()
        setClients(tmpClients)
    }
    useEffect(() => {
        updateData()
    },[])
    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
            >
                <Box sx={style} >
                    <h2 id="modal-title">New Contract</h2>
                    <form action="" onSubmit={e => onSubmit(e)} >
                        <FormControl>
                            <InputLabel >Contracted hours</InputLabel>
                            <Input type="number" inputProps={{min: 1}} onChange={e => setHours(Number(e.target.value))} required />
                        </FormControl>
                        <br /><br />
                        <FormControl >
                            <InputLabel id='clients-label' htmlFor='client' >Client</InputLabel>
                            <Select
                                sx={{width: '150px'}}
                                labelId='client-label'
                                id='client' value={client}
                                onChange={e=>setClient(e.target.value as number)}
                                required
                            >
                                {clients.map(val => <MenuItem value={val.id_cliente} >{val.id_cliente} | {val.nombre}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <br /><br />
                        <Button type='submit' variant='outlined' ><AddOutlined />Create</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}