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
export default function User({ user, auth }: PageProps<{
    user: {
        current_page: number,
        data: {
            id :number,
            name: string,
            username: string,
            tanggal_lahir : string,
            alamat : string,
            nomor_kontak : string,
            nomor_identitas : string
        }[],
        per_page: number,
        total: number
    }
}>) {
    useEffect(() => {
        console.log(user)
    }, [])

    async function deleteData(id : number) {
        const {isConfirmed} = await Swal.fire({
            text: 'Apakah Anda Yakin ingin menghapus data ini',
            title: 'Peringatan',
            icon: 'warning',
            confirmButtonText: 'Ya',
            showCancelButton : true,
            cancelButtonText : "Tidak"
          })
        if(!isConfirmed) {
            return
        }

        router.delete("/users/"+id)
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Box sx={{
                marginTop: "10vh",
                display: "grid",
                placeItems: "center",
                paddingY : 2
            }}>
                <Button variant="contained" sx={{
                    marginBottom : 2,
                    justifySelf :"flex-start",
                    marginLeft : 20
                }} onClick={() => {
                    console.log("LOL")
                    router.visit("users/create")
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
                                <TableCell align="left">Nomor Identitas</TableCell>
                                <TableCell align="left">Nama</TableCell>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">Alamat</TableCell>
                                <TableCell align="left">Nomor Kontak</TableCell>
                                <TableCell align="left">Tanggal Lahir</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.data.map((row, no) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1) + ((user.current_page - 1) * user.per_page)}
                                    </TableCell>
                                    <TableCell align="left">{row.nomor_identitas}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.username}</TableCell>
                                    <TableCell align="left">{row.alamat}</TableCell>
                                    <TableCell align="left">{row.nomor_kontak}</TableCell>
                                    <TableCell align="left">{new Date(row.tanggal_lahir).toLocaleDateString("id-ID")}</TableCell>
                                    
                                    <TableCell align="left">
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                            <Button onClick={() => {
                                                router.visit(`/users/`+row.id+"/edit")
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
                <Pagination page={user.current_page} onChange={(ev, val) => {
                    router.visit(`?limit=${user.per_page}&page=${val}`)
                }} sx={{
                    marginTop: "1rem"
                }} count={Math.ceil(user.total/user.per_page)} variant="outlined" color="primary" />
            </Box>
        </AuthenticatedLayout>
    )
}