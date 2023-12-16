import { Info } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';

const UpdateDeleteConfirmDialog = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const { isDialogOpen, purpose, noteData } = state.updtDelCnfDilg;

    const CancelBtnHandle = () => {
        dispatch({
            type: 'UPDTDEL_CNF_DIG_HANDLE',
            payload: {
                isDialogOpen: false,
                purpose: 'update',
                noteData: {}
            }
        })
    }

    const ConfirmBtnHandle = (value: string, value2: any) => {
        if (value === 'delete') {
            dispatch({ type: 'DELETE_NOTE', payload: value2 });
            dispatch({ type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Note Deleted' } });
        } else if (value === 'update') {
            dispatch({ type: 'UPDATE_NOTE', payload: value2 });
            dispatch({ type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Note Deleted' } });
        }

        CancelBtnHandle();
    }

    return (
        <>
            <Dialog
                open={isDialogOpen}
            >
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Info sx={{ fontSize: '3rem', color: `${purpose === 'delete'? 'error': 'info'}.main` }} />
                    <Typography variant='h6' fontWeight={'bold'} textAlign={'center'}>Confirmation</Typography>
                    <Typography textAlign={'center'}>Are you sure {purpose} this note?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => CancelBtnHandle()}>Cancel</Button>
                    <Button
                        color={purpose === 'delete'? 'error': 'info'}
                        onClick={() => ConfirmBtnHandle(purpose, noteData)}
                    >{purpose}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateDeleteConfirmDialog