import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, ButtonGroup, Checkbox, Pagination } from "@mui/material";
import { Head, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2"
export default function User({ users, auth, kelompok }: PageProps<{
    users: {

        id: number,
        name: string,
        username: string,


    }[],
    kelompok: any,
    
}>) {

    const { put, setData, setError, errors, data } = useForm<{
        selected : number[]
    }>({
        selected: [],
    })

    useEffect(() => {
        console.log(users)
        console.log(errors)
    }, [])





    async function hubungkan() {
        const { isConfirmed } = await Swal.fire({
            text: 'Apakah Anda Yakin ingin menambahkan user ini ke kelompok',
            title: 'Peringatan',
            icon: 'warning',
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: "Tidak"
        })
        if (!isConfirmed) {
            return
        }
        put("/kelompok/" + kelompok.id + "/hubungkan")

    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Box sx={{
                marginTop: "10vh",
                display: "grid",
                placeItems: "center",
                paddingY: 2
            }}>
                {
                    data.selected.length > 0 && <Button variant="contained" onClick={hubungkan}>Hubungkan</Button>
                }
                <TableContainer component={Paper} sx={{
                    width: "80%"
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align="left">Nama</TableCell>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users != null && Array.isArray(users) && users?.map((row, no) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1)}
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.username}</TableCell>

                                    <TableCell align="center">
                                        <Checkbox checked={data.selected.includes(row.id)} onChange={() => {
                                            const newEls = structuredClone(data.selected)
                                            if (newEls.includes(row.id)) {
                                               
                                                setData({
                                                    selected :  newEls.filter(el2 => el2 != row.id)
                                                })
                                                return
                                            }
                                            newEls.push(row.id)
                                            
                                            setData({selected : newEls})
                                        }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>



            </Box>
        </AuthenticatedLayout>
    )
}