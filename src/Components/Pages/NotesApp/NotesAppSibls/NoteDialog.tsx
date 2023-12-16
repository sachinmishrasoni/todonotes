import { Box, Button, Container, Dialog, IconButton, Paper, Slide, Stack, TextField, Tooltip, styled } from '@mui/material';
import dayjs from 'dayjs'
import React, { useState, ChangeEvent, useContext, useEffect, useCallback } from 'react'
import useWordCount from '../../../Hooks/useWordCount'
import { Check, Close, NotInterested } from '@mui/icons-material'
import { AppDataContext } from '../../../../AppContext/AppDataProvider'
import { TransitionProps } from '@mui/material/transitions';
import PatternImg from '../../../../assets/image/vector_img01.jpg';
import NoteBookLogo from './NoteBookLogo'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const CircleBox = styled(Paper)({
    width: '35px',
    height: '35px',
    border: '2px solid',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const NoteDialog = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const { isDialogOpen, mode } = state.noteDialog;
    const [userSelectDate, setUserSelectDate] = useState('');
    const [noteData, setNoteData] = useState({
        id: state.noteUniqueIdCount,
        userDate: '',
        currDateTime: dayjs().toISOString(),
        heading: '',
        notes: '',
        noteColor: ''
    });
    const { heading, notes, noteColor } = noteData;

    useEffect(() => {
        if (mode === 'add') {
            setNoteData({
                id: state.noteUniqueIdCount,
                userDate: userSelectDate,
                currDateTime: dayjs().toISOString(),
                heading: '',
                notes: '',
                noteColor: ''
            })
        } else if (mode === 'update') {
            let filterData = state.notesData.filter((obj) => obj.id === state.noteDialog.data.id)[0]
            setNoteData(filterData)
        }
    }, [state.noteDialog])

    const InputTextHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setNoteData({ ...noteData, [name]: value })

    }, [noteData]);

    const highlightColorHandl = (color: string) => {
        setNoteData({ ...noteData, noteColor: color })
    }

    const AddOrUpdateBtnHadl = (value: string) => {
        if (heading.trim() !== '' && notes.trim() !== '') {
            if (value === 'add') {
                dispatch({
                    type: 'ADD_NOTE',
                    payload: noteData
                });

                setNoteData({
                    ...noteData,
                    heading: '',
                    notes: '',
                    noteColor: 'orange'
                })

                dispatch({ type: 'NOTEDIALOGHANDLER', payload: { isDialogOpen: false, mode: 'add', data: null } })

                dispatch({
                    type: 'SNACKBARHANDL',
                    payload: {
                        isOpen: true,
                        severity: 'success',
                        message: 'Note Added.'
                    }
                })
            } else if (value === 'update') {
                dispatch({
                    type: 'UPDTDEL_CNF_DIG_HANDLE',
                    payload: {
                        isDialogOpen: true,
                        purpose: 'update',
                        noteData: noteData
                    }
                });
            }
            dispatch({ type: 'NOTEDIALOGHANDLER', payload: { isDialogOpen: false, mode: 'add', data: null } })
        } else {
            dispatch({
                type: 'SNACKBARHANDL',
                payload: {
                    isOpen: true,
                    severity: 'info',
                    message: 'Empty Heading or Note.'
                }
            })
        }
    }

    return (
        <>
            <Dialog
                open={isDialogOpen}
                fullScreen
                TransitionComponent={Transition}
                keepMounted
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '10px',
                        border: '2px solid',
                        borderColor: noteColor,
                        position: 'relative',
                        backgroundImage: 'none'
                    },
                    '& .MuiDialog-paper:before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'rgba(0,0,0,0.5)',
                        backgroundImage: `url(${PatternImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        filter: (theme) => theme.palette.mode === 'dark' ? 'opacity(0.1)' : 'opacity(0.3)',
                    },
                    '& .MuiInputBase-inputMultiline': {
                        height: 'calc(100vh - 255px) !important'
                    },
                    '& .MuiTypography-root span': {
                        color: noteColor.trim() !== ''? noteColor: 'myThemeColors.highlight',
                        fontWeight: 'bolder'
                    }
                }}
            >

                <Container
                    disableGutters
                    sx={{
                        height: '100%',
                        py: 1.5, pb: 1,
                        position: 'relative',

                    }}
                >
                    <Stack
                        className='header'
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        borderRadius={'5px 50px 50px 5px'}
                        bgcolor={'rgba(0,0,0,0.3)'}
                        position={'sticky'}
                        top={0}
                        sx={{
                            px: { xxs: 0.5, lg: 0 },
                            mr: { xxs: 1.5, lg: 0 },
                            backdropFilter: 'blur(10px)'
                        }}
                    >

                        <NoteBookLogo currDateTime={noteData.currDateTime} userDate={noteData.userDate} setUserSelectDate={setUserSelectDate} />

                        {/* <Button variant='outlined' sx={{ borderRadius: '25px' }}>Save</Button> */}
                        <Tooltip title='Close'>
                            <IconButton onClick={() => dispatch({ type: 'NOTEDIALOGHANDLER', payload: { isDialogOpen: false, mode: 'add' } })} >
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </Stack>


                    <Stack sx={{
                        mt: 1,
                        px: { xxs: 1.5, lg: 0 },
                        position: 'relative',
                        '& .MuiFormHelperText-root': {
                            textAlign: 'right'
                        }
                    }}>
                        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                            <TextField
                                fullWidth
                                label='Heading'
                                variant='filled'
                                placeholder='My Life'
                                name='heading'
                                value={heading}
                                onChange={InputTextHandler}
                            />
                            {/* Save Button */}
                            <Button
                                variant='outlined'
                                sx={{ borderRadius: '25px' }}
                                onClick={() => AddOrUpdateBtnHadl(state.noteDialog.mode === 'update' ? 'update' : 'add')}
                            >{state.noteDialog.mode === 'update' ? 'update' : 'add'}</Button>
                        </Stack>
                        <TextField
                            multiline
                            fullWidth
                            rows={5}
                            label='Notes'
                            name='notes'
                            placeholder='Start Typing...'
                            variant='filled'
                            helperText={`Words: ${useWordCount(notes)}`}
                            value={notes}
                            onChange={InputTextHandler}
                        />
                    </Stack>
                    <Box
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            bottom: 8,
                            right: 0,
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Box width={{ xxs: 10, lg: 0 }} />
                        <Stack sx={{
                            mt: 0.5,
                            py: 0.5,
                            pl: 1.5,
                            // ml: { xxs: 1.5, lg: 0 },
                            width: '100%',
                            height: { xxs: '53px', lg: '60px' },
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: '50px 5px 5px 50px',
                            justifyContent: 'center',

                        }}>

                            {/* <Typography variant='caption'>Highlight: </Typography> */}
                            <Stack direction={'row'} gap={1} sx={{
                                '& .MuiPaper-root .check-icon': {
                                    display: 'none'
                                },
                                '& .MuiPaper-root.active .check-icon': {
                                    display: 'flex'
                                }
                            }}>
                                <CircleBox 
                                    onClick={() => highlightColorHandl('')}
                                >
                                    <NotInterested />
                                </CircleBox>
                                {

                                }
                                {
                                    ['orange', 'lightblue', 'lightpink', 'cyan', 'lightskyblue', 'lightyellow', 'lightseagreen'].map((item, index) =>
                                        <CircleBox
                                            key={index}
                                            className={item === noteColor ? 'active' : ''}
                                            onClick={() => highlightColorHandl(item)}
                                            sx={{
                                                border: 'none',
                                                backgroundColor: item
                                            }}
                                        ><Check className='check-icon' /></CircleBox>
                                    )
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </Dialog>
        </>
    )
}

export default NoteDialog