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
export default function Agenda({ agenda, auth, kelompok}: PageProps<{
    agenda: {
        current_page: number,
        data: {
            id : number,
            nama : string,
            tanggal : string,
        }[],
        per_page: number,
        total: number
    },
    kelompok : any
  
}>) {
    useEffect(() => {
        console.log(agenda)
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

        router.delete(`/kelompok/${kelompok.id}/agenda/${id}`)
    }

    return (
        
        <AuthenticatedLayout user={auth.user}>
            <Head title="Agenda" />
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
                    router.visit(`/kelompok/${kelompok.id}/agenda/create`)
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
                                <TableCell align="left">Nama</TableCell>
                                <TableCell align="left">Tanggal</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agenda.data.map((row, no) => (
                                <TableRow
                                    key={row.nama}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1) + ((agenda.current_page - 1) * agenda.per_page)}
                                    </TableCell>
                                    <TableCell align="left">{row.nama}</TableCell>
                                    <TableCell align="left">{new Date(row.tanggal).toLocaleDateString("id-ID")}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                          
                                            <Button color="secondary" onClick={() => {
                                                router.visit(`/kelompok/${kelompok.id}/agenda/${row.id}`)
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
                <Pagination page={agenda.current_page} onChange={(ev, val) => {
                    router.visit(`?limit=${agenda.per_page}&page=${val}`)
                }} sx={{
                    marginTop: "1rem"
                }} count={Math.ceil(agenda.total / agenda.per_page)} variant="outlined" color="primary" />
            </Box>
        </AuthenticatedLayout>
    )
}