'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Organization',
        headerName: 'Organization',
        width: 500
    },
    {
        field: 'Amount of Fund(in USD)',
        headerName: 'Amount of Fund(in USD)',
        width: 250,
        editable: false
    },
    {
        field: 'Link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>Open</Button>;
        }
    },
];

const GrantsPage = () => {

    const [grants, setGrants] = useState([]);

    useEffect(() => {
        async function fetchGrants() {
            const response = await fetch('/api/grants');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'Amount of Fund(in USD)': item['Amount of Fund(in USD)'].toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }),
                    'id': idx
                };
            })

            setGrants(newData);
        }

        fetchGrants();
    }, []);


    return <ModifiedTable data={grants} columns={columns} category={'Research Grant'} />
}

export default GrantsPage 