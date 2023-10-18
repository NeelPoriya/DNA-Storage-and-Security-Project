'use client'
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Name',
        headerName: 'Name',
        width: 250,
        editable: false,
        renderCell: (params) => {
            return <strong>{params['formattedValue']}</strong>
        }
    },
    {
        field: 'Type',
        headerName: 'Type',
        width: 250
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

const SimulationToolsPage = () => {

    const [simulationTools, setSimulationTools] = useState([]);

    useEffect(() => {
        async function fetchSimulationTools() {
            const response = await fetch('/api/simulation-tools');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setSimulationTools(newData);
        }

        fetchSimulationTools();
    }, []);

    const dataGrid = (
        <Box sx={{ height: '100%', width: '100%' }}>
            <StripedDataGrid
                rows={simulationTools}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 12,
                        },
                    },
                }}
                pageSizeOptions={[12, 25]}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
        </Box>
    );

    return (
        <Box width={'100%'} height={'calc(100vh - 3rem)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {simulationTools.length === 0 && <CircularProgress />}
            {simulationTools.length !== 0 && dataGrid}
        </Box>
    )
}

export default SimulationToolsPage 