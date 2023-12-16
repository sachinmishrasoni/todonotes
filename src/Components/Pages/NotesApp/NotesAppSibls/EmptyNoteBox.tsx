import { useContext } from 'react';
import { Button, Container, Typography } from '@mui/material';
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
                <Typography variant='h5' >Opps!</Typography>
                <Typography variant='h4' fontWeight={'bold'}>Notes Not Found</Typography>
                <Button
                    size='small'
                    variant='outlined'
                    color='warning'
                    sx={{ borderRadius: 25, mt: 1 }}
                    onClick={() => CreateBtn()}
                >Create your first Note</Button>
            </Container>
        </>
    )
}

export default EmptyNoteBox