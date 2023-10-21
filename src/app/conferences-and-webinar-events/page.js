'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Event Name',
        headerName: 'Event Name',
        width: 600
    },
    {
        field: 'Type',
        headerName: 'Type',
        width: 150,
        editable: false
    },
    {
        field: 'Organization',
        headerName: 'Organization',
        width: 550,
        editable: false
    },
    {
        field: 'Link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                {params['formattedValue'] === '' ? '🖕' : 'Open'}
            </Button>;
        }
    },
];

const EventsPage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch('/api/events');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setEvents(newData);
        }

        fetchEvents();
    }, []);

    return <ModifiedTable data={events} columns={columns} />
}

export default EventsPage 