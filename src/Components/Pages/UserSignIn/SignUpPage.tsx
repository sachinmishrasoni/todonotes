import { ArrowForward, MoreHoriz, Close, Visibility, VisibilityOff, } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState, ChangeEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import TranslateXFramer from "../../Animation/TranslateXFramer";

interface ISignUp {
    closeBtnFunc: Function
}
// Regx
const nameExp = /^[A-Za-z]{2,50}$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userIdExp = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;
// const userPassExp = /^[[A-Za-z][A-Za-z0-9]{5,29}$]/;

const SignUpPage = ({ closeBtnFunc }: ISignUp) => {
    const [showPassword, setShowPassword] = useState(true);
    const [activeForm, setActiveForm] = useState('first_form');
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        userId: '',
        password: '',
        // pinCode: ''
    });
    const { firstName, lastName, emailAddress, userId, password } = signUpData;

    const UserInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'firstName'){
            if(nameExp.test(value)){
                console.log('valid name')
            }else{
                console.log('Invalid Name')
            }
        }else if(name === 'lastName'){

        }
        setSignUpData({ ...signUpData, [name]: value })
    }

    // Continue Button
    const continueBtnHandl = (activformbox: string) => {
        if (activformbox === 'first_form') {
            setActiveForm('second_form');
        }
    };
    return (
        <>
            <Paper sx={{ width: { xxs: 'auto', xs: '300px', sm: '350px', md: '400px' }, p: 2, px: 3, overflow: 'hidden', position: 'relative' }}>
                <Box className='header' sx={{ pb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontWeight={'bold'}>Sign In</Typography>
                    <Tooltip title='Close'>
                        <IconButton size="small" onClick={() => closeBtnFunc('userSelect')}>
                            <Close fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider />
                <Box className='form-box'>
                    <AnimatePresence mode="wait">
                        {/* First Form */}
                        {activeForm === 'first_form' && (
                            <TranslateXFramer key={'first_form'} exVal="-100vw">
                                <Box className='first-form' my={0.5}>
                                    <Typography variant="h6" textAlign={'center'} fontWeight={'600'}>Register with TodonoTes</Typography>
                                    <Typography variant="body2" mt={1}>Hey there, Create your account</Typography>
                                    <Stack display={'flex'} flexDirection={'column'} gap={1.5} mt={1}>
                                        <Stack display={'flex'} flexDirection={'row'} gap={1.5}>
                                            <TextField
                                                label='First Name'
                                                name="firstName"
                                                value={firstName}
                                                type="text"
                                                fullWidth
                                                required
                                                autoComplete="nope"
                                                onChange={UserInputHandler}
                                            />
                                            <TextField
                                                label='Last Name'
                                                name="lastName"
                                                value={lastName}
                                                type="text"
                                                fullWidth
                                                required
                                                autoComplete="nope"
                                                onChange={UserInputHandler}
                                            />
                                        </Stack>
                                        <TextField
                                            label='Email Address'
                                            name="emailAddress"
                                            value={emailAddress}
                                            type="email"
                                            fullWidth
                                            required
                                            autoComplete="nope"
                                            onChange={UserInputHandler}
                                        />
                                    </Stack>
                                </Box>
                            </TranslateXFramer>
                        )}

                        {/* Second Form */}
                        {activeForm === 'second_form' && (
                            <TranslateXFramer key={'second_form'} exVal="-100vw">
                                <Box className='second-form' my={0.5}>
                                    <Typography variant="h6" textAlign={'center'} fontWeight={'600'}>Create User Id & Password</Typography>
                                    <Stack display={'flex'} flexDirection={'column'} gap={1.5} mt={1}>
                                        <TextField 
                                        label="User I'd" 
                                        name="userId"
                                        value={userId}
                                        type="text" 
                                        fullWidth 
                                        required 
                                        autoComplete="nope" 
                                        onChange={UserInputHandler}
                                        />
                                        <FormControl fullWidth required>
                                            <InputLabel >Password</InputLabel>
                                            <OutlinedInput
                                                label="Password"
                                                name="password"
                                                value={password}
                                                onChange={UserInputHandler}
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
                                    </Stack>
                                </Box>
                            </TranslateXFramer>
                        )}
                    </AnimatePresence>

                    {/* Continue Button */}
                    <Stack display={'flex'} alignItems={'flex-end'} mt={1}>
                        <TranslateXFramer xVal="-100vw" durVal={1}>
                            <Tooltip title='Continue...'><Button onClick={() => continueBtnHandl(activeForm)}><MoreHoriz /><ArrowForward /></Button></Tooltip>
                        </TranslateXFramer>
                    </Stack>

                </Box>
            </Paper>
        </>
    )
}

export default SignUpPage;