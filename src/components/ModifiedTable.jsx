import { Box, Button, CircularProgress } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import StripedDataGrid from "./StripedDataGrid";

export default function ModifiedTable({ data, columns }) {
    const progress = (
        <Box width={'100%'} height={'calc(100vh - 3rem)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {data.length === 0 && <CircularProgress />}
        </Box>
    );

    const addButton = (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='text'><AiOutlinePlus style={{ fontSize: '1.2rem', marginRight: '.5rem' }} />Add New</Button>
        </Box>
    );

    const dataGrid = (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            {addButton}
            <Box width={'100%'} height={'calc(100vh - 5.28125rem)'}>
                <StripedDataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 11,
                            },
                        },
                    }}
                    pageSizeOptions={[11, 25, 50]}
                    getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                    sx={{ flexGrow: '1' }} />
            </Box>
        </Box>
    );

    return (
        <>
            {data.length === 0 && progress}
            {data.length !== 0 && dataGrid}
        </>
    );
}