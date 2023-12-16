import { Paper, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

const NotesCoverCard = () => {
    let arr = ["2023-05-11", "2022-05-10", "2023-05-25", "2023-07-11", "2023-03-11", "2003-05-11", "2003-06-11"]
    function DayCount(start: string, end: string){
        let startDate = dayjs(start);
        let endDate = dayjs(end);
        return startDate.diff(endDate, 'day')
    }

    console.log(arr.sort())
    return (
        <>
            <Paper sx={{
                width: '175px',
                height: '215px',
                // p: 2,
                borderRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '2px 3px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative'
            }}>
                <Typography variant='h6' fontWeight={'bold'}>My Story</Typography>
                <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} position={'absolute'} bottom={0} px={1.5} pb={1}>
                    <Typography variant='caption' fontWeight={'bold'} color={'grey'}>24 Feb</Typography>
                    <Typography variant='caption' fontWeight={'bold'} color={'grey'}>Page: 05</Typography>
                </Stack>
            </Paper>
        </>
    )
}

export default NotesCoverCard