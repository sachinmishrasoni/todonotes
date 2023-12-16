import { useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TodoCard from './TodoCard';
import { AppDataContext, TodosData } from '../../../../AppContext/AppDataProvider';
import useDayFind from '../../../Hooks/useDayFind';
import InOutYmotion from '../../../Animation/InOutYmotion';


interface IDayCardProps {
    data: TodosData;
}

const DayCard = ({ data }: IDayCardProps) => {
    const { state } = useContext(AppDataContext);
    const { order } = state.todoOrderSort;
    return (
        <>
            <Box className='day-card' sx={{ userSelect: 'none' }}>
                <Stack mb={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='body2'>{useDayFind(data.date)} ({data.todos.length})</Typography>
                </Stack>
                <Stack flexDirection={order ? 'column' : 'column-reverse'} gap={1.5} >
                    {
                        data.todos.map((item, index) =>
                            <InOutYmotion key={index} >
                                <TodoCard data={item} />
                            </InOutYmotion>
                        )
                    }
                </Stack>
            </Box>
        </>
    )
}

export default DayCard