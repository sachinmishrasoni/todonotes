import React, { ChangeEvent, useContext, useEffect } from 'react';
import { AddTask, AlarmOn, Close } from '@mui/icons-material';
import { Box, Button, Container, Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import useDateTime from '../../../../Components/Hooks/useDateTime';
import useDayFind from '../../../Hooks/useDayFind';


const TodoDrawer = () => {
    const currentDate = dayjs();
    const [dateTime] = useDateTime();
    const { state, dispatch } = useContext(AppDataContext);
    
    const [todoItem, setTodoItem] = React.useState({
        id: state.todoUniqueIdCount,
        date: dateTime.fullDate,
        title: '',
        desc: '',
        time: currentDate?.toISOString(),
        isComplete: false,
    });
    
    useEffect(() => {
        if (state.myDrawer.mode === 'Add') {
            setTodoItem({
                id: state.todoUniqueIdCount,
                date: dateTime.fullDate,
                title: '',
                desc: '',
                time: currentDate?.toISOString(),
                isComplete: false,
            });
        } else if (state.myDrawer.mode === 'Edit') {
            const todoData = state.todoDialog.dialogData;
            setTodoItem({
                id: todoData.id,
                date: todoData.date,
                title: todoData.title,
                desc: todoData.desc,
                time: todoData.time,
                isComplete: todoData.isComplete
            });
        }
    }, [state.myDrawer.mode]);

    // Text Input Handlers
    const TextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'title') {
            if (wordCount(todoItem.title) <= 10) {
                setTodoItem({ ...todoItem, [name]: value });
            }
        } else if (name === 'desc') {
            if (wordCount(todoItem.desc) <= 50) {
                setTodoItem({ ...todoItem, [name]: value });
            }
        }

    }
    
    const TextHandlerDown = (e: React.KeyboardEvent, nameStr: string, wordLimit: number) => {
        if (e.key === 'Backspace' && wordCount(nameStr) >= wordLimit) {
            // console.log(wordCount(nameStr), wordLimit)
            return;
        }

        if (wordCount(nameStr) >= wordLimit) {
            e.preventDefault();
        }
    }

    const todoStatusHandl = (e: any) => {
        setTodoItem({ ...todoItem, isComplete: e.target.value === 0 ? true : false })
    }

    // Save Button 
    const SaveBtn = (mode: string) => {
        // Add TodoList Data  
        if (mode === 'Add') {
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    date: dateTime.fullDate,
                    todos: [{ ...todoItem }]
                }
            });

            dispatch({
                type: 'SNACKBARHANDL',
                payload: {
                    isOpen: true,
                    severity: 'success',
                    message: 'Todo Added.'
                }
            });
        } else if (mode === 'Edit') {
            const todoData = state.todoDialog.dialogData;
            dispatch({
                type: 'UPDATE_TODO',
                payload: { id: todoData.id, date: todoData.date, updateTodo: todoItem }
            });
            dispatch({
                type: 'SNACKBARHANDL',
                payload: {
                    isOpen: true,
                    severity: 'success',
                    message: 'Todo Updated.'
                }
            });
        }
        dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: false } });
        setTodoItem({ ...todoItem, title: '', desc: '', isComplete: false });
    }

    // Object.entries(taskData).map((item) => item[1].trim() !== '').every((bool) => bool === true)
    function wordCount(str: string) {
        let wordLen = str.trim() !== '' ? str.split(' ').length : [].length;
        return wordLen;
    }
    return (
        <>
            <Drawer
                open={state.myDrawer.isDrawerOpen}
                onClose={() => dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: false } })}
                anchor='bottom'
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '15px 15px 0 0',
                        borderTop: '2px solid',
                        borderColor: 'myThemeColors.highlight',
                        p: 1,
                        backgroundImage: 'none'
                    }
                }}
            >
                <Container sx={{ heigh: '100%' }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1}>
                        <Stack>
                            <Stack direction={'row'}>
                                <AddTask />
                                <Typography variant='h5' fontWeight={'bold'} ml={0.5}>{state.myDrawer.mode === 'Add' ? 'Add' : 'Update'} ToDo</Typography>
                            </Stack>
                            {state.myDrawer.mode === 'Edit' && (<Typography variant='caption' textAlign={'right'} color={'gray'} lineHeight={0.5}>{useDayFind(todoItem.date)}</Typography>)}
                        </Stack>

                        <Tooltip title='close'>
                            <IconButton onClick={() => dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: false } })}>
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    <form>
                        <Stack gap={1}>
                            <TextField
                                fullWidth
                                required
                                label='Todo Name'
                                placeholder='Task Name'
                                name='title'
                                value={todoItem.title}
                                variant='standard'
                                autoComplete='nope'
                                onChange={TextHandler}
                                onKeyDown={(e) => TextHandlerDown(e, todoItem.title, 10)}
                                inputProps={{
                                    maxLength: 10 * 5, // Adjust the limit to account for space characters
                                }}
                                error={wordCount(todoItem.title) === 10 ? true : false}
                                helperText={wordCount(todoItem.title) === 10 ? 'Word Limit is 10.' : ''}
                            />

                            <Grid container spacing={1}>
                                <Grid item xxs={12} sm={7}>
                                    <FormControl variant='standard' fullWidth sx={{ mt: 1 }}>
                                        <InputLabel id='todo-status'>Todo Status</InputLabel>
                                        <Select
                                            labelId='todo-status'
                                            name='todo-status'
                                            label='Todo Status'
                                            value={todoItem.isComplete === true ? 0 : 1}
                                            onChange={todoStatusHandl}
                                        >
                                            <MenuItem value={0}>Complete</MenuItem>
                                            <MenuItem value={1}>InComplete</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xxs={12} sm={5}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}
                                        sx={{
                                            '& .MuiStack-root': {
                                                width: { xxs: '100%', md: '100%' }, overflow: 'hidden',
                                                '& .MuiInputBase-root': { borderRadius: '4px 0 0 4px' },
                                            }
                                        }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['MobileTimePicker']}>
                                                <MobileTimePicker
                                                    label='Timing'
                                                    slotProps={{
                                                        textField: { variant: 'standard', fullWidth: true }
                                                    }}
                                                    value={dayjs(todoItem.time)}
                                                    onChange={(newTimeVal: any) => setTodoItem({...todoItem, time: newTimeVal?.toISOString()})}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <Box display={'flex'} alignItems={'center'} height={48} mt={1} bgcolor={'rgba(255,255,255, 0.1)'} borderBottom={'1px solid rgba(255,255,255, 0.8)'} borderRadius={'0 4px 4px 0'}>
                                            <Tooltip title='Alarm Off'>
                                                <IconButton>
                                                    <AlarmOn />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Box position={'relative'} sx={{ '& .MuiFormHelperText-root': { display: 'inline' } }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name='desc'
                                    label='Some Notes'
                                    placeholder='Some Notes'
                                    autoComplete='nope'
                                    value={todoItem.desc}
                                    onChange={TextHandler}
                                    onKeyDown={(e) => TextHandlerDown(e, todoItem.desc, 50)}
                                    inputProps={{
                                        maxLength: 50 * 5, // Adjust the limit to account for space characters
                                    }}
                                    error={wordCount(todoItem.desc) === 50 ? true : false}
                                />
                                <Stack
                                    className='error-help-box'
                                    mx={1}
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    color={wordCount(todoItem.desc) === 50 ? 'red' : ''}
                                >
                                    <Typography variant='caption'>{wordCount(todoItem.desc) === 50 ? 'Word Limit Exceed.' : ''}</Typography>
                                    <Typography variant='caption' >{wordCount(todoItem.desc)}/50</Typography>
                                </Stack>

                            </Box>

                            <Stack>
                                <Button
                                    variant='outlined'
                                    onClick={() => SaveBtn(state.myDrawer.mode)}
                                    disabled={todoItem.title.trim() ? false : true}
                                >{state.myDrawer.mode === 'Add' ? 'Save' : 'Update & Save'}</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Container>
            </Drawer>
        </>
    )
}

export default TodoDrawer;