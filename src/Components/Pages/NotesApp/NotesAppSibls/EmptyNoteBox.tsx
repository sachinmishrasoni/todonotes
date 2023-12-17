import { useContext } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';

const EmptyNoteBox = () => {
    const { dispatch } = useContext(AppDataContext);
    const CreateBtn = () => {
        dispatch({
            type: 'NOTEDIALOGHANDLER',
            payload: {
                isDialogOpen: true,
                mode: 'add',
                data: {}
            }
        })
    }
    return (
        <>
            <Container
                sx={{
                    height: 'calc(100vh - 60px - 56px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="h4">Hi there,</Typography>
                    <Typography variant="h5">There is no added your notes</Typography>
                    <Typography color={'gray'}>Please add your first note and explore and enjoy this app.</Typography>
                    <Button
                        size='small'
                        variant='outlined'
                        color='warning'
                        sx={{ borderRadius: 25, mt: 1 }}
                        onClick={() => CreateBtn()}
                    >Create your first Note</Button>
                </Box>
            </Container>
        </>
    )
}

export default EmptyNoteBox