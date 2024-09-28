import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useRef } from "react";
export default function KelompokCreate({ auth, kelompok }: PageProps<{
    kelompok: any
}>) {
    const ref = useRef<HTMLInputElement>(null)
    const { post, setData, setError, errors, data } = useForm<{
        nama: string,
        jumlah: number,
        image: null | File
    }>({
        nama: "",
        jumlah: 0,
        image: null
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('jumlah', data.jumlah + "");
        if (data.image == null) {
            return;
        }
        formData.append('gambar', data.image)

        
        router.post(`/kelompok/${kelompok.id}/hasil`, formData, {
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    const handleFileChange = (e : any) => {
        setData('image', e.target.files[0]);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Buat Hasil Tani" />
            <Paper sx={{
                marginInline: 10,
                paddingX: 5,
                paddingY: 2,
                marginTop: 10
            }}>
                <Typography variant="h5">Buat Hasil Tani</Typography>
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
                        data.image != null && <img src={URL.createObjectURL(data.image)} style={{
                            width : "300px",
                            height :"300px",

                        }} />
                    }
                    <Button variant="contained" sx={{
                        width :"50%"
                    }} onClick={() => {
                        ref.current?.click()
                    }} >Upload Gambar</Button>
                    
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={ref}
                        style={{
                            display :"none"
                        }}
                    />

                    <Button type="submit">Submit</Button>

                </Box>
            </Paper>
        </Authenticated>
    )
}