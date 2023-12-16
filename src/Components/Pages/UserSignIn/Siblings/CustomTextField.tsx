import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff, } from "@mui/icons-material";
import { useState } from 'react';

interface CustmTF {
    label?: string;
    name?: string;
    value?: string|number;
    inputHandl?: Function;
    type?: string;
}
const CustomTextField = ({label, name, value, inputHandl, type}: CustmTF) => {
    const [showPassword, setShowPassword] = useState(true);
    console.log(label,name,value,inputHandl, type)
    return (
        <>
            <FormControl fullWidth required>
                <InputLabel >Password</InputLabel>
                <OutlinedInput
                    label="Password"
                    name="password"
                    // value={password}
                    // onChange={UserInputHandler}
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
        </>
    )
}

export default CustomTextField