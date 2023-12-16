import { Box, Stack, Typography } from '@mui/material'
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import { useContext, useState, useEffect } from 'react';
import DayCard from '../TodoSib/DayCard';
import InOutYmotion from '../../../Animation/InOutYmotion';

const AllTask = () => {
    const { state } = useContext(AppDataContext);
    const { sort } = state.todoOrderSort;
    const [data, setData] = useState(state.todosData);
    // const DayWiseTodoData = state.selectedTodoDate === 'all'
    //     ? state.todosData
    //     : state.todosData.filter((obj) => obj.date === state.selectedTodoDate)

    useEffect(() => {
        if (state.selectedTodoDate === 'all') {
            setData(state.todosData)
        } else {
            setData(state.todosData.filter((obj) => obj.date === state.selectedTodoDate))
        }
    }, [state]);

    return (
        <>
            {
                state.todosData.length >= 1
                    ? (
                        <Stack className='all-task-box' component={'section'} direction={sort ? 'column-reverse' : 'column'} gap={1.5} px={1.5} overflow={'hidden'}>
                            {
                                data.map((items, index) => <InOutYmotion key={index}><DayCard data={items} /></InOutYmotion>)
                            }
                        </Stack>
                    )
                    : (
                        <Box sx={{ height: 'calc(100vh - 65px - 55px - 38px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h4' fontWeight={'bold'} color={'gray'}>No Todo</Typography>
                        </Box>
                    )
            }
        </>
    )
}

export default AllTask