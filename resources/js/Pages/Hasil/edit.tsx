import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useRef } from "react";
export default function KelompokCreate({ auth, kelompok, hasil }: PageProps<{
    kelompok: any,
    hasil: any
}>) {
    const ref = useRef<HTMLInputElement>(null)
    const { post, setData, setError, errors, data } = useForm<{
        nama: string,
        jumlah: number,
        image: null | File | string
    }>({
        nama: hasil.nama,
        jumlah: hasil.jumlah,
        image: hasil.image
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('jumlah', data.jumlah + "");
        if (data.image != null) {
            if (typeof (data.image) != 'string') {
                formData.append('gambar', data.image)
            }
        }


        router.post(`/kelompok/${kelompok.id}/hasil/${hasil.id}`, formData, {

            onError: (er) => {
                console.log(er)
            }
        })
    }

    const handleFileChange = (e: any) => {
        setData('image', e.target.files[0]);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Edit Hasil Tani" />
            <Paper sx={{
                marginInline: 10,
                paddingX: 5,
                paddingY: 2,
                marginTop: 10
            }}>
                <Typography variant="h5">Edit Hasil Tani</Typography>
                <Box onSubmit={submitData} component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>

                    <TextField
                        required
                        id="outlined-required"
                        label="Nama"
                        defaultValue=""
                        sx={{
                            width: "50%"
                        }}
                        value={data.nama}
                        onChange={(ev) => {
                            setData("nama", ev.target.value)
                        }}
                    />
                    <Box sx={{
                        display :"flex",
                        alignItems :"center",
                        gap : 1
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Jumlah"
                            type="number"
                            sx={{
                                width: "50%"
                            }}
                            value={data.jumlah}
                            onChange={(ev) => {
                                setData("jumlah", parseInt(ev.target.value))
                            }}
                        />
                        <p style={{
                            fontWeight :"bold",
                            fontSize : 15
                        }}>Ton</p>
                    </Box>
                    {
                        data.image != null && <img src={typeof (data.image) == "string" ? "/storage/" + data.image : URL.createObjectURL(data.image)} style={{
                            width: "300px",
                            height: "300px",

                        }} />
                    }
                    <Button variant="contained" sx={{
                        width: "50%"
                    }} onClick={() => {
                        ref.current?.click()
                    }} >Upload Gambar</Button>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={ref}
                        style={{
                            display: "none"
                        }}
                    />

                    <Button type="submit">Submit</Button>

                </Box>
            </Paper>
        </Authenticated>
    )
}