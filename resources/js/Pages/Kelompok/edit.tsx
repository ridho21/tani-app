import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import kecamatan from "@/utils/kecamatan";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect } from "react";

export default function KelompokEdit({ auth, kelompok }: PageProps<{
    kelompok: any
}>) {
    const { put, setData, setError, errors, data } = useForm({
        nama: kelompok.nama,
        ketua: kelompok.ketua,
        bendahara: kelompok.bendahara,
        seketaris: kelompok.seketaris,
        alamat_seketariat: kelompok.alamat_seketariat,
        tahun: kelompok.tahun,
        kecamatan : kecamatan[0],
        no_reg : "",
        pendamping : ""
    })

    useEffect(() => {
        console.log(kelompok)
    }, [])



    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        put("/kelompok/" + kelompok.id, {
           
        })
    }

    return (

        <Authenticated user={auth.user}>
            <Head title="Edit Kelompok" />
            <Paper sx={{
                marginInline: 10,
                paddingX: 5,
                paddingY: 2,
                marginTop: 10
            }}>
                <Typography variant="h5">Edit Kelompok</Typography>
                <Box onSubmit={submitData} component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>

                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Kelompok"

                        sx={{
                            width: "50%"
                        }}
                        value={data.nama}
                        onChange={(ev) => {
                            setData("nama", ev.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Ketua"

                        sx={{
                            width: "50%"
                        }}
                        value={data.ketua}
                        onChange={(ev) => {
                            setData("ketua", ev.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Bendahara"

                        sx={{
                            width: "50%"
                        }}
                        value={data.bendahara}
                        onChange={(ev) => {
                            setData("bendahara", ev.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Sekertariat"

                        sx={{
                            width: "50%"
                        }}
                        value={data.seketaris}
                        onChange={(ev) => {
                            setData("seketaris", ev.target.value)
                        }}
                    />

                    <TextField
                        required
                        id="outlined-required"
                        label="Alamat Sekertatis"

                        sx={{
                            width: "50%"
                        }}
                        value={data.alamat_seketariat}
                        onChange={(ev) => {
                            setData("alamat_seketariat", ev.target.value)
                        }}
                    />

                    <FormControl sx={{
                        width :"50%"
                    }} >
                        <InputLabel id="demo-simple-select-label">Kecamatan</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.kecamatan}
                            label="Age"
                            onChange={(ev) => {
                                setData("kecamatan", ev.target.value);
                            }}
                        >
                            {
                                kecamatan.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nomor Registrasi"
                        type="text"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        value={data.no_reg}
                        onChange={(ev) => {
                            setData("no_reg", ev.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Pendamping"
                        type="text"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        value={data.pendamping}
                        onChange={(ev) => {
                            setData("pendamping", ev.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Tahun"
                        type="number"

                        sx={{
                            width: "50%"
                        }}
                        value={data.tahun}
                        onChange={(ev) => {
                            setData("tahun", ev.target.value)
                        }}
                    />

                    <Button variant="contained" type="submit">Edit</Button>

                </Box>
            </Paper>
        </Authenticated>
    )
}