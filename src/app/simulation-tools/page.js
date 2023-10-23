'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
        editable: false,
        renderCell: (params) => {
            return <strong>{params['formattedValue']}</strong>
        }
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 250
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                Open
            </Button>;
        }
    },
];

const SimulationToolsPage = () => {

    const [simulationTools, setSimulationTools] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchSimulationTools() {
            const response = await fetch('/api/simulation-tools');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setSimulationTools(newData);
        }

        fetchSimulationTools();
    }, [fetchAgain]);

    return <ModifiedTable data={simulationTools} columns={columns} category={'Simulation Tool'} setFetchAgain={setFetchAgain} />
}

export default SimulationToolsPage 