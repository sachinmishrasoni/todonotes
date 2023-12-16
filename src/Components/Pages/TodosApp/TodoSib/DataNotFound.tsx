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
                <Typography variant="h3" fontWeight={'bold'}>Oops!</Typography>
                <Typography variant="h5">Todo is not added.</Typography>
                <Button variant="outlined" color="warning" sx={{ borderRadius: '25px' }} onClick={() => dispatch({type: 'MYDRAWER', payload: {isDrawerOpen: true, mode: 'Add'}})}>Add Todo</Button>
            </Box>
        </>
    )
}

export default DataNotFound;