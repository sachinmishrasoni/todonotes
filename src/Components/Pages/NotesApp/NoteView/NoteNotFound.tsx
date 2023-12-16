import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NoteNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container sx={{
                height: 'calc(100vh - 56px - 64px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant='h4' fontWeight={'bold'}>Oops!</Typography>
                <Typography variant='h5'>Note Not Found.</Typography>
                <Button onClick={() => navigate("/notes")}>Go to Notes</Button>
            </Container>
        </>
    )
}

export default NoteNotFound