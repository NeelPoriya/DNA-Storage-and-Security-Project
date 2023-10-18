'use client'
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
        width: 150
    },
    {
        field: 'Funding Agency',
        headerName: 'Funding Agency',
        width: 500,
        editable: false
    },
    {
        field: 'Organization',
        headerName: 'Organization',
        width: 500,
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

const ProjectsPage = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch('/api/projects');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setProjects(newData);
        }

        fetchProjects();
    }, []);

    const dataGrid = (
        <Box sx={{ height: '100%', width: '100%' }}>
            <StripedDataGrid
                rows={projects}
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
            {projects.length === 0 && <CircularProgress />}
            {projects.length !== 0 && dataGrid}
        </Box>
    )
}

export default ProjectsPage 