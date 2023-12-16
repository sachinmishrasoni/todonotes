import { useContext, useEffect, useState } from 'react';
import { Add, ArrowDownward, ArrowUpward, FormatListBulleted, Lock, LockOpen, Search, Sort } from '@mui/icons-material';
import { Box, Chip, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import NoteRimCard from './NoteRimCard';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import { motion } from 'framer-motion';
import NoteFilterDialog from './NoteFilterDialog/NoteFilterDialog';
import { useNavigate } from 'react-router-dom';
import UpdateDeleteConfirmDialog from './UpdateDeleteConfirmDialog';

const CompoFramerMotion = ({ children }: any) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -50
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: 50
            }}
        >
            {children}
        </motion.div>
    )
}
const NoteSection = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppDataContext);
    const { isLocked, passCode } = state.noteLock;
    const { selectedDate, selectedTitle } = state.noteFilterDialog;
    const [filterNotes, setFilterNotes] = useState(state.notesData);

    useEffect(() => {
        if (selectedDate?.trim() !== '' && selectedTitle?.trim() !== '') {
            let data = state.notesData.filter((obj) => obj.userDate === selectedDate);
            data = data.filter((obj) => obj.heading === selectedTitle);
            setFilterNotes(data);
        } else if (selectedDate?.trim() !== '') {
            let data = state.notesData.filter((obj) => obj.userDate === selectedDate);
            setFilterNotes(data);
        } else if (selectedTitle?.trim() !== '') {
            let data = state.notesData.filter((obj) => obj.heading === selectedTitle);
            setFilterNotes(data);
        } else {
            setFilterNotes(state.notesData);
        }
    }, [state])

    const AddNoteBtn = () => {
        dispatch({
            type: 'NOTEDIALOGHANDLER',
            payload: {
                isDialogOpen: true,
                mode: 'add',
                data: null
            }
        })
    }

    const SortBtnHandle = () => {
        dispatch({
            type: 'NOTE_SORT_HANDLE',
            payload: state.noteSort.sortName === 'latest' ? 'oldest' : 'latest'
        })
    }

    const LockedBtn = () => {
        let noteLockValue: any = localStorage.getItem('noteLockValue');
        noteLockValue = JSON.parse(noteLockValue)

        if (noteLockValue.passCode.trim() === '') {
            navigate('/notes/createpasscode')
        } else {
            dispatch({
                type: 'NOTE_LOCK_HANDLE',
                payload: {
                    isLocked: !isLocked,
                    isLockPageActive: true,
                    passCode: state.noteLock.passCode
                }
            })
        }

    }

    useEffect(() => {
        const myfunc = () => {
            dispatch({
                type: 'NOTE_LOCK_HANDLE', payload: {
                    isLocked: isLocked,
                    isLockPageActive: isLocked,
                    passCode: passCode,
                }
            })
        }
        window.addEventListener('beforeunload', myfunc)
        return () => {
            window.removeEventListener('beforeunload', myfunc)
        }
    }, [])

    const handleDeleteChipBtn = () => {
        dispatch({
            type: 'NOTE_FILTER_DIALOG_HANDLE',
            payload: {
                isDialogOpen: false,
                selectedDate: '',
                selectedTitle: ''
            }
        })
    }
    return (
        <>
            <Box
                className='note-section'
                component={'section'}
                pb={8}
            >
                <Stack className='section-header' component={'header'} direction={'row'} my={0.5} px={1.5} overflow={'hidden'}>
                    {/* Sort */}
                    <Stack component={'div'} direction={'row'} alignItems={'center'} gap={1}>
                        {/* <Typography variant="body1" fontWeight={'bold'}>Filter :</Typography> */}
                        <Stack direction={'row'} gap={1}>
                            <CompoFramerMotion key={'day'}>
                                <Chip
                                    label={selectedDate?.trim() === '' ? `All Notes (${state.notesData.length})` : selectedDate}
                                    size="small"
                                    variant="filled"
                                    icon={<FormatListBulleted />}
                                    onDelete={handleDeleteChipBtn}
                                    sx={{
                                        '& .MuiChip-deleteIcon': {
                                            display: selectedDate?.trim() === '' && selectedTitle?.trim() === '' ? 'none' : 'block'
                                        }
                                    }}
                                />
                            </CompoFramerMotion>
                            |
                            {
                                state.noteSort.sortName === 'latest'
                                    ? (
                                        <CompoFramerMotion key={'latest'}>
                                            <Chip
                                                label='Latest'
                                                size="small"
                                                variant="filled"
                                                icon={<ArrowUpward />}
                                            /></CompoFramerMotion>)
                                    : (
                                        <CompoFramerMotion key={'oldest'}>
                                            <Chip
                                                label='Oldest'
                                                size="small"
                                                variant="filled"
                                                icon={<ArrowDownward />}
                                            /></CompoFramerMotion>)
                            }
                        </Stack>
                    </Stack>

                    <Box flexGrow={'1'} />

                    {/* Tools */}
                    <Stack direction={'row'} gap={0.5}>
                        <Tooltip title={`Sort: ${state.noteSort.sortName === 'latest' ? 'Oldest' : 'Lasest'}`}>
                            <IconButton onClick={() => SortBtnHandle()}>
                                <Sort fontSize='small' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Filter' onClick={() => dispatch({ type: 'NOTE_FILTER_DIALOG_HANDLE', payload: { isDialogOpen: true, selectedDate: selectedDate, selectedTitle: selectedTitle } })}>
                            <IconButton >
                                <Search fontSize='small' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={state.noteLock.isLocked ? 'Locked' : 'Unlocked'}>
                            <IconButton onClick={() => LockedBtn()}>
                                {state.noteLock.isLocked ? <Lock fontSize='small' /> : <LockOpen fontSize='small' />}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Divider />
                <Stack component={'section'} direction={state.noteSort.sortName === 'latest' ? 'column-reverse' : 'column'} gap={1.5} mt={1} overflow={'hidden'} px={1.5} pb={1}>
                    {
                        filterNotes.length >= 1
                            ? (
                                filterNotes.map((item, index) =>
                                    <CompoFramerMotion key={index}>
                                        <NoteRimCard data={item} />
                                    </CompoFramerMotion>
                                )
                            )
                            : (
                                <Stack justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='h6' fontWeight={'bold'}>Notes not Found.</Typography>
                                </Stack>
                            )
                    }
                </Stack>

                {/* Add Note Button */}
                <Tooltip title='Add Note'>
                    <IconButton
                        onClick={() => AddNoteBtn()}
                        size='medium'
                        sx={{
                            position: 'fixed',
                            right: { xxs: '25px', lg: '200px' },
                            bottom: '75px',
                            backgroundColor: 'primary.main',
                            border: '1px solid transparent',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'warning.main',
                            }
                        }}>
                        <Add fontSize='large' />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Filter Dialog */}
            <NoteFilterDialog />
            {/* Update or Delete Confirmation Dialog */}
            <UpdateDeleteConfirmDialog />
        </>
    )
}

export default NoteSection