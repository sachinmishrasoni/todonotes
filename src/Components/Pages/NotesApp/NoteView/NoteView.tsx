import { ArrowBack, Edit } from '@mui/icons-material';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import NoteDialog from '../NotesAppSibls/NoteDialog';
import UpdateDeleteConfirmDialog from '../NotesAppSibls/UpdateDeleteConfirmDialog';

const NoteView = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppDataContext);
    const noteData = state.notesData.filter((obj) => obj.id.toString() === noteId)[0];

    const EditBtn = () => {
        dispatch({
            type: 'NOTEDIALOGHANDLER',
            payload: {
                isDialogOpen: true,
                mode: 'update',
                data: {
                    id: noteData.id,
                    date: noteData.userDate
                }
            }
        })
    }

    return (
        <>
            <Container disableGutters sx={{ p: 1.5, pb: 9, pt: 0 }}>
                <Stack direction={'row'}>
                    <Tooltip title='Back'>
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBack />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack>
                    <Typography variant='h3' textTransform={'capitalize'}>{noteData.heading}</Typography>
                    <Typography variant='caption' color={'gray'} ml={0.5} mt={0.5}>{noteData.userDate} | {dayjs(noteData.currDateTime).format("hh:mm A")}</Typography>
                </Stack>

                <Box
                    component={'section'}
                    className='content'
                    mt={2}
                    // p={1.5}
                    position={'relative'}
                    minHeight={'calc(100vh - 325px)'}
                >
                    <Typography textAlign={'justify'}>
                        {noteData.notes}
                    </Typography>
                </Box>

                <Box className='footer' position={'relative'} mt={4} mb={2} sx={{ opacity: 0.8 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '2px',
                            backgroundColor: 'gray'
                        }}
                    />
                    <Typography variant='caption' fontWeight={'bold'} sx={{
                        backgroundColor: 'gray',
                        borderRadius: '15px',
                        px: 1,
                        position: 'absolute',
                        left: '50%',
                        top: -9,
                        transform: 'translateX(-50%)'
                    }}>The End</Typography>
                </Box>

                <Tooltip title='Edit'>
                    <IconButton
                        onClick={() => EditBtn()}
                        size='large'
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
                        <Edit />
                    </IconButton>
                </Tooltip>
                
                <NoteDialog />
                <UpdateDeleteConfirmDialog />
            </Container>
        </>
    )
}

export default NoteView