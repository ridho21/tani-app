import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import kecamatan from "@/utils/kecamatan";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect } from "react";

export default function KelompokCreate({ auth, kelompok }: PageProps<{
    kelompok: {
        id: number,
        nama: string,
        ketua: string,
        seketaris: string,
        bendahara: string,
        alamat_seketariat: string,
        tahun: string,
        kecamatan: string,
        users_count: number,
        no_reg: string,
        pendamping: string,
        tanaman_pangan: {
            jagung: number,
            padi_irigasi: number,
            padi_tadah_hujan: number
        },
        tanaman_hortikultura: {
            buah: number,
            sayuran: number,

        },
        tanaman_perkebunan: {
            luas: number
        },
        ternak: {
            unggas: number,
            besar: number,
            kecil: number
        },


    }
}>) {

    const { put, setData, setError, errors, data } = useForm({
        padi_irigasi: kelompok.tanaman_pangan.padi_irigasi,
        padi_tadah_hujan: kelompok.tanaman_pangan.padi_tadah_hujan,
        jagung: kelompok.tanaman_pangan.jagung,
        luas: kelompok.tanaman_perkebunan.luas,
        sayuran: kelompok.tanaman_hortikultura.sayuran,
        buah: kelompok.tanaman_hortikultura.buah,
        besar: kelompok.ternak.besar,
        kecil: kelompok.ternak.kecil,
        unggas: kelompok.ternak.unggas,

    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        put(`/kelompok/${kelompok.id}/luas`, {
            onSuccess: () => {
                console.log("Success")
                router.visit("/kelompok")
            }
        })
    }

    useEffect(() => {
        console.log(kelompok)
    }, [])

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

                    <Typography variant="h6">Tanaman Pangan</Typography>

                    <TextField
                        required
                        id="outlined-required"
                        label="Padi Irigasi"
                        defaultValue={0}
                        sx={{
                            width: "50%"
                        }}
                        type="number"
                        value={data.padi_irigasi}
                        onChange={(ev) => {
                            setData("padi_irigasi", parseFloat(ev.target.value))
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Padi Tadah Hujan"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.padi_tadah_hujan}
                        onChange={(ev) => {
                            setData("padi_tadah_hujan", parseFloat(ev.target.value))
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Jagung"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.jagung}
                        onChange={(ev) => {
                            setData("jagung", parseFloat(ev.target.value))
                        }}
                    />

                    <Typography variant="h6" sx={{
                        marginTop: 5
                    }}>Tanaman Perkebunan</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Luas"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.luas}
                        onChange={(ev) => {
                            setData("luas", parseFloat(ev.target.value))
                        }}
                    />
                    <Typography variant="h6" sx={{
                        marginTop: 5
                    }}>Tanaman Hortikultura</Typography>

                    <TextField
                        required
                        id="outlined-required"
                        label="Sayuran"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.sayuran}
                        onChange={(ev) => {
                            setData("sayuran", parseFloat(ev.target.value))
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Buah-buahan"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.buah}
                        onChange={(ev) => {
                            setData("buah", parseFloat(ev.target.value))
                        }}
                    />
                    <Typography variant="h6" sx={{
                        marginTop: 5
                    }}>Ternak</Typography>

                    <TextField
                        required
                        id="outlined-required"
                        label="Besar"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.besar}
                        onChange={(ev) => {
                            setData("besar", parseFloat(ev.target.value))
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Kecil"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.kecil}
                        onChange={(ev) => {
                            setData("kecil", parseFloat(ev.target.value))
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Unggas"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        type="number"

                        value={data.unggas}
                        onChange={(ev) => {
                            setData("unggas", parseFloat(ev.target.value))
                        }}
                    />

                    <Button type="submit">Submit</Button>

                </Box>
            </Paper>
        </Authenticated>
    )
}