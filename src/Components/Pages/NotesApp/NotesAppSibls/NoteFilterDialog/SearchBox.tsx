import { useContext } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AppDataContext } from '../../../../../AppContext/AppDataProvider';
import { IPickValue } from './NoteFilterDialog';

const SearchBox = ({setPickValue, selectedDate}: any) => {
    const { state } = useContext(AppDataContext);
    const filterData = state.notesData.filter((obj) => obj.userDate === selectedDate);
    console.log(filterData)
    const OnChangeHandle = (value: string) => {
        setPickValue((prev: IPickValue) => ({...prev, selectedTitle: value}))
    }
    return (
        <>
            <Box className='search-box' mt={1}>
                <Autocomplete
                    id="search-note"
                    freeSolo
                    fullWidth
                    disableClearable
                    size='small'
                    options={filterData.map((option) => option.heading)}
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
        </>
    )
}

export default SearchBox