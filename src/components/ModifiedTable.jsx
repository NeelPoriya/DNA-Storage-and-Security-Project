import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputLabel, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import StripedDataGrid from "./StripedDataGrid";
import { forwardRef, useState } from "react";
import { useSession } from "next-auth/react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModifiedTable({ data, columns, category }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    const handleChangeInput = (field, value) => {
        setInput(prev => { return { ...prev, [field]: value } });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };


    const clearAllInput = () => {
        setInput({});
        setOpen(false);

        // clear all textfields
        const textFields = document.querySelectorAll('input[type="text"]');
        textFields.forEach((item) => {
            item.value = '';
        });

        handleSnackbarOpen();
    }

    const progress = (
        <Box width={'100%'} height={'calc(100vh - 3rem)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {data.length === 0 && <CircularProgress />}
        </Box>
    );

    const addButton = (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant='text'
                onClick={() => handleClickOpen()}
                disabled={!(session && session.user !== null)}
            >
                <AiOutlinePlus style={{ fontSize: '1.2rem', marginRight: '.5rem' }} />
                Add New
            </Button>
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

    const FormInput = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="add-item-slide"
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle>{'Add ' + category}</DialogTitle>
            <DialogContent>
                {columns.map((item, key) => {
                    return <TextField
                        type={'text'}
                        sx={{ display: 'block', margin: '1rem 0' }}
                        label={item.field}
                        placeholder={item.field}
                        key={key}
                        fullWidth
                        onChange={(e) => handleChangeInput(item.field, e.target.value)}
                    />
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={() => { console.log(input); clearAllInput() }}>Add</Button>
            </DialogActions>
        </Dialog >
    );

    const toast = (
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%', fontWeight: 'bold', color: 'darkslateblue' }}>
                The {category} will be added the moment my dear friends implement the backend!
            </Alert>
        </Snackbar>
    );

    return (
        <>
            {data.length === 0 && progress}
            {data.length !== 0 && dataGrid}
            {FormInput}
            {toast}
        </>
    );
}