import { useState, useEffect, useContext } from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { BaseSingleInputFieldProps, DatePicker, DatePickerProps, DateValidationError, FieldSection, LocalizationProvider, UseDateFieldComponentProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';

interface NoteBookLogoButtonProps
    extends UseDateFieldComponentProps<Dayjs, any>,
    BaseSingleInputFieldProps<
        Dayjs | null,
        Dayjs,
        FieldSection,
        DateValidationError
    > {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    currDateTime?: string;
    userDate?: string;
}

function NoteBookLogoButton(props: NoteBookLogoButtonProps) {
    const {
        setOpen,
        label,
        id,
        // disabled,
        currDateTime,
        userDate,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    // console.log(userDate)

    return (
        <Tooltip title='Change Date'>
            <Stack
                display={'inline-block'}
                sx={{ px: 1, py: 0.3, borderRadius: '5px', cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)', userSelect: 'none' } }}
                id={id}
                // disabled={disabled}
                ref={ref}
                aria-label={ariaLabel}
                onClick={() => setOpen?.((prev) => !prev)}
            >
                <Box display={'inline-block'}>
                    <Typography component={'span'} variant='h4' fontWeight={'bold'} fontSize={'1.8rem'}>Note<span>Book</span></Typography>
                    <Stack
                        component={'span'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 'bold',
                                lineHeight: 0.4,
                                color: 'gray'
                            }
                        }}
                    >
                        <Typography variant='caption' color={'warning.light'} >{userDate?.trim() === '' ? label : userDate}</Typography>
                        <Typography variant='caption' color={'primary.dark'} >|</Typography>
                        <Typography variant='caption' >{dayjs(currDateTime).format("hh:mm A")}</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Tooltip>
    )
}

function LogoButtonDatePicker(
    props: Omit<DatePickerProps<Dayjs> & { currDateTime?: string, userDate?: string }, 'open' | 'onOpen' | 'onClose' | 'time'>,
) {
    const [open, setOpen] = useState(false);
    return (
        <DatePicker
            slots={{ field: NoteBookLogoButton, ...props.slots }}
            slotProps={{ field: { setOpen, currDateTime: props.currDateTime, userDate: props.userDate } as any }}
            {...props}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        />
    )
}

const NoteBookLogo = ({ currDateTime, userDate, setUserSelectDate }: any) => {
    const [selectDate, setSelectDate] = useState<Dayjs | null>(dayjs(new Date()));
    const { state } = useContext(AppDataContext);
    useEffect(() => {
        let date = selectDate?.toString().slice(5, 16);
        setUserSelectDate(date)
    }, [selectDate]);
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <LogoButtonDatePicker
                    label={selectDate == null ? dayjs().toString().slice(4, 16) : selectDate.toString().slice(4, 16)}
                    value={selectDate}
                    onChange={(newValue) => setSelectDate(newValue)}
                    currDateTime={currDateTime}
                    userDate={userDate}
                    disabled={state.noteDialog.mode === 'update'}
                />
            </LocalizationProvider>
        </>
    )
}

export default NoteBookLogo;