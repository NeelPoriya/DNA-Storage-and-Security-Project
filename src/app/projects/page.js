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


    return <ModifiedTable data={projects} columns={columns} />
}

export default ProjectsPage 