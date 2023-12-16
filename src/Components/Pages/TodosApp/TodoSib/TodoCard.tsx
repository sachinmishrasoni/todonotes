import { useContext } from 'react';
import { Remove } from '@mui/icons-material';
import { Checkbox, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { AppDataContext, Todo } from '../../../../AppContext/AppDataProvider';
import dayjs from 'dayjs';

interface ITaskCardProps {
    data: Todo;
}

const TodoCard = ({ data }: ITaskCardProps) => {
    const { state, dispatch } = useContext(AppDataContext);

    const CardHandler = (whichBtn: string, id: number, date: string) => {
        if(whichBtn === 'removeBtn'){
            dispatch({ type: 'TODODIALOGHANDL', payload: { isDialogOpen: true, forWhom: 'removeTodoBox', dialogData: { ...data, id: id, date: date } } });
        }else if(whichBtn === 'showTodo'){
            dispatch({ type: 'TODODIALOGHANDL', payload: { isDialogOpen: true, forWhom: 'showTodoBox', dialogData: { ...data, id: id, date: date } } });
        }
    }

    const CheckBoxHandler = (id: number, date: string) => {
        dispatch({
            type: 'UPDATE_TODO',
            payload: { id: id, date: date, updateTodo: { isComplete: !data.isComplete } }
        });

        if(data.isComplete) dispatch({type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'info', message: 'Todo UnCompleted'}})
        else dispatch({type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Todo Completed'}})
        
    };

    
    return (
        <>

            <Paper
                className={`task-${data.id}`}
                sx={{
                    p: 1,
                    pl: 0,
                    borderLeft: '5px solid',
                    borderColor: `${state.todoChip.color}.main`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.1), 1px 1px 5px rgba(0,0,0,0.3), -0.5px -0.5px 2px rgba(255,255,255,0.1), -1px -1px 5px rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.01)'
                    }
                }}
            >
                <Stack direction={'row'} alignItems={'center'} flexGrow={1}>
                    <Stack justifyContent={'center'} alignItems={'center'}>
                        <Checkbox
                            title={data.isComplete ? 'Complete' : 'InComplete'}
                            color='success'
                            checked={data.isComplete}
                            onChange={() => CheckBoxHandler(data.id, data.date)}
                        />
                        {/* <Typography variant='caption' color={'gray'} fontWeight={'bold'}>{dayjs(data.time).format("hh:mm A")}</Typography> */}
                    </Stack>

                    <Stack ml={0.5} flexGrow={1} onClick={() => CardHandler('showTodo', data.id, data.date)} >
                        <Typography variant='body1' fontWeight={'600'} textTransform={'capitalize'}>{data.title}</Typography>
                        <Typography variant='caption' color={'gray'} >Time: {dayjs(data.time).format("hh:mm A")}, ...</Typography>
                        {/* <Typography variant='caption' color={'gray'} sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textTransform: 'capitalize'

                        }}>{data.desc.trim() === '' ? 'Empty Notes' : data.desc}</Typography> */}
                    </Stack>
                </Stack>

                <Stack direction={'row'}>
                    <Tooltip title='Remove'>
                        <IconButton size='small' onClick={() => CardHandler('removeBtn', data.id, data.date)}>
                            <Remove color='error' />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Paper>
        </>
    )
}

export default TodoCard;