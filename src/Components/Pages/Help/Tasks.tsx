import { Add, Close, Done, List, MoreVert } from '@mui/icons-material';
import { Box, Chip, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import AllTask from '../TodosApp/TaskCompo/AllTask';
import CompletedTask from '../TodosApp/TaskCompo/CompletedTask';
import UnCompletedTask from '../TodosApp/TaskCompo/UnCompletedTask';

interface ITasksProps {
    hideFunc: Function
}


const Tasks = ({ hideFunc }: ITasksProps) => {
    const [chipIndex, setChipIndex] = useState(0);

    const handlChip = (val: number) => {
        setChipIndex(val);
    }

    // -------------- for Scroll --------------- //
    const [headerHide, setHeaderHide] = useState(true);
    const divRef = useRef<HTMLDivElement | null | any>(null);
    useEffect(() => {
        const divElement = divRef.current;
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = divElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll Down
                // console.log('down')
                if (scrollTop >= 100) {
                    setHeaderHide(false)
                    hideFunc(false)
                }
            } else {
                // Scroll Up
                setHeaderHide(true);
                hideFunc(true);
            }
            // 
            lastScrollTop = scrollTop;
        }

        // Add Eventlistenr
        divElement?.addEventListener('scroll', handleScroll);
        return () => {
            divElement?.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Add Buttton
    const AddBtn = () => {
        // setIsTaskDrawerOpen(true);
    }

    return (
        <>
            <Box
                id="task-box"
                ref={divRef}
                height={headerHide ? 'calc(100%)' : 'calc(100%)'}
                overflow={'auto'}
                // mb={10}
                sx={{ transition: 'all 0.5s' }}
            >
                <Container disableGutters sx={{ position: 'relative', overflowX: 'hidden' }}>
                    {/* Chip Buttons on top */}
                    <Box pl={1} pt={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} spacing={1.5} sx={{ overflowX: 'auto', '::-webkit-scrollbar': { display: 'none' } }}>
                            {
                                [
                                    { name: 'All Tasks', ico: List, color: 'warning' },
                                    { name: 'Completed Tasks', ico: Done, color: 'success' }, { name: 'Uncompleted Tasks', ico: Close, color: 'error' }
                                ].map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item.name}
                                        size='small'
                                        clickable
                                        icon={<item.ico />}
                                        variant={chipIndex === index ? 'filled' : 'outlined'}
                                        color={item.color}
                                        sx={{ fontWeight: chipIndex === index ? '500' : 'none' }}
                                        onClick={() => handlChip(index)}
                                    />
                                ))
                            }
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'} px={1}>
                            <Typography variant='caption'>00</Typography>
                            <IconButton size='small'>
                                <MoreVert fontSize='small' />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Main Section for Show Data */}
                    <Box component={'main'}>
                        {
                            chipIndex === 0
                                ? <AllTask />
                                : chipIndex === 1
                                    ? <CompletedTask />
                                    : <UnCompletedTask />
                        }
                    </Box>

                    {/* Add Todo Button */}
                    <Tooltip title='Add Todo'>
                        <IconButton
                            onClick={() => AddBtn()}
                            size='medium'
                            sx={{
                                position: 'fixed',
                                right: { xxs: '25px', lg: '225px' },
                                bottom: '75px',
                                backgroundColor: 'primary.main',
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'warning.dark',
                                    borderColor: 'orange'
                                }
                            }}>
                            <Add fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </Container >
            </Box >

        </>
    )
}

export default Tasks