'use client'
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Title',
        headerName: 'Title',
        width: 500,
        // renderCell: (params) => {
        //     return params['formattedValue'] === '' ? '🖕' : params['formattedValue'];
        // }
    },
    {
        field: 'Organization / Authors',
        headerName: 'Organization / Authors',
        width: 250,
        editable: false
    },
    {
        field: 'Link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                {/* {params['formattedValue'] === '' ? '🖕' : 'Open'} */}
                {'Open'}
            </Button>;
        }
    },
];

const PatentsPage = () => {

    const [patents, setPatents] = useState([]);

    useEffect(() => {
        async function fetchPatents() {
            const response = await fetch('/api/patents');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setPatents(newData);
        }

        fetchPatents();
    }, []);

    const dataGrid = (
        <Box sx={{ height: '100%', width: '100%' }}>
            <StripedDataGrid
                rows={patents}
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
            {patents.length === 0 && <CircularProgress />}
            {patents.length !== 0 && dataGrid}
        </Box>
    )
}

export default PatentsPage 