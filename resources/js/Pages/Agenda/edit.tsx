import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FormEvent, useEffect } from "react";

export default function AgendaEdit({ auth, agenda, kelompok }: PageProps<{
    auth: any,
    agenda: any,
    kelompok: any
}>) {

    const { put, setData, setError, errors, data } = useForm({
        nama: agenda.nama,
        detail_agenda: agenda.detail_agenda,
        tanggal: dayjs(agenda.tanggal).format('YYYY-MM-DD HH:mm:ss')

    })

    useEffect(() => {
        console.log(auth)
        console.log(agenda)
    }, [])

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        put(`/kelompok/${kelompok.id}/agenda/` + agenda.id, {
            onSuccess: () => {
                console.log("Success")
            }
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Authenticated user={auth.user}>
                <Head title="Edit agenda" />
                <Paper sx={{
                    marginInline: 10,
                    paddingX: 5,
                    paddingY: 2,
                    marginTop: 10
                }}>
                    <Typography variant="h5">Edit agenda</Typography>
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
                            if (ev == null) return
                            setData("tanggal", ev.format("YYYY-MM-DD HH:mm:ss"))
                        }} />


                        <Button variant="contained" type="submit">Edit</Button>

                    </Box>
                </Paper>
            </Authenticated>
        </LocalizationProvider>

    )
}