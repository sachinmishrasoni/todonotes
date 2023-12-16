import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box className='page-not-found' sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant='h3' fontWeight={'bold'}>404</Typography>
                <Typography variant='h4'>Page Not Found</Typography>
                <Typography variant='caption' color={'gray'}>Sorry, an unexpected error has occurred.</Typography>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Box>
        </>
    )
}

export default PageNotFound