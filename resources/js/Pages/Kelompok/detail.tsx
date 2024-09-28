import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Box, Paper } from "@mui/material";

export default function Detail({auth} : PageProps) {

    

    return(
        <Authenticated user={auth.user}>
            <Head title="Detail Kelompok" />
            <Paper>

            </Paper>
        </Authenticated>
    )
}