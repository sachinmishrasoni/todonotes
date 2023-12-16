import { useContext, useState } from 'react'
import { Info } from "@mui/icons-material";
import { Box, Button, Dialog, MenuItem, Select, Stack, Typography } from "@mui/material";
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import useDayFind from '../../../Hooks/useDayFind';

const TodoDeleteDialog = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const dateArr = state.todosData.map((date) => date.date).reverse();
    const { isDialogOpen, activeBox, deleteTodos } = state.todoDeleteDialog;
    const [selectVal, setSelectVal] = useState('default');

    const DeleteBtn = () => {
        dispatch({
            type: 'TODODELETEDIALOGHANDL',
            payload: {
                isDialogOpen: true,
                activeBox: 'confirm',
                deleteTodos: 'one'
            }
        })
    }

    const CancelBtn = () => {
        dispatch({
            type: 'TODODELETEDIALOGHANDL',
            payload: {
                isDialogOpen: false,
                activeBox: 'select',
                deleteTodos: 'one'
            }
        });
    }

    const YesBtn = (val: string) => {
        if (val === 'one') {
            dispatch({ type: 'DELETEONETODOS', payload: selectVal });
            dispatch({type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Delete Todos.'}});
        } else if (val === 'all') {
            dispatch({ type: 'DELETEALLTODOS' });
            dispatch({type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Delete all Todos.'}});
        }

        CancelBtn();
        setSelectVal('default')
    }
    return (
        <>
            <Dialog
                open={isDialogOpen}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: 300,
                        maxWidth: 350,
                    }
                }}
            >
                {
                    activeBox === 'select' && (
                        <Box className='delete-todo-datewise' p={2}>
                            <Typography variant="h5" fontWeight={'bold'} textAlign={'center'}>Which date's Todos do you want to delete?</Typography>
                            <Select
                                defaultValue={'default'}
                                value={selectVal}
                                size="small"
                                fullWidth
                                onChange={(e) => setSelectVal(e.target.value)}
                            >
                                <MenuItem value={'default'}>---Select Date---</MenuItem>
                                {
                                    dateArr.map((item, index) => <MenuItem key={index} value={item}>{useDayFind(item)}</MenuItem>)
                                }
                            </Select>

                            <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
                                <Button variant="outlined" onClick={() => CancelBtn()}>Cancel</Button>
                                <Button variant="outlined" color="error" onClick={() => DeleteBtn()} disabled={selectVal === 'default' ? true : false}>Delete</Button>
                            </Stack>
                        </Box>
                    )
                }

                {
                    activeBox === 'confirm' && (
                        <Box className='delete-confirmation-box' p={2}>
                            <Stack alignItems={'center'} gap={1}>
                                <Info color="info" sx={{ fontSize: '3rem' }} />
                                <Typography variant="h5" fontWeight={'bold'} textAlign={'center'}>Are you sure delete {deleteTodos === 'one' ? 'selected' : 'all'} Todos?</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
                                <Button variant="outlined" onClick={() => CancelBtn()}>No</Button>
                                <Button variant="outlined" color="error" onClick={() => YesBtn(deleteTodos)}>Yes</Button>
                            </Stack>
                        </Box>
                    )
                }
            </Dialog>

        </>
    )
}

export default TodoDeleteDialog;