import { useState, useContext } from 'react'
import { Box, Button, Dialog, Stack, Typography, styled } from "@mui/material"
import { DatePicker, LocalizationProvider, PickersActionBarProps, PickersDay, PickersDayProps, pickersLayoutClasses } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import { Circle } from '@mui/icons-material'
import { AppDataContext } from '../../AppContext/AppDataProvider'

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.primary.contrastText,
    },
    "&.Mui-selected:hover": {
        backgroundColor: theme.palette.warning.main
    },
    "&.MuiPickersDay-today": {
        border: 'none'
    },
    "&.MuiPickersDay-root:focus.Mui-selected": {
        backgroundColor: theme.palette.warning.main
    }
}));

const CaldInfo = (props: PickersActionBarProps) => {
    return (
        <>
            <Stack className={props.className} justifyContent={'center'} alignItems={'center'}>
                <Stack direction={'row'} alignItems={'center'}>
                    <Circle sx={{ fontSize: '0.8rem', color: 'warning.main' }} /> &nbsp;
                    <Typography variant='caption'>Available</Typography>
                </Stack>
            </Stack>
        </>
    )
}

const DatePickerDialog = () => {
    const { state } = useContext(AppDataContext);
    // const { isDialogOpen } = state.datePickerDialog;
    const startOfQ12022 = dayjs('2023-01-01T00:00:00.000');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const highlightedDays = state.todosData.map((date) => DateReplace(date.date));

    function DateReplace(date: string) {
        let arr = date.split('-');
        let dt = arr[0];
        let dy = arr[2];
        arr[0] = dy;
        arr[2] = dt;
        return arr.join('-');
    }

    // Replace this logic with your own data check
    const isDatePresent = (date: Date) => {
        // Simulating data presence for specific dates
        const data = highlightedDays;
        let strDate = dayjs(date).format("YYYY-MM-DD")
        return data.includes(strDate);
    };

    const shouldDisableDate = (day: Date) => {
        return !isDatePresent(day);

    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    function ServerDay(props: PickersDayProps<any> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth &&
            highlightedDays.includes(day.format("YYYY-MM-DD"));

        return (
            <HighlightedDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                selected={isSelected}
            />
        );
    }

    // const doneBtn = () => {
    //     let date = dayjs(selectedDate).format('DD-MM-YYYY');
    //     dispatch({
    //         type: 'DATEPICKERDIALOGHANDL',
    //         payload: {
    //             isDialogOpen: false,
    //             selectDate: date,
    //             isShowComp: true
    //         }
    //     });
    // }

    // const cancelBtn = () => {
    //     dispatch({
    //         type: 'DATEPICKERDIALOGHANDL',
    //         payload: {
    //             isDialogOpen: false,
    //             selectDate: '',
    //             isShowComp: false
    //         }
    //     });
    // }

    return (
        <>
            <Dialog
                open={false}
                sx={{
                    '& .MuiPaper-root': {
                        border: '0.1px solid orange',
                        borderRadius: '15px'
                    }
                }}
            >
                <Box p={2} px={4}>
                    <Typography variant="h5" fontWeight={'bold'}>Select Date :</Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DemoItem >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedDate}
                                    minDate={startOfQ12022}
                                    onChange={handleDateChange}
                                    shouldDisableDate={shouldDisableDate}
                                    slots={{
                                        day: ServerDay,
                                        actionBar: CaldInfo
                                    }}
                                    slotProps={{
                                        day: {
                                            highlightedDays,
                                        },
                                        layout: {
                                            sx: {
                                                [`.${pickersLayoutClasses.actionBar}`]: {
                                                    gridColumn: 2,
                                                    gridRow: 1,
                                                    gridRowStart: 3
                                                }
                                            }
                                        }
                                    }}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>

                    <Stack direction={'row'} justifyContent={'space-between'} mt={1.5}>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="outlined" disabled={selectedDate === null ? true : false}>Done</Button>
                    </Stack>
                </Box>
            </Dialog>
        </>
    )
}

export default DatePickerDialog