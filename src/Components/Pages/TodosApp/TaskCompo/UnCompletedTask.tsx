import { Box, Stack, Typography } from '@mui/material'
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import { useContext } from 'react';
import DayCard from '../TodoSib/DayCard';
import InOutYmotion from '../../../Animation/InOutYmotion';

const UnCompletedTask = () => {
    const { state } = useContext(AppDataContext);
    const { sort } = state.todoOrderSort;

    const DayWiseTodoData = state.selectedTodoDate === 'all'
        ? state.todosData
        : state.todosData.filter((obj) => obj.date === state.selectedTodoDate);

    const todoFilterData = [
        ...DayWiseTodoData.map((obj) => {
            return { ...obj, todos: obj.todos.filter((item) => item.isComplete === false) }
        })
    ];
    const filterData = todoFilterData.filter((obj) => obj.todos.length >= 1);

    return (
        <>
            {
                filterData.length >= 1
                    ? (
                        <Stack className='uncompleted-task-box' component={'section'} direction={sort ? 'column-reverse' : 'column'} gap={1.5} px={1.5} overflow={'hidden'}>
                            {
                                filterData.map((items, index) => <InOutYmotion key={index}><DayCard data={items} /></InOutYmotion>)
                            }
                        </Stack>
                    )
                    : (
                        <Box sx={{ height: 'calc(100vh - 60px - 56px - 50px - 10px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='body2' fontWeight={'bold'} color={'gray'}>UnCompleted Todo</Typography>
                            <Typography variant='h3' fontWeight={'bold'} color={'gray'}>Not Found</Typography>
                        </Box>
                    )
            }
        </>
    )
}

export default UnCompletedTask;