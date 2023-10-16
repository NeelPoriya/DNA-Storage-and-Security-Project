'use client'
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

const ResearchPapersPage = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        async function fetchPapers() {
            const response = await fetch('/api/articles-papers');
            const data = await response.json();

            setPapers(data.data);
        }

        fetchPapers();
    }, []);

    return (
        <Box width={'100%'} height={'calc(100vh - 3rem)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {papers.length === 0 && <CircularProgress />}
            {papers.length !== 0 && 'Data length: ' + papers.length.toString()}
        </Box>
    );
}

export default ResearchPapersPage 