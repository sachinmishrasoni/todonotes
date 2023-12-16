import { useContext, useState, forwardRef, useEffect } from 'react';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, } from "@mui/material";
import { AppDataContext } from '../../../../../AppContext/AppDataProvider';
import { TransitionProps } from '@mui/material/transitions';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import en from 'date-fns/locale/en-IN';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='down' ref={ref} {...props} />;
});

export interface IPickValue {
    selectDate: string;
    selectedTitle: string;
}

const NoteFilterDialog = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const { selectedDate, selectedTitle } = state.noteFilterDialog;
    const [dateSelect, setDateSelect] = useState<Date | null>(null);
    const [pickValue, setPickValue] = useState<IPickValue>({ selectDate: '', selectedTitle: '' });
    const [filterNote, setFilterNote] = useState(state.notesData);

    useEffect(() => {
        let dateStr = dateSelect?.toString();
        dateSelect === null
            ? setPickValue((prev) => ({ ...prev, selectDate: '' }))
            : setPickValue((prev) => ({ ...prev, selectDate: `${dateStr?.slice(8, 10)} ${dateStr?.slice(4, 7)} ${dateStr?.slice(11, 15)}` }))
    }, [dateSelect]);

    useEffect(() => {
        pickValue.selectDate.trim() === ''
            ? setFilterNote(state.notesData)
            : setFilterNote(state.notesData.filter((obj) => obj.userDate === pickValue.selectDate))
    }, [pickValue]);

    const handleDateChange = (date: any) => {
        setDateSelect(date)
    }

    const OnChangeHandle = (value: string) => {
        setPickValue((prev) => ({ ...prev, selectedTitle: value }))
    }

    const ApplyBtn = () => {

        dispatch({
            type: 'NOTE_FILTER_DIALOG_HANDLE',
            payload: {
                isDialogOpen: false,
                selectedDate: pickValue.selectDate,
                selectedTitle: pickValue.selectedTitle
            }
        });
        setDateSelect(null);
        setPickValue((prev) => ({ ...prev, selectedTitle: '' }))
    }
    return (
        <>
            <Dialog
                open={state.noteFilterDialog.isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                sx={{
                    '& .MuiDialog-paper': {
                        minWidth: 300
                    }
                }}
            >
                <DialogTitle sx={{ py: 1, '& span': { fontSize: '0.75rem', color: 'gray' } }}>Filter Note <span>with</span></DialogTitle>
                <DialogContent sx={{ overflow: 'hidden' }}>

                    <Box className='date-picker-box'>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    format="dd-MM-yyy"
                                    views={['year', 'month', 'day']}
                                    value={dateSelect}
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

                    <Box className='search-box' mt={1}>
                        <Autocomplete
                            id="search-note"
                            freeSolo
                            fullWidth
                            value={pickValue.selectedTitle}
                            disableClearable
                            size='small'
                            options={filterNote.map((option) => option.heading)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // label='Search Heading'
                                    placeholder='Search Note'
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}

                            onChange={(_e, value) => OnChangeHandle(value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => dispatch({ type: 'NOTE_FILTER_DIALOG_HANDLE', payload: { isDialogOpen: false, selectedDate: selectedDate, selectedTitle: selectedTitle } })}>Cancel</Button>
                    <Button
                        disabled={!(pickValue.selectDate.trim() !== '' || pickValue.selectedTitle.trim() !== '')}
                        onClick={() => ApplyBtn()}
                    >Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NoteFilterDialog;