import { MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const SmDashBar = () => {
    const [chipIndex, setChipIndex] = useState(0);
    const handlTask = () => {
        setChipIndex(chipIndex + 1);
        if (chipIndex === 2) setChipIndex(0);
    }

    return (
        <>
            <Paper className='header-sm-dashboard' component={'header'}
                sx={{
                    py: 0.5, px: 2, pt: 2,
                    width: '100%',
                    position: 'sticky', top: '0px',
                    borderRadius: '0 0 15px 15px',
                    borderBottom: '2px solid orange',
                    // backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
                    zIndex: 10,
                    userSelect: 'none'
                }}
            >
                {/* Show Box */}
                <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack justifyContent={'center'} alignItems={'center'}>
                        <Typography variant='h5' fontWeight={600}>My Tasks</Typography>
                        <Select
                            value={0}
                            size='small'
                            variant='standard'
                            sx={{
                                fontSize: '0.75rem',
                                border: 'none ',
                                '&::before': {
                                    borderBottom: 'none'
                                },
                                '&:hover::before': {
                                    borderBottom: 'none !important'
                                },
                                '&::after': {
                                    borderBottom: 'none !important'
                                },
                                '& .MuiSelect-select': {
                                    padding: '0 20px 0px 10px !important',
                                    border: 'none'
                                },
                                '& .MuiSvgIcon-root': {
                                    right: 0
                                },
                                '& .MuiSelect-select .MuiList-root': {
                                    fontSize: '0.75rem',
                                    backgroundColor: 'orange'
                                }

                            }}
                        >
                            <MenuItem value={0} >All Day</MenuItem>
                            <MenuItem value={1} >Today</MenuItem>
                            <MenuItem value={2} >Yesterday</MenuItem>
                            <MenuItem value={3} >Custom</MenuItem>
                        </Select>
                    </Stack>

                    <Stack justifyContent={'center'} alignItems={'center'} sx={{ minWidth: 95, px: 1, py: 0.5, borderRadius: '10px', cursor: 'pointer', boxShadow: '1px 1px 5px black inset', '&:hover': { backgroundColor: 'rgba(0,0,0,0.3)' } }} onClick={() => handlTask()}>
                        <Typography variant='caption'>{chipIndex === 0 ? 'All Task' : chipIndex === 1 ? 'Completed' : 'Uncompleted'}</Typography>
                        <Typography variant='h5' fontWeight={600}>0</Typography>
                        {/* <Typography variant='caption'>Task</Typography> */}
                    </Stack>
                </Stack>
            </Paper>
        </>
    )
}

export default SmDashBar;