import React, { ChangeEvent, useState, useRef, useEffect, useContext } from 'react';
import { Button, Container, Paper, Stack, TextField, Typography, styled } from '@mui/material'
import { Lock } from '@mui/icons-material'
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import { useNavigate } from 'react-router-dom';

const CustomTextField = styled(TextField)({
    '&.MuiFormControl-root': {
        width: '50px',

    },
    '& .MuiInputBase-root': {
        height: '50px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        borderRadius: '50%'
    },
    '& .MuiInputBase-input': {
        textAlign: 'center'
    }
});
// /^[0-9\b]+$/ || /^\d+$/
// const numCheck = /^\d+$/;

const PassCodeBox = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppDataContext);
    const { isLocked, isLockPageActive, passCode } = state.noteLock;
    const [passValue, setPassValue] = useState(new Array(4).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
    const [isShow, setIsShow] = useState(true);

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;

        // Update the state with the new value
        const newPassValue = [...passValue];
        newPassValue[index] = value.substring(value.length - 1);
        setPassValue(newPassValue);

        // Auto-focus on the next input if there is a value
        if (value !== '' && index < passValue.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Unfocus after the last box is filled
        if (value !== '' && index === passValue.length - 1) {
            inputRefs.current[index]?.blur();
        }

    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLDivElement>) => {
        // Handle backspace to clear the value and focus on the previous input
        if (event.key === 'Backspace' && index > 0 && passValue[index] === '') {
            const newOtpValues = [...passValue];
            newOtpValues[index - 1] = '';
            setPassValue(newOtpValues);
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);



    const SubmitBtn = () => {
        let userPasscode = passValue.join('');
        if (passCode === userPasscode) {
            dispatch({
                type: 'NOTE_LOCK_HANDLE', payload: {
                    isLocked: isLocked,
                    isLockPageActive: false,
                    passCode: passCode,
                }
            })
        } else {
            dispatch({ type: 'SNACKBARHANDL', payload: { isOpen: true, severity: 'error', message: 'Passcode not matched.' } })
        }
        console.log(userPasscode)
    }

    // const CancelBtn = () => {
    //     dispatch({
    //         type: 'NOTE_LOCK_HANDLE', payload: {
    //             isLocked: isLocked,
    //             isLockPageActive: false,
    //             passCode: passCode,
    //         }
    //     })
    // }

    return (
        <>
            {
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
                        justifyContent: 'center',
                        // alignItems: 'center'
                    }}>

                        <Stack alignItems={'center'}>
                            <Lock fontSize='large' />
                            <Typography variant='h5' fontWeight={'bold'}>Locked Notes</Typography>
                            <Typography variant='caption' color={'gray'}>Enter Your Passcode</Typography>
                        </Stack>
                        <Stack className='password-box' direction={'row'} gap={1} my={1}>
                            {
                                passValue.map((item, index) =>
                                    <CustomTextField
                                        key={index}
                                        color='warning'
                                        type={isShow ? 'password' : 'text'}
                                        value={item}
                                        inputRef={(el) => (inputRefs.current[index] = el)}
                                        onChange={(event) => handleInputChange(index, event)}
                                        onKeyDown={(event) => handleKeyDown(index, event)}
                                    />)
                            }
                        </Stack>
                        <Stack direction={'row-reverse'} justifyContent={'space-between'} mb={2}>
                            <Typography variant='caption' color={'gray'} sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setIsShow(!isShow)}>{isShow ? 'Show' : 'Hide'}</Typography>
                            <Typography
                                variant='caption'
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: 'success.main'
                                    }
                                }}
                                onClick={() => navigate('/todonotes/notes/forgetpasscode')}
                            >Forget</Typography>
                        </Stack>
                        <Stack direction={'row-reverse'}>
                            <Button
                                variant='outlined'
                                size='small'
                                fullWidth
                                sx={{ borderRadius: '25px' }}
                                onClick={() => SubmitBtn()}
                            >{isLockPageActive ? 'UnLocked' : 'Locked'}</Button>
                            {/* <Button onClick={() => CancelBtn()}>Cancel</Button> */}
                        </Stack>
                    </Paper>
                </Container>
            }
        </>
    )
}

export default PassCodeBox