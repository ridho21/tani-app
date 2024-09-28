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
export default function Kelompok({ hasil, auth, kelompok }: PageProps<{
    hasil: {
        current_page: number,
        data: {
            id : number,
            nama : string,
            jumlah : number,
            image : string
        }[],
        per_page: number,
        total: number
    },
    kelompok: {
        id: number,
        nama: string,
        ketua: string,
        seketaris: string,
        bendahara: string,
        alamat_seketariat: string,
        tahun: string
    }
}>) {
    useEffect(() => {
        console.log(kelompok)
        console.log(hasil)
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

        router.delete(`/kelompok/${kelompok.id}/hasil/${id}`)
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Pangan Kelompok ${kelompok.nama}`} />
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

                    router.visit(`/kelompok/${kelompok.id}/buathasil`)
                
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
                                <TableCell align="left">Hasil Tani</TableCell>
                                <TableCell align="left">Jumlah</TableCell>
                                <TableCell align="center">Gambar</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hasil.data.map((row, no) => (
                                <TableRow
                                    key={row.nama}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1) + ((hasil.current_page - 1) * hasil.per_page)}
                                    </TableCell>
                                    <TableCell align="left">{row.nama}</TableCell>
                                    <TableCell align="left">{row.jumlah} ton</TableCell>
                                    <TableCell  align="center" style={{
                                        display :"flex",
                                        justifyContent :"center",
                                        cursor :"pointer"
                                    }} onClick={() => {
                                        Swal.fire({
                                            showCancelButton : false,
                                            showCloseButton : false,
                                            showConfirmButton : false,
                                            imageUrl : "/storage/"+row.image,
                                        })
                                    }}>
                                        <img src={"/storage/"+row.image} style={{
                                            width :"100px",
                                            height :"100px",
                                            objectFit :"contain"
                                        }} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                          
                                            <Button color="secondary" onClick={() => {
                                                router.visit(`/kelompok/` + kelompok.id + "/edit/"+row.id)
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
                <Pagination page={hasil.current_page} onChange={(ev, val) => {
                    router.visit(`?limit=${hasil.per_page}&page=${val}`)
                }} sx={{
                    marginTop: "1rem"
                }} count={Math.ceil(hasil.total / hasil.per_page)} variant="outlined" color="primary" />
            </Box>
        </AuthenticatedLayout>
    )
}