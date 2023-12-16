import { useContext } from 'react';
import { Box, Button, Dialog, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Cancel, CheckCircle, Close, Edit, Info } from '@mui/icons-material';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import dayjs from 'dayjs';

const TodoDialog = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const { isDialogOpen, forWhom, dialogData } = state.todoDialog;
    // const mytodo = state.todosData?.filter((obj) => obj.date === '16-11-2023')[0].todos.filter((item, index) => index === 0)[0];

    const TodoEditBtn = () => {
        dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: true, mode: 'Edit' } });
        dispatch({ type: 'TODODIALOGHANDL', payload: { isDialogOpen: false, forWhom: 'showTodoBox', dialogData: { ...dialogData } } });
    }

    const RemoveBtnHandl = () => {
        dispatch({
            type: 'REMOVE_TODO',
            payload: {
                id: dialogData.id,
                date: dialogData.date
            }
        });
        TodoDialogClose();
        dispatch({
            type: 'SNACKBARHANDL',
            payload: {
                isOpen: true,
                severity: 'success',
                message: 'Todo Removed.'
            }
        })
    }

    //function for Close the Dialog
    function TodoDialogClose() {
        dispatch({
            type: 'TODODIALOGHANDL',
            payload: {
                isDialogOpen: false,
                forWhom: 'showTodoBox',
                dialogData: { ...dialogData }
            }
        })
    }
    return (
        <>
            <Dialog
                open={isDialogOpen}
                onClose={() => TodoDialogClose()}
                sx={{
                    '& .MuiBackdrop-root': {
                        backdropFilter: 'blur(5px)'
                    },
                    '& .MuiDialog-paper': {
                        width: { xxs: '90%', xs: 350, sm: 350, md: 400, lg: 450 },
                        color: 'grey',
                        userSelect: 'none'
                    }
                }}
            >
                {
                    isDialogOpen && forWhom === 'showTodoBox' && (
                        <Box className='todo-show-data-box' p={2}>
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Typography variant='h5' fontWeight={'bold'} >My ToD</Typography>
                                    {
                                        dialogData.isComplete
                                            ? <CheckCircle color='success' sx={{ fontSize: '1.1rem', mt: 0.2 }} />
                                            : <Cancel color='error' sx={{ fontSize: '1.1rem', mt: 0.2 }} />
                                    }
                                </Stack>

                                <Tooltip title='Close'>
                                    <IconButton onClick={() => TodoDialogClose()}>
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Divider />
                            <Box mt={1}>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography variant='h6' textTransform={'capitalize'} >{dialogData.title}</Typography>
                                    <Typography variant='h6'>{dayjs(dialogData.time).format("hh:mm A")}</Typography>
                                </Stack>

                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography variant='h6'>Status :</Typography>
                                    {
                                        dialogData.isComplete
                                            ? <Typography color='success.main'>Completed</Typography>
                                            : <Typography color='error.main'>UnCompleted</Typography>
                                    }

                                </Stack>

                                <Stack mt={0.5}>
                                    <Typography textAlign={'center'}>-: Notes :-</Typography>
                                    {dialogData.desc.trim() === ''
                                        ? (
                                            <Tooltip title='Empty Notes'>
                                                <Typography variant='caption' textAlign={'center'}>
                                                    ---------- ---------- ---------- ---------- ---------- ---------- ---------- --------- ---------- ---------- ---------- ----------
                                                </Typography>
                                            </Tooltip>
                                        )
                                        : (
                                            <Typography variant='caption' color={'gray'} textAlign={'justify'}>{dialogData.desc}</Typography>
                                        )}
                                    <Typography variant='caption' textAlign={'justify'}>

                                    </Typography>
                                </Stack>
                            </Box>

                            <Stack direction={'row'} justifyContent={'flex-end'} gap={1} mt={1}>
                                <Button
                                    variant='contained'
                                    endIcon={<Edit fontSize='small' />}
                                    size='small'
                                    sx={{ borderRadius: 30 }}
                                    onClick={() => TodoEditBtn()}
                                >Edit</Button>
                            </Stack>
                        </Box>
                    )
                }

                {
                    isDialogOpen && forWhom === 'removeTodoBox' && (
                        <Box p={2}>
                            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} mb={2}>
                                <Info color='info' sx={{ fontSize: '3rem' }} />
                                <Typography variant='h5' textAlign={'center'}>Are you sure reomove this Todo?</Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Button
                                    variant='outlined'
                                    onClick={() => TodoDialogClose()}
                                >Cancel</Button>
                                <Button
                                    variant='outlined'
                                    color='error'
                                    onClick={RemoveBtnHandl}
                                >Reomove</Button>
                            </Stack>
                        </Box>
                    )
                }
            </Dialog>
        </>
    )
}

export default TodoDialog;