'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Title',
        headerName: 'Title',
        width: 500
    },
    {
        field: 'Type',
        headerName: 'Type',
        width: 150,
        editable: false
    },
    {
        field: 'channel',
        headerName: 'Channel',
        width: 200,
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

const YoutubePage = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch('/api/youtube');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setVideos(newData);
        }

        fetchVideos();
    }, []);

    return <ModifiedTable data={videos} columns={columns} category={'Video'} />
}

export default YoutubePage 