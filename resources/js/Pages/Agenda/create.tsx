import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";

export default function KelompokCreate({ auth, kelompok }: PageProps<{
    kelompok: any
}>) {

    const { post, setData, setError, errors, data } = useForm({
        nama: "",
        detail_agenda: "",
        tanggal: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        console.log(data)

       

        post(`/kelompok/${kelompok.id}/agenda`, {
            
            onSuccess: () => {
                console.log("Success")
            },
            onError: (err) => {
                console.log(err)
            }
            
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Authenticated user={auth.user}>
                <Head title="Buat agenda" />
                <Paper sx={{
                    marginInline: 10,
                    paddingX: 5,
                    paddingY: 2,
                    marginTop: 10
                }}>
                    <Typography variant="h5">Buat agenda</Typography>
                    <Box onSubmit={submitData} component={"form"} sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>

                        <TextField
                            required
                            id="outlined-required"
                            label="Judul"
                            defaultValue=""
                            sx={{
                                width: "50%"
                            }}
                            value={data.nama}
                            onChange={(ev) => {
                                setData("nama", ev.target.value)
                            }}
                        />
                        <TextField
                            multiline={true}
                            required
                            id="outlined-required"
                            label="Isi"
                            type="number"
                            sx={{
                                width: "100%"
                            }}
                            value={data.detail_agenda}
                            onChange={(ev) => {
                                setData("detail_agenda", ev.target.value)
                            }}
                        />
                        <DatePicker value={dayjs(data.tanggal)} onChange={(ev) => {
                            if(ev == null) return
                            setData("tanggal", ev.format("YYYY-MM-DD HH:mm:ss"))
                        }} />
                       

                        <Button type="submit">Submit</Button>

                    </Box>
                </Paper>
            </Authenticated>
        </LocalizationProvider>

    )
}