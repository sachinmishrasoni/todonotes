import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import en from 'date-fns/locale/en-IN';
import { IPickValue } from './NoteFilterDialog';


const DatePickerBox = ({ setPickValue }: any) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    let dateArr = selectedDate?.toString();
    useEffect(() => {
        setPickValue((prev: IPickValue) => ({ ...prev, selectDate: `${dateArr?.slice(8, 10)} ${dateArr?.slice(4, 7)} ${dateArr?.slice(11, 15)}` }))
    }, [selectedDate]);

    const handleDateChange = (date: any) => {
        setSelectedDate(date)
    }

    return (
        <>
            <Box className='date-picker-box'>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format="dd-MM-yyy"
                            views={['year', 'month', 'day']}
                            value={selectedDate}
                            onChange={handleDateChange}
                            // shouldDisableDate={shouldDisableDate}
                            // slots={{
                            //     day: ServerDay,
                            //     actionBar: CaldInfo
                            // }}
                            slotProps={{
                                textField: { fullWidth: true, size: 'small' }
                                // day: {
                                //     highlightedDays,
                                // },
                                // layout: {
                                //     sx: {
                                //         [`.${pickersLayoutClasses.actionBar}`]: {
                                //             gridColumn: 2,
                                //             gridRow: 1,
                                //             gridRowStart: 3
                                //         }
                                //     }
                                // }
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
        </>
    )
}

export default DatePickerBox;