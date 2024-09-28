import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, ButtonGroup, Pagination } from "@mui/material";
import { Head, router } from "@inertiajs/react";
import Swal from "sweetalert2"
export default function Berita({ berita, auth }: PageProps<{
    berita: {
        current_page: number,
        data: {
            id: number,
            judul: string,
            created_at: string,
            image : string
        }[],
        per_page: number,
        total: number
    },

}>) {
    useEffect(() => {
        console.log(berita)
    }, [])

    async function deleteData(id: number) {
        const { isConfirmed } = await Swal.fire({
            text: 'Apakah Anda Yakin ingin menghapus data ini',
            title: 'Peringatan',
            icon: 'warning',
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: "Tidak"
        })
        if (!isConfirmed) {
            return
        }

        router.delete(`/berita/${id}`)
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Berita" />
            <Box sx={{
                marginTop: "10vh",
                display: "grid",
                placeItems: "center",
                paddingY: 2
            }}>
                <Button variant="contained" sx={{
                    marginBottom: 2,
                    justifySelf: "flex-start",
                    marginLeft: 20
                }} onClick={() => {
                    router.visit(`/berita/create`)
                }}>
                    Buat
                </Button>
                <TableContainer component={Paper} sx={{
                    width: "80%"
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align="left">Judul</TableCell>
                                <TableCell align="left">Tanggal</TableCell>
                                <TableCell align="left">Gambar</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {berita.data.map((row, no) => (
                                <TableRow
                                    key={row.judul}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1) + ((berita.current_page - 1) * berita.per_page)}
                                    </TableCell>
                                    <TableCell align="left">{row.judul}</TableCell>
                                    <TableCell align="left">{new Date(row.created_at).toLocaleDateString("id-ID")}</TableCell>
                                    <TableCell align="center" style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }} onClick={() => {
                                        Swal.fire({
                                            showCancelButton: false,
                                            showCloseButton: false,
                                            showConfirmButton: false,
                                            imageUrl: "/storage/" + row.image,
                                        })
                                    }}>
                                        <img src={"/storage/" + row.image} style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "contain"
                                        }} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">

                                            <Button color="secondary" onClick={() => {
                                                router.visit(`/berita/${row.id}/edit/`)
                                            }}>Edit</Button>
                                            <Button color="error" onClick={() => {
                                                deleteData(row.id)
                                            }}>Hapus</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination page={berita.current_page} onChange={(ev, val) => {
                    router.visit(`?limit=${berita.per_page}&page=${val}`)
                }} sx={{
                    marginTop: "1rem"
                }} count={Math.ceil(berita.total / berita.per_page)} variant="outlined" color="primary" />
            </Box>
        </AuthenticatedLayout>
    )
}