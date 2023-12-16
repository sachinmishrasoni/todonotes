import { useState, useContext } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider, PickersActionBarProps, PickersDay, PickersDayProps, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AnimatePresence, motion } from 'framer-motion';
import dayjs from 'dayjs';
import { Circle, Search } from '@mui/icons-material';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import useDayFind from '../../../Hooks/useDayFind';

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

type ServerDayProps = PickersDayProps<any> & {
    highlightedDays?: string[];
  };


interface IFilterTodoD {
    isFilterDialogOpen: boolean;
    setIsFilterDialogOpen: Function;
}

const FilterTodoDialog = ({ isFilterDialogOpen, setIsFilterDialogOpen }: IFilterTodoD) => {
    const { state, dispatch } = useContext(AppDataContext);
    const startOfQ12022 = dayjs('2023-01-01T00:00:00.000');
    const [selectedValue, setSelectedValue] = useState('all');
    const [listValue, setListValue] = useState(0);
    const [isDateCompActive, setIsDateCompoActive] = useState(false);
    const [isMenuItemActive, setIsMenuItemActive] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const highlightedDays: string[] = state.todosData.map((date) => DateReplace(date.date));

    const SelectHandler = (value: string) => {
        if (value === 'custom') {
            setIsDateCompoActive(true)
        } else {
            setSelectedValue(value);
            setIsMenuItemActive(false);
        }
    }

    const ApplyBtnHandler = (btnName: string) => {
        if (btnName === 'applyBtn') {
            dispatch({
                type: 'SELECTEDTODODATE',
                payload: selectedValue
            });

            dispatch({
                type: 'TODOCHIPCHANGER',
                payload: {
                    index: listValue,
                    color: listValue === 0 ? 'warning' : listValue === 1 ? 'success' : 'error'
                }
            })

            setIsFilterDialogOpen(false)
        } else {
            setIsDateCompoActive(false)
        }
    }

    const CancelBtnHandler = (btnName: string) => {
        if (btnName === 'closeDialog') {
            setIsFilterDialogOpen(false)
        } else {
            setIsDateCompoActive(false)
        }
    }

    // ------------------- For DateComponent ---------------- \\
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
        setIsDateCompoActive(false);
        setIsMenuItemActive(true);
        setSelectedValue(dayjs(date).format("DD-MM-YYYY"))
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

    return (
        <>
            <Dialog
                open={isFilterDialogOpen}
                sx={{
                    '& .MuiDialog-paper': {
                        minWidth: 300,
                        maxWidth: 400,
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex', alignItems: 'center',
                        '& .MuiSvgIcon-root': {
                            mt: 1,
                            fontSize: '1.3rem',
                            transform: 'rotate(0deg) translateX(-1px)'
                        },
                        '& span': {
                            transform: 'translateX(-5px)'
                        }
                    }}>Filter Tod<Search color='warning' /><span>s</span></DialogTitle>
                <DialogContent sx={{ overflow: 'hidden' }}>
                    <AnimatePresence mode='wait'>
                        {
                            !isDateCompActive
                                ? (
                                    <motion.div
                                        key={'false-key'}
                                        initial={{ x: -500 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -500 }}
                                    >
                                        <Box component={'form'}>
                                            <FormControl fullWidth size='small' sx={{ my: 1 }}>
                                                <InputLabel htmlFor={'Label'}>Select Day</InputLabel>
                                                <Select
                                                    value={selectedValue}
                                                    defaultValue={'all'}
                                                    input={<OutlinedInput label='Select Day' id='Label' />}
                                                    onChange={(e) => SelectHandler(e.target.value)}
                                                >
                                                    <MenuItem value='all'>All Day</MenuItem>
                                                    {isMenuItemActive && (<MenuItem value={selectedValue}>{useDayFind(selectedValue)}</MenuItem>)}
                                                    <MenuItem value='custom'>Custom</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth size='small' sx={{ my: 1 }}>
                                                <InputLabel htmlFor={'Label'}>List</InputLabel>
                                                <Select
                                                    value={listValue}
                                                    defaultValue={0}
                                                    input={<OutlinedInput label='List' id='Label' />}
                                                    onChange={(e) => setListValue(e.target.value as number)}
                                                >
                                                    <MenuItem value={0}>All Todo</MenuItem>
                                                    <MenuItem value={1}>Completed Todo</MenuItem>
                                                    <MenuItem value={2}>InCompleted Todo</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </motion.div>
                                )
                                : (
                                    <motion.div
                                        key={'true-key'}
                                        initial={{ x: 500 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: 500 }}
                                    >
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
                                                            } as ServerDayProps,
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
                                    </motion.div>
                                )
                        }
                    </AnimatePresence>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => CancelBtnHandler(isDateCompActive ? 'closeDateComp' : 'closeDialog')}>Cancel</Button>
                    <Button onClick={() => ApplyBtnHandler(!isDateCompActive ? 'applyBtn' : 'applyDateBtn')}>{!isDateCompActive ? 'Apply' : 'Apply Date'}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FilterTodoDialog;