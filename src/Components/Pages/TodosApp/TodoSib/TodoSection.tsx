import { useContext, useState } from 'react';
import { Add, Close, Done, List, MoreVert } from '@mui/icons-material';
import { Box, Chip, Divider, IconButton, Stack, Tooltip } from '@mui/material';
import AllTask from '../TaskCompo/AllTask';
import CompletedTask from '../TaskCompo/CompletedTask';
import UnCompletedTask from '../TaskCompo/UnCompletedTask';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import TodoHeaderBtnMenu from './TodoHeaderBtnMenu';
import InOutYmotion from '../../../Animation/InOutYmotion';

const TodoSection = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handlChip = (val: number) => {
        dispatch({
            type: 'TODOCHIPCHANGER',
            payload: {
                index: val,
                color: val === 0 ? 'warning' : val === 1 ? 'success' : 'error'
            }
        })
    }
    // Add Todo Button
    const AddTodoBtn = () => {
        dispatch({ type: 'MYDRAWER', payload: { isDrawerOpen: true, mode: 'Add' } });
    }

    const moreOptnBtnHandl = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <>
            <Box
                component={'section'}
                className='todos-sections'
                pb={8}
            >
                {/* Section Header Chip */}
                <Box px={1.5} py={0.5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={1.5} sx={{ overflowX: 'auto', '::-webkit-scrollbar': { display: 'none' } }}>
                        {
                            [
                                { name: 'All Todos', ico: List, color: 'warning' },
                                { name: 'Completed Todos', ico: Done, color: 'success' }, { name: 'UnCompleted Todos', ico: Close, color: 'error' }
                            ].map((item, index) => (
                                <InOutYmotion key={index}>
                                    <Chip

                                        label={item.name}
                                        size='small'
                                        clickable
                                        icon={<item.ico />}
                                        variant={state.todoChip.index === index ? 'filled' : 'outlined'}
                                        color={item.color === 'warning' ? 'warning' : item.color === 'success' ? 'success' : 'error'}
                                        sx={{ 
                                            fontWeight: state.todoChip.index === index ? '500' : 'none',
                                            // backgroundColor: (item.color === 'success' || item.color === 'error')? `${item.color}.main`: `${item.color}` 
                                        }}
                                        onClick={() => handlChip(index)}
                                    />
                                </InOutYmotion>
                            ))
                        }
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} px={1}>
                        {/* <Typography variant='caption'>00</Typography> */}
                        <IconButton size='small' onClick={(e) => moreOptnBtnHandl(e)}>
                            <MoreVert fontSize='small' />
                        </IconButton>
                    </Stack>
                </Box>
                <Divider />

                {/* Main Section for Show Data */}
                <Box component={'main'}>
                    {
                        state.todoChip.index === 0
                            ? <AllTask />
                            : state.todoChip.index === 1
                                ? <CompletedTask />
                                : <UnCompletedTask />
                    }
                </Box>

                {/* Add Todo Button */}
                {state.selectedTodoDate === 'all' && (
                    <Tooltip title='Add Todo'>
                        <IconButton
                            onClick={() => AddTodoBtn()}
                            size='medium'
                            sx={{
                                position: 'fixed',
                                right: { xxs: '25px', lg: '200px' },
                                bottom: '75px',
                                backgroundColor: 'primary.main',
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'secondary.main',
                                    // borderColor: 'orange'
                                }
                            }}>
                            <Add fontSize='large' />
                        </IconButton>
                    </Tooltip>
                )}

            </Box>

            <TodoHeaderBtnMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    )
}

export default TodoSection;