import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"
import { FormEvent, useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import { PostSpecialtyService } from "../service/specialtyService";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'darkgray',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};

export const SpecialtyModal = (props: {open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>, update:()=>Promise<void>}) => {
    const {open, setOpen, update} = props
    const [name, setName] = useState<string>('')

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            nombre: name,
        }
        const response = await PostSpecialtyService(data)
        if (response) {
            setOpen(!open)
            update()
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
            >
                <Box sx={style} >
                    <h2 id="modal-title">New Specialty</h2>
                    <form action="" onSubmit={e => onSubmit(e)} >
                        <FormControl>
                            <InputLabel >Name</InputLabel>
                            <Input type="text" inputProps={{minlength: 5}} onChange={e => setName(e.target.value)} required />
                        </FormControl>
                        <br /><br />
                        <Button type='submit' variant='outlined' ><AddOutlined />Create</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}