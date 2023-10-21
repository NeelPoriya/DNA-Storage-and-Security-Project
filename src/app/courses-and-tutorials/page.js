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
        width: 250,
        editable: false
    },
    {
        field: 'Authors',
        headerName: 'Authors',
        width: 250,
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

const CoursesPage = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('/api/courses');
            const data = await response.json();

            const newData = data.data.map((item, idx) => {
                return {
                    ...item,
                    'id': idx
                };
            })

            setCourses(newData);
        }

        fetchCourses();
    }, []);

    return <ModifiedTable data={courses} columns={columns} />
}

export default CoursesPage 