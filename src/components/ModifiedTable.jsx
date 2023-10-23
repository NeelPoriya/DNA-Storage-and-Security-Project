import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import StripedDataGrid from "./StripedDataGrid";
import { forwardRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { RxCross2 } from 'react-icons/rx';
import { LoadingButton } from "@mui/lab";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModifiedTable({ data, columns, category }) {

    // provides the session object to the client
    const { data: session } = useSession();

    // switch for add-item dialog box
    const [accessDialogOpen, setAccessDialogOpen] = useState(false);

    // variable for storing input values in a single object
    const [input, setInput] = useState({});

    // switch for snackbar
    const [snackbar, setSnackbar] = useState(false);

    // access control for add-item dialog box
    const [canEdit, setCanEdit] = useState(undefined);

    // switch for request dialog box
    const [requestDialogOpen, setRequestDialogOpen] = useState(false);

    // stores userStatus data
    const [userStatus, setUserStatus] = useState(undefined);

    // request loading
    const [requestLoading, setRequestLoading] = useState(undefined);

    const fetchUserDetails = async () => {
        const response = await fetch('/api/users/superAdmin');
        const data = await response.json();

        setCanEdit(
            data.user.role === 'admin' ||
            (data.user.role === 'user' && data.user.userStatus === 'accepted')
        );

        setUserStatus(data.user.userStatus);
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleChangeInput = (field, value) => {
        setInput(prev => { return { ...prev, [field]: value } });
    }

    const handleClickOpen = () => {
        if (canEdit)
            setAccessDialogOpen(true);
        else
            setRequestDialogOpen(true);
    };

    const handleClose = () => {
        if (canEdit)
            setAccessDialogOpen(false);
        else
            setRequestDialogOpen(false);
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
        setAccessDialogOpen(false);

        // clear all textfields
        const textFields = document.querySelectorAll('input[type="text"]');
        textFields.forEach((item) => {
            item.value = '';
        });

        handleSnackbarOpen();
    }

    const requestAccess = async () => {
        setRequestLoading(true);
        const response = await fetch('/api/users/requestEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: session.user.email })
        });

        if (response.status === 200) {
            setRequestLoading(false);
            setUserStatus('pending');
        }
        else {
            console.error('request failed: ', response);
        }
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
                disabled={!(session && session.user !== null) || (canEdit === undefined || userStatus === undefined)}
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

    const AddButtonFormInput = (
        <Dialog
            open={accessDialogOpen}
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

    const RequestDialog = (
        <Dialog
            open={requestDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="request-item-slide"
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle>{'Permission Denied'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are not authorized to add {category}. Please request the admin for permission to edit.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {userStatus !== 'rejected' && <Button onClick={handleClose}>Cancel</Button>}
                {userStatus === 'pending' && <LoadingButton loading={requestLoading} variant="contained" disabled><AiOutlineClockCircle style={{ fontSize: '1.1rem', marginRight: '.5rem' }} />Request Pending</LoadingButton>}
                {userStatus === 'none' && <LoadingButton loading={requestLoading} variant="contained" onClick={() => { requestAccess() }}>Request Access</LoadingButton>}
                {userStatus === 'rejected' && <LoadingButton loading={requestLoading} variant="contained" color="error" onClick={handleClose}><RxCross2 style={{ fontSize: '1.1rem', marginRight: '.5rem' }} /><strong>Admin rejected your request</strong>. Click to close</LoadingButton>}
            </DialogActions>
        </Dialog>
    )

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
            {AddButtonFormInput}
            {RequestDialog}
            {toast}
        </>
    );
}