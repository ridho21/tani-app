import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import kecamatan from "@/utils/kecamatan";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";

export default function KelompokCreate({ auth }: PageProps) {

    const { post, setData, setError, errors, data } = useForm({
        nama: "",
        ketua: "",
        bendahara: "",
        seketaris: "",
        alamat_seketariat: "",
        tahun: "",
        kecamatan: kecamatan[0],
        no_reg : "",
        pendamping : ""
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        post("/kelompok", {
            onSuccess: () => {
                console.log("Success")
                router.visit("/kelompok")
            }
        })
    }

    return (
        <Authenticated user={auth.user}>
            <Head title="Buat Kelompok" />
            <Paper sx={{
                marginInline: 10,
                paddingX: 5,
                paddingY: 2,
                marginTop: 10
            }}>
                <Typography variant="h5">Buat Kelompok</Typography>
                <Box onSubmit={submitData} component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>

                    <TextField
                        required
                        id="outlined-required"
                        label="Nama Kelompok"
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
                        required
                        id="outlined-required"
                        label="Nama Ketua"
                        defaultValue=""
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
                        defaultValue=""
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
                        label="Nama Sekertatis"
                        defaultValue=""
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
                        label="Alamat Sekertariat"
                        defaultValue=""
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
                    }}>
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
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        value={data.tahun}
                        onChange={(ev) => {
                            setData("tahun", ev.target.value)
                        }}
                    />

                    <Button type="submit">Submit</Button>

                </Box>
            </Paper>
        </Authenticated>
    )
}