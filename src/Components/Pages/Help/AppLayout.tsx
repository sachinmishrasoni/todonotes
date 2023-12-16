import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import Header from '../Layouts/Header';
import BottomNavBar from '../Layouts/BottomNavBar';
import Tasks from './Tasks';
import Notes from './Notes';

const AppLayout = () => {
    const [isHideHeader, setIsHideHeader] = useState(true);
    const [activeBox, setActiveBox] = useState('tasks');
    const activeBoxFunc = (box: string) => {
        if (box === 'tasks') setActiveBox('tasks')
        else setActiveBox('notes')
    };

    const myFunc = (val: boolean) => {
        setIsHideHeader(val)
    }

    return (
        <>
            <Header boolVal={isHideHeader} />
            <Divider />
            <Box
                component={'main'}
                // bgcolor={'lightskyblue'}
                height={{ xxs: 'calc(100vh - 60px - 55px)', md: 'calc(100vh - 62px)' }}
                sx={{
                    // backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
                }}
            >
                {
                    activeBox === 'tasks'
                        ? <Tasks hideFunc={myFunc} />
                        : <Notes setIsHideHeader={setIsHideHeader} />
                }
            </Box>
            <BottomNavBar activeBoxFunc={activeBoxFunc} />
        </>
    )
}

export default AppLayout;