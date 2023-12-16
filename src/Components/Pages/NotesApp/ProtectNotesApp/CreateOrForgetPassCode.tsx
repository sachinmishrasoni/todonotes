import React, { ChangeEvent, useState, useContext } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import InOutYmotion from '../../../Animation/InOutYmotion';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';

const numCheck = /^\d+$/

const CreateOrForgetPassCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const myPath = location.pathname.slice(7);
    const { dispatch } = useContext(AppDataContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [passcode, setPasscode] = useState({
        newPasscode: '',
        confirmPasscode: ''
    });
    const { newPasscode, confirmPasscode } = passcode;
    const [isError, setIsError] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const inputFieldHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value.match(numCheck)) {
            setPasscode((prev) => ({ ...prev, [name]: value }));
        } else {
            console.log('only digit allow')
        }
        setIsError(false)
    }
    const SubmitBtn = (path: string) => {
        if (newPasscode === confirmPasscode) {
            if (path === 'createpasscode') {
                dispatch({ type: 'NOTE_LOCK_HANDLE', payload: { isLocked: false, isLockPageActive: true, passCode: passcode.confirmPasscode } })
                navigate('/notes');
                dispatch({ type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Successfully Created Passcode' } })
            }
            else if (path === 'forgetpasscode') {
                dispatch({ type: 'NOTE_LOCK_HANDLE', payload: { isLocked: false, isLockPageActive: true, passCode: passcode.confirmPasscode } });
                navigate('/notes');
                dispatch({ type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'success', message: 'Successfully Passcode Changed.' } })
            }
        } else {
            setIsError(true)
        }
    }
    return (
        <>
            <Container disableGutters
                sx={{
                    height: 'calc(100vh - 56px - 60px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Paper sx={{
                    p: 2,
                    maxWidth: '600px',
                    backdropFilter: 'blur(5px)',
                    // backgroundColor: 'steelblue',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Stack>
                        {
                            myPath === 'createpasscode'
                                ? <Typography variant='h6'>Create Passcode</Typography>
                                : <Typography variant='h6'>Reset Passcode</Typography>
                        }

                        <Box overflow={'hidden'}>
                            {
                                !isError
                                    ? <InOutYmotion key={'info'}><Typography variant='caption' color={'gray'}>You can create only 4 digit passcode.</Typography></InOutYmotion>
                                    : <InOutYmotion key={'error'}><Typography variant='caption' color={'error'}>Given passcode doesn't match.</Typography></InOutYmotion>
                            }
                        </Box>
                    </Stack>
                    <Stack mt={1} mb={2}>
                        <FormControl sx={{ mt: 1, width: '25ch' }} variant="outlined" size='small'>
                            <InputLabel htmlFor="new-passcode">New Passcode</InputLabel>
                            <OutlinedInput
                                id="new-passcode"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{ maxLength: 4 }}
                                value={newPasscode}
                                label="New Passcode"
                                name='newPasscode'
                                onChange={inputFieldHandle}
                            />
                        </FormControl>
                        <FormControl sx={{ mt: 1, width: '25ch' }} variant="outlined" size='small'>
                            <InputLabel htmlFor="confirm-passcode">Confirm Passcode</InputLabel>
                            <OutlinedInput
                                id="confirm-passcode"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{ maxLength: 4 }}
                                value={confirmPasscode}
                                label="Confirm Passcode"
                                name='confirmPasscode'
                                onChange={inputFieldHandle}
                            />
                        </FormControl>
                    </Stack>
                    <Stack>
                        <Button
                            variant='outlined'
                            disabled={newPasscode.length === 4 && confirmPasscode.length === 4 ? false : true}
                            onClick={() => SubmitBtn(myPath)}
                        >Submit</Button>
                    </Stack>
                </Paper>


            </Container>
        </>
    )
}

export default CreateOrForgetPassCode;  