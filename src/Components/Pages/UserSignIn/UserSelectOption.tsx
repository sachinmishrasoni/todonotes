import { useState, useContext } from 'react';
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import TodoImg from '../../../assets/image/todo.png';
import { Create, Person, PersonAddAlt1, DarkMode, LightMode } from "@mui/icons-material";
import LogInPage from './LogInPage';
import SignUpPage from './SignUpPage';
import { AnimatePresence } from 'framer-motion';
import ScaleFramer from '../../Animation/ScaleFramer';
import TranslateXFramer from '../../Animation/TranslateXFramer';
import { ThemeContext } from '../../../Theme/AppThemeProvider';
import ModeBtnFramer from '../../Animation/ModeBtnFramer';

const UserSelectOption = () => {
    const consumer = useContext(ThemeContext);
    const { toggleThemeMode } = consumer.Customization;
    const [isDarkModeActive, setIsDarkModeAcitve] = useState(true)
    const [whichUser, setWhichUser] = useState('');

    const userBtn = (value: string) => {
        setWhichUser(value);
    }

    // Toggle Button for Dark mode to Light Mode
    const ModeToggleBtn = () => {
        setIsDarkModeAcitve(!isDarkModeActive)
        toggleThemeMode();
    }
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box className='heading' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        className="upDownAnimation"
                        component={'img'}
                        title="Logo"
                        height={{ xxs: 75, md: 100 }}
                        src={TodoImg}
                    />
                    <Stack
                        sx={{
                            mb: 3,
                            position: 'relative',
                            '& .appname span': { position: 'relative' },
                            '& .appname span::after': {
                                content: '""',
                                position: 'absolute',
                                right: 0,
                                top: 7,
                                width: '100%',
                                height: '4px',
                                borderRadius: '10px',
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black'
                            },
                            '& .appname .pencil-icon': {
                                position: 'absolute',
                                top: -10,
                                right: -15
                            }
                        }}>
                        <Typography className="appname" variant="h4" fontWeight={'bold'} textAlign={'center'} fontFamily={'Merienda'}>Todo<span>noTes</span>.<Create className="pencil-icon" /></Typography>
                        <Typography variant="caption" textAlign={'center'} fontWeight={'bold'} sx={{ width: '100%', position: 'absolute', bottom: -15 }}>-: Todo+Notes :-</Typography>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        '& .btnBoxes': {
                            display: 'flex',
                            flexDirection: { xxs: 'column', xs: 'row' },
                            justifyContent: 'center',
                            gap: { xxs: 2, xs: 5 },
                        },
                        '& .user-section-btn': {
                            width: { xxs: '175px', xs: '125px' },
                            height: '125px',
                            padding: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '15px',
                            userSelect: 'none',
                            boxShadow: (theme) => theme.palette.mode === 'dark'
                                ? '3px 3px 5px rgba(0, 0, 0, 0.5), -3px -3px 5px rgba(255, 255, 255, 0.2)'
                                : '3px 3px 5px rgba(0, 0, 0, 0.3), -3px -3px 5px rgba(255, 255, 255, 0.9)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in'
                        },
                        '& .user-section-btn .btntext': {
                            fontWeight: 'bolder',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            lineHeight: '1.2',
                            textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)'
                        },
                        '& .user-section-btn:active': {
                            transform: 'scale(0.8)',
                            transition: 'all 0.2s ease-in'
                        }
                    }}
                >
                    <AnimatePresence mode='wait'>
                        {
                            whichUser === 'logIn'
                                ? (
                                    <ScaleFramer keyName={'loginpage'}>
                                        <LogInPage closeBtnFunc={userBtn} />
                                    </ScaleFramer>
                                )
                                : whichUser === 'signIn'
                                    ? (
                                        <ScaleFramer keyName={'signinpage'}>
                                            <SignUpPage closeBtnFunc={userBtn} />
                                        </ScaleFramer>
                                    )
                                    : (
                                        <Box className='btnBoxes'>
                                            <TranslateXFramer keyName={'logbtn'} xVal='-100vw'>
                                                <Button className='user-section-btn' onClick={() => userBtn('logIn')}>
                                                    <Box className='logIn-btnBox'>
                                                        <Person sx={{ fontSize: '2.5rem' }} />
                                                        <Typography variant='h6' className="btntext">LogIn</Typography>
                                                    </Box>
                                                </Button>
                                            </TranslateXFramer>


                                            <TranslateXFramer keyName={'signbtn'} xVal='100vw'>
                                                <Button className='user-section-btn' onClick={() => userBtn('signIn')}>
                                                    <Box className='signUp-btnBox'>
                                                        <PersonAddAlt1 sx={{ fontSize: '2.5rem' }} />
                                                        <Typography variant='h6' className="btntext">SignUp</Typography>
                                                        <Typography variant="caption" textTransform={'capitalize'} >New User</Typography>
                                                    </Box>
                                                </Button>
                                            </TranslateXFramer>
                                        </Box>
                                    )
                        }
                    </AnimatePresence>

                </Box>

                {/* Button for toggle mode dark to light */}
                <Box sx={{ position: 'absolute', right: '25px', top: '25px' }}>
                    <Tooltip title={isDarkModeActive ? 'Light Mode' : 'Dark Mode'}>
                        <IconButton onClick={() => ModeToggleBtn()} sx={{ overflow: 'hidden' }}>
                            <AnimatePresence mode='wait'>
                                {isDarkModeActive && (<ModeBtnFramer keyName={'light'}>< LightMode /></ModeBtnFramer>)}
                                {!isDarkModeActive && (<ModeBtnFramer keyName={'dark'}><DarkMode /></ModeBtnFramer>)}
                            </AnimatePresence>
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Footer */}
                <Tooltip title='Sachin Mishra Soni'>
                    <Typography variant="caption" sx={{ p: 0.5, position: 'absolute', bottom: '0' }}>DevelopBy @Sam</Typography>
                </Tooltip>
            </Box>
        </>
    )
}

export default UserSelectOption;