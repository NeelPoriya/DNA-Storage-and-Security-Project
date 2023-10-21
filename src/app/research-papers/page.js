'use client'
import ModifiedTable from "@/components/ModifiedTable";
import { Button } from "@mui/material";
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
                return {
                    ...d,
                    'id': i,
                    'Published Date': new Date(d['Published Date'])
                };
            });

            setPapers(newData);
        }

        fetchPapers();
    }, []);

    return <ModifiedTable data={papers} columns={columns} category={'Research Paper'} />;
}

export default ResearchPapersPage;