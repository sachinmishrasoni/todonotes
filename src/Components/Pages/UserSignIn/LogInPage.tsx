import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Close, Visibility, VisibilityOff, Edit, ArrowForward, MoreHoriz } from "@mui/icons-material";
import { useState, ChangeEvent } from 'react';
import { AnimatePresence } from 'framer-motion'
import TranslateXFramer from '../../Animation/TranslateXFramer';
import NotifySnackBar from '../../GobalCompo/NotifySnackBar';

interface ILogIn {
    closeBtnFunc: Function
}
export interface INotifySB {
    isOpen: boolean;
    alertType: string;
    message: string;
}

const userIdRegx = /^[A-Za-z][A-Za-z0-9_]{5,29}$/
const LogInPage = ({ closeBtnFunc }: ILogIn) => {
    const [showPassword, setShowPassword] = useState(true);
    const [activeForm, setActiveForm] = useState('first_form')
    const [whichPassw, setWhichPassw] = useState('Pin');
    const [logInData, setLogInData] = useState({
        user_id: '',
        user_pass: ''
    });
    const [validUser, setValidUser] = useState({
        isIdValid: false,
        isPassValid: false
    });

    const [notifyBarProps, setNotifyBarProps] = useState<INotifySB>({
        isOpen: false,
        alertType: 'info',
        message: ''
    });

    const UserInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'user_id') {
            if (userIdRegx.test(value) && logInData.user_id.trim() !== '') {
                setValidUser({ ...validUser, isIdValid: true });
            }
            else {
                setValidUser({ ...validUser, isIdValid: false });
            }
        }
        setLogInData({ ...logInData, [name]: value })
    };

    const ContinueBtnHandl = (activeformBox: string) => {
        if (activeformBox === 'first_form') {
            if (validUser.isIdValid === true) {
                console.log(logInData)
                setActiveForm('second_form');
            } else if (logInData.user_id.trim() === '') {
                // console.log('Please Enter User Id');
                setNotifyBarProps({ ...notifyBarProps, isOpen: true, alertType: 'error', message: 'Please Enter User Id' });
            }
            else {
                // console.log('Not match');
                setNotifyBarProps({ ...notifyBarProps, isOpen: true, alertType: 'warning', message: 'Invalid User' });
            }

        }
        // else if (activeformBox === 'password') setUserContVal('user_id')
    }

    const PassChanger = () => {
        if (whichPassw === 'Pin') setWhichPassw('Password')
        else setWhichPassw('Pin')
    }


    return (
        <>
            <Paper sx={{ width: { xxs: 'auto', xs: '300px', sm: '350px', md: '400px' }, p: 2, px: 3, overflow: 'hidden', position: 'relative' }}>
                <Box className='header' sx={{ pb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontWeight={'bold'}>Log In</Typography>
                    <Tooltip title='Close'>
                        <IconButton size="small" onClick={() => closeBtnFunc('userSelect')}>
                            <Close fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider />
                <Box className='form-box'>
                    <AnimatePresence mode='wait'>
                        {/* First Form */}
                        {activeForm === 'first_form' && (
                            <TranslateXFramer keyName='first_form' exVal="-100vw" durVal={0.5} style={{ width: '100%' }}>
                                <Typography variant='h6' fontWeight={'600'} textAlign={'center'} my={1}>Welcome Back</Typography>
                                <FormControl fullWidth required>
                                    <InputLabel>User I'd</InputLabel>
                                    <OutlinedInput
                                        label="User i'd"
                                        name='user_id'
                                        type='text'
                                        value={logInData.user_id}
                                        onChange={UserInputHandler}
                                    />
                                </FormControl>
                            </TranslateXFramer>
                        )}

                        {/* Second Form */}
                        {activeForm === 'second_form' && (
                            <TranslateXFramer keyName='second_form' exVal="-100vw" durVal={0.5} style={{ width: '100%' }}>
                                <Typography variant='h6' fontWeight={'600'} textAlign={'center'} my={1}>Enter Your {whichPassw}</Typography>
                                <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                                    {/* Text feild Read only */}
                                    <TranslateXFramer>
                                        <FormControl fullWidth>
                                            <InputLabel>User I'd</InputLabel>
                                            <OutlinedInput
                                                label="User i'd"
                                                type='text'
                                                defaultValue={logInData.user_id}
                                                disabled
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton size='small' onClick={() => setActiveForm('first_form')}>
                                                            <Edit fontSize='small' />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </TranslateXFramer>

                                    {/* Text feild for Pin Boxes */}
                                    {whichPassw === 'Pin' && (
                                        <Stack sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            gap: 1,
                                            '& .MuiInputBase-input': {
                                                width: '1.5em',
                                                height: '1.5em',
                                                padding: '10px',
                                                fontSize: '1.5rem',
                                                textAlign: 'center'
                                            }
                                        }}>
                                            {[0, 1, 2, 3].map((item) => <TranslateXFramer key={item} durVal={1} ><TextField key={item} autoComplete='nope' /></TranslateXFramer>)}
                                        </Stack>
                                    )}

                                    {/* Text feild for Password */}
                                    {whichPassw === 'Password' && (
                                        <TranslateXFramer durVal={1}>
                                            <FormControl fullWidth required>
                                                <InputLabel >Password</InputLabel>
                                                <OutlinedInput
                                                    // size='small'
                                                    label="Password"
                                                    type={showPassword ? 'password' : 'text'}
                                                    endAdornment={
                                                        <InputAdornment position='end'>
                                                            <IconButton size='small' onClick={() => setShowPassword(!showPassword)} onMouseDown={() => setShowPassword(!showPassword)}>
                                                                {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    sx={{
                                                        '& input[type="password"]::-ms-reveal, input[type="password"]::-ms-clear': {
                                                            display: 'none'
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </TranslateXFramer>
                                    )}

                                </Box>

                                <Stack mt={1} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <Typography variant='caption'>Log In with &nbsp;
                                        <Typography onClick={() => PassChanger()} variant='caption' sx={{ cursor: 'pointer', userSelect: 'none', textDecoration: 'underline' }}>{whichPassw === 'Pin' ? "Password" : "Pin Code"}</Typography>
                                    </Typography>

                                    <Typography variant='caption' sx={{ cursor: 'pointer', userSelect: 'none', textDecoration: 'underline' }}>Forget Pin/Password</Typography>
                                </Stack>
                            </TranslateXFramer>
                        )}
                    </AnimatePresence>

                    {/* Continue Button */}
                    <Stack display={'flex'} alignItems={'flex-end'} mt={1}>
                        <TranslateXFramer xVal="-100vw" durVal={1}>
                            <Tooltip title='Continue...'><Button onClick={() => ContinueBtnHandl(activeForm)}><MoreHoriz /><ArrowForward /></Button></Tooltip>
                        </TranslateXFramer>
                    </Stack>
                </Box>
                {/* Notification Bar */}
                <NotifySnackBar notifyBarProps={notifyBarProps} setNotifyBarProps={setNotifyBarProps} />
            </Paper>
        </>
    )
}

export default LogInPage