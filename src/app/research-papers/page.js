'use client'
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'Title',
        headerName: 'Title',
        width: 500
    },
    {
        field: 'Topics',
        headerName: 'Topics',
        width: 250,
        editable: false
    },
    {
        field: 'Type',
        headerName: 'Type',
        width: 200,
        editable: false
    },
    {
        field: 'Authors',
        headerName: 'Authors',
        width: 200,
        editable: false
    },
    {
        field: 'Published Date',
        headerName: 'Published Date',
        type: 'date',
        editable: false,
        width: 200
    },
    {
        field: 'Source',
        headerName: 'Source',
        editable: false,
        width: 200
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

const ResearchPapersPage = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        async function fetchPapers() {
            const response = await fetch('/api/articles-papers');
            const data = await response.json();

            const newData = data.data.map((d, i) => {
                d['id'] = i;
                d['Published Date'] = new Date(d['Published Date']);
                return d;
            });

            setPapers(newData);
        }

        fetchPapers();
    }, []);

    const dataGrid = (
        <Box sx={{ height: '100%', width: '100%' }}>
            <StripedDataGrid
                rows={papers}
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
            {papers.length === 0 && <CircularProgress />}
            {papers.length !== 0 && dataGrid}
        </Box>
    );
}

export default ResearchPapersPage 