'use client'
import ModifiedTable from "@/components/ModifiedTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 500
    },
    {
        field: 'topics',
        headerName: 'Topics',
        width: 250,
        editable: false
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 200,
        editable: false
    },
    {
        field: 'authors',
        headerName: 'Authors',
        width: 200,
        editable: false
    },
    {
        field: 'publishedDate',
        headerName: 'Published Date',
        type: 'date',
        editable: false,
        width: 200
    },
    {
        field: 'source',
        headerName: 'Source',
        editable: false,
        width: 200
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: false,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>Open</Button>;
        }
    },
];

const ResearchPapersPage = () => {
    const [papers, setPapers] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchPapers() {
            const response = await fetch('/api/articles-papers');
            const data = await response.json();

            const newData = data.map((d, i) => {
                return {
                    ...d,
                    'id': d._id,
                    'publishedDate': new Date(d['publishedDate'])
                };
            });

            setPapers(newData);
        }

        fetchPapers();
    }, [fetchAgain]);

    return <ModifiedTable data={papers} columns={columns} category={'Research Paper'} setFetchAgain={setFetchAgain} />;
}

export default ResearchPapersPage;