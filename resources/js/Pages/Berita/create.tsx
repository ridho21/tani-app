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
        judul: string,
        isi: string,
        image: null | File
    }>({
        judul: "",
        isi: "",
        image: null
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        const formData = new FormData();
        
        formData.append('judul', data.judul);
        formData.append('isi', data.isi + "");
        
        if (data.image == null) {
            return;
        }

        formData.append('gambar', data.image)

        router.post(`/berita`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    const handleFileChange = (e: any) => {
        setData('image', e.target.files[0]);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Buat Berita" />
            <Paper sx={{
                marginInline: 10,
                paddingX: 5,
                paddingY: 2,
                marginTop: 10
            }}>
                <Typography variant="h5">Buat Berita</Typography>
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
                        value={data.judul}
                        onChange={(ev) => {
                            setData("judul", ev.target.value)
                        }}
                    />
                    <TextField
                        multiline={true}
                        required
                        id="outlined-required"
                        label="Isi"
                        sx={{
                            width: "100%"
                        }}
                        value={data.isi}
                        onChange={(ev) => {
                            setData("isi", ev.target.value)
                        }}
                    />
                    {
                        data.image != null && <img src={URL.createObjectURL(data.image)} style={{
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