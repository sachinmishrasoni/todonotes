import { Box, Button, Typography } from "@mui/material";
import { useContext } from 'react';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';

const DataNotFound = () => {
    const { dispatch } = useContext(AppDataContext);
    return (
        <>
            <Box sx={{
                height: 'calc(100vh - 55px - 60px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box>
                    <Typography variant="h4">Hi there,</Typography>
                    <Typography variant="h5">There is no added your todo.</Typography>
                    <Typography color={'gray'}>Please add your first todo and explore and enjoy this app.</Typography>
                    <Button variant="outlined" color="warning" sx={{ borderRadius: '25px', mt: 2 }} onClick={() => dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: true, mode: 'Add' } })}>Add Todo</Button>
                </Box>
            </Box>
        </>
    )
}

export default DataNotFound;