import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function UserEdit({ auth, user }: PageProps<{
    user: any
}>) {

    const { put, setData, setError, errors, data } = useForm({
        name: user.name,
        username: user.username,
        tanggal_lahir : dayjs(user.tanggal_lahir).format('YYYY-MM-DD HH:mm:ss'),
        alamat : user.alamat,
        nomor_identitas : user.nomor_identitas,
        nomor_kontak : user.nomor_kontak
    })

    useEffect(() => {
        console.log(user)
    }, [])



    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        put("/users/" + user.id, {
            onSuccess: () => {
                console.log("Success")
                router.visit("/users")
            }
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Authenticated user={auth.user}>
                <Head title="Edit User" />
                <Paper sx={{
                    marginInline: 10,
                    paddingX: 5,
                    paddingY: 2,
                    marginTop: 10
                }}>
                    <Typography variant="h5">Edit User</Typography>
                    <Box onSubmit={submitData} component={"form"} sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>

                        <TextField
                            required
                            id="outlined-required"
                            label="Nama"

                            sx={{
                                width: "50%"
                            }}
                            value={data.name}
                            onChange={(ev) => {
                                setData("name", ev.target.value)
                            }}
                            error={errors.name != null}
                            helperText={errors.name}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Username"

                            sx={{
                                width: "50%"
                            }}
                            value={data.username}
                            onChange={(ev) => {
                                setData("username", ev.target.value)
                            }}
                            error={errors.username != null}
                            helperText={errors.username}
                        />


                        <TextField
                            required
                            id="outlined-required"
                            label="nomor_identitas"
                            defaultValue=""
                            sx={{
                                width: "50%"
                            }}
                            value={data.nomor_identitas}
                            onChange={(ev) => {
                                setData("nomor_identitas", ev.target.value)
                            }}
                            error={errors.nomor_identitas != null}
                            helperText={errors.nomor_identitas}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="alamat"
                            defaultValue=""
                            sx={{
                                width: "50%"
                            }}
                            value={data.alamat}
                            onChange={(ev) => {
                                setData("alamat", ev.target.value)
                            }}
                            error={errors.alamat != null}
                            helperText={errors.alamat}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Nomor Kontak"
                            defaultValue=""
                            sx={{
                                width: "50%"
                            }}
                            value={data.nomor_kontak}
                            onChange={(ev) => {
                                setData("nomor_kontak", ev.target.value)
                            }}
                            error={errors.nomor_kontak != null}
                            helperText={errors.nomor_kontak}
                        />
                        <DatePicker label="Tanggal Lahir" sx={{
                            width: "50%"
                        }} value={dayjs(data.tanggal_lahir)} onChange={(ev) => {
                            if (ev == null) return
                            setData("tanggal_lahir", ev.format("YYYY-MM-DD HH:mm:ss"))
                        }} />

                        <Button variant="contained" type="submit">Edit</Button>

                    </Box>
                </Paper>
            </Authenticated>
        </LocalizationProvider>

    )
}