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
import { Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { Head, router } from "@inertiajs/react";
import Swal from "sweetalert2"
import kecamatans from "@/utils/kecamatan";
export default function Kelompok({ kelompok, auth, kecamatan, tipe }: PageProps<{
    kelompok: {
        current_page: number,
        data: {
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
            hasiltani: {
                nama: string
            }[]

        }[],
        per_page: number,
        total: number
    },
    kecamatan: string | null,
    tipe: string | null
}>) {

    useEffect(() => {
        console.log(kelompok)
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

        router.delete("/kelompok/" + id)
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelompok" />
            <Box sx={{
                marginTop: "10vh",
                paddingY: 2,
                display: "flex",
                flexDirection: "column",
                marginInline: 10
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                    alignItems: "end"
                }}>
                    <Button variant="contained" sx={{
                        height: 30,
                    }} onClick={() => {
                        console.log("LOL")
                        router.visit("kelompok/create")
                    }}>
                        Buat
                    </Button>
                    <Box sx={{
                        display: "flex",
                        gap : 2
                    }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel >Tipe</InputLabel>
                            <Select
                                label="Tipe"
                                onChange={(ev) => {

                                    const params = new URLSearchParams(window.location.search)
                                    if (ev.target.value == "kosong") {
                                        params.delete("tipe")
                                    } else {
                                        params.set("tipe", ev.target.value || "")
                                    }
                                    router.visit("?" + params.toString())
                                    // router.visit(`?limit=${kelompok.per_page}&page=${kelompok.current_page}`)
                                }}
                                value={tipe == null ? "kosong" : tipe}

                            >
                                <MenuItem value={"kosong"}>Pilih Tipe</MenuItem>
                                <MenuItem value={"pangan"}>Tanaman Pangan</MenuItem>
                                <MenuItem value={"hortikultura"}>Tanaman Hortikultura</MenuItem>
                                <MenuItem value={"perkebunan"}>Tanaman Perkebunan</MenuItem>
                                <MenuItem value={"ternak"}>Ternak</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel >Kecamatan</InputLabel>
                            <Select
                                label="Kecamatan"
                                onChange={(ev) => {
                                    console.log(kecamatan)
                                    console.log(kecamatan == null ? "" : kecamatan)

                                    const params = new URLSearchParams(window.location.search)
                                    if (ev.target.value == "kosong") {
                                        params.delete("kecamatan")
                                    } else {
                                        params.set("kecamatan", ev.target.value || "")
                                    }
                                    router.visit("?" + params.toString())
                                    // router.visit(`?limit=${kelompok.per_page}&page=${kelompok.current_page}`)
                                }}
                                value={kecamatan == null ? "kosong" : kecamatan}

                            >
                                <MenuItem value={"kosong"}>Pilih Kecamatan</MenuItem>
                                {
                                    kecamatans.map(el => <MenuItem value={el} >{el}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>

                </Box>

                <TableContainer component={Paper} sx={{
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={10}></TableCell>
                                <TableCell align="center" colSpan={9}>Jumlah/Volume/Luas</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={10}></TableCell>
                                <TableCell colSpan={3}>Tanaman Pangan(Ha)</TableCell>
                                <TableCell rowSpan={2}>Tanaman Perkebunan(Ha)</TableCell>
                                <TableCell colSpan={2}>Tanaman Hortikultura(Ha)</TableCell>
                                <TableCell colSpan={3}>Ternak(ekor)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={3} >No</TableCell>
                                <TableCell rowSpan={3} align="left">Nama</TableCell>
                                <TableCell rowSpan={3} align="left">Nama Ketua</TableCell>
                                <TableCell rowSpan={3} align="left">Nama Sekertaris</TableCell>
                                <TableCell rowSpan={3} align="left">Nama Bendahara</TableCell>
                                <TableCell rowSpan={3} align="left">Alamat Sekertatis</TableCell>
                                <TableCell rowSpan={3} align="left">Kecamatan</TableCell>
                                <TableCell rowSpan={3} align="left">Tahun Berdiri</TableCell>
                                <TableCell rowSpan={3} align="left">Total Anggota</TableCell>
                                <TableCell rowSpan={3} align="left">Komoditas Unggulan</TableCell>


                                <TableCell>
                                    Padi Irigasi
                                </TableCell>
                                <TableCell>
                                    Padi Tadah Hujan
                                </TableCell>
                                <TableCell>
                                    Jagung
                                </TableCell>
                                <TableCell>
                                    Sayuran
                                </TableCell>
                                <TableCell>
                                    Buah-buahan
                                </TableCell>
                                <TableCell>
                                    Besar
                                </TableCell>
                                <TableCell>
                                    Kecil
                                </TableCell>
                                <TableCell>
                                    Unggas
                                </TableCell>




                                <TableCell rowSpan={3} align="left">Nomor Registrasi</TableCell>
                                <TableCell rowSpan={3} align="left">Pendamping</TableCell>

                                <TableCell rowSpan={3} align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kelompok?.data?.map((row, no) => (
                                <TableRow
                                    key={row.nama}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {(no + 1) + ((kelompok.current_page - 1) * kelompok.per_page)}
                                    </TableCell>
                                    <TableCell align="left">{row.nama}</TableCell>
                                    <TableCell align="left">{row.ketua}</TableCell>
                                    <TableCell align="left">{row.seketaris}</TableCell>
                                    <TableCell align="left">{row.bendahara}</TableCell>
                                    <TableCell align="left">{row.alamat_seketariat}</TableCell>
                                    <TableCell align="left">{row.kecamatan}</TableCell>
                                    <TableCell align="left">{row.tahun}</TableCell>
                                    <TableCell align="left">{row.users_count}</TableCell>
                                    <TableCell align="left">{row.hasiltani.map(el => el.nama).join(", ")}</TableCell>
                                    <TableCell align="left">{row.tanaman_pangan.padi_irigasi}</TableCell>
                                    <TableCell align="left">{row.tanaman_pangan.padi_tadah_hujan}</TableCell>
                                    <TableCell align="left">{row.tanaman_pangan.jagung}</TableCell>
                                    <TableCell align="left">{row.tanaman_perkebunan.luas}</TableCell>
                                    <TableCell align="left">{row.tanaman_hortikultura.sayuran}</TableCell>
                                    <TableCell align="left">{row.tanaman_hortikultura.buah}</TableCell>
                                    <TableCell align="left">{row.ternak.besar}</TableCell>
                                    <TableCell align="left">{row.ternak.kecil}</TableCell>
                                    <TableCell align="left">{row.ternak.unggas}</TableCell>


                                    <TableCell align="left">{row.no_reg}</TableCell>
                                    <TableCell align="left">{row.pendamping}</TableCell>

                                    <TableCell align="left">
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                            <Button onClick={() => {
                                                router.visit(`/kelompok/` + row.id)
                                            }}>Pangan</Button>
                                            <Button onClick={() => {
                                                router.visit(`/kelompok/` + row.id + "/luas")
                                            }}>Tanaman dan Ternak</Button>
                                            <Button onClick={() => {
                                                router.visit(`/kelompok/` + row.id + "/user")
                                            }}>Users</Button>
                                            <Button onClick={() => {
                                                router.visit(`/kelompok/` + row.id + "/agenda")
                                            }}>Agenda</Button>
                                            <Button color="secondary" onClick={() => {
                                                router.visit(`/kelompok/` + row.id + "/edit")
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
                <Pagination page={kelompok.current_page} onChange={(ev, val) => {
                    router.visit(`?limit=${kelompok.per_page}&page=${val}`)
                }} sx={{
                    marginTop: "1rem"
                }} count={Math.ceil(kelompok.total / kelompok.per_page)} variant="outlined" color="primary" />
            </Box>
        </AuthenticatedLayout>
    )
}