import { Box, Button, Container, Paper, Tooltip, Typography } from '@mui/material';
import { Notes, Checklist } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const BottomNavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState<string>(location.pathname === "/" ? 'todos' : 'notes');

    const handleBtn = (actvBtn: string) => {
        setIsActive(actvBtn);
        navigate(actvBtn === 'todos' ? "/" : "/notes", {});

        window.scrollTo({ top: 0 });
    }
    useEffect(() => { setIsActive(location.pathname === "/" ? 'todos' : 'notes') }, [location])
    return (
        <>
            <Box className='bottom-navbar' component={'footer'}
                sx={{
                    width: '100%',
                    position: 'fixed',
                    // left: 0,
                    bottom: '0px',
                    zIndex: '500',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Container disableGutters>
                    <Paper sx={{
                        width: { xxs: '100%', md: '100%' },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        // borderTop: '1px solid orange',
                        borderRadius: '10px 10px 0 0',
                        backgroundColor: 'myThemeColors.primary',
                        boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
                        '& .MuiButtonBase-root': {
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '5px 0 5px 0'
                        },
                        '& .MuiButtonBase-root .MuiTypography-root': {
                            fontSize: { xxs: '0.40rem', sm: '0.50rem' },
                            fontWeight: 'bold',
                            backgroundColor: 'myThemeColors.highlight',
                            color: 'black',
                            borderRadius: '50px',
                            padding: { xxs: '1px 7px', md: '1px 7px' },
                            transform: 'translateY(10px)',
                            opacity: 0,
                            transition: 'all 0.3s ease-in'
                        },
                        '& .MuiButtonBase-root .MuiSvgIcon-root': {
                            fontSize: '1.8rem',
                            transform: 'translateY(5px)',
                            transition: 'all 0.3s ease-in'
                        },
                        '& .MuiButtonBase-root.activeBtn .MuiTypography-root': {
                            opacity: 1,
                            transform: 'translateY(0px)'
                        },
                        '& .MuiButtonBase-root.activeBtn .MuiSvgIcon-root': {
                            transform: 'translateY(0px)',
                        }
                    }} >
                        <Tooltip title='Todos'>
                            <Button
                                className={isActive === 'todos' ? 'activeBtn' : ''}
                                fullWidth
                                onClick={() => handleBtn('todos')}
                                sx={{
                                    color: (theme) => theme.palette.mode === 'dark'? '' : 'rgba(0, 0, 0, 0.87)'
                                }}
                            >
                                <Checklist />
                                <Typography variant='caption'>ToDos</Typography>
                            </Button>
                        </Tooltip>
                        <Tooltip title='Notes'>
                            <Button 
                            className={isActive === 'notes' ? 'activeBtn' : ''} 
                            fullWidth 
                            onClick={() => handleBtn('notes')}
                            sx={{
                                color: (theme) => theme.palette.mode === 'dark'? '' : 'rgba(0, 0, 0, 0.87)'
                            }}
                            >
                                <Notes />
                                <Typography variant='caption'>Notes</Typography>
                            </Button>
                        </Tooltip>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default BottomNavBar;