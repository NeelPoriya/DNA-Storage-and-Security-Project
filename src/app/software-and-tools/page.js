'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Title',
        headerName: 'Title',
        width: 250
    },
    {
        field: 'Description',
        headerName: 'Description',
        width: 500,
        editable: false
    },
    {
        field: 'Link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                Open
            </Button>;
        }
    },
];

const SoftwaresPage = () => {

    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch('/api/softwares');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setSoftwares(newData);
        }

        fetchVideos();
    }, []);


    return <ModifiedTable data={softwares} columns={columns} />
}

export default SoftwaresPage 