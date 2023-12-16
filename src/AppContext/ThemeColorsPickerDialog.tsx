import { useContext, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography, styled } from '@mui/material'
import TranslateXFramer from '../Components/Animation/TranslateXFramer';
import InOutYmotion from '../Components/Animation/InOutYmotion';
import { motion } from 'framer-motion';
import { ArrowBack, Close } from '@mui/icons-material';
import { ThemeContext } from './AppThemeProvider';
import ColorSuggestionBox from './ColorSuggestionBox';

const CustomTextField = styled(TextField)({
    '& .css-2xe3g7-MuiFormLabel-root-MuiInputLabel-root': {
        // top: '6px'
    },
    '& .MuiInputBase-input': {
        fontSize: '1.5rem',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'gray',
        padding: '10px'
    }
});

interface IUserTheme {
    [key: string]: string;
}

const steps = ['Background', 'Foreground', 'Primary', 'Font'];
const colorRegx = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

const ThemeColorsPickerDialog = () => {
    const { state, dispatch } = useContext(ThemeContext);
    const { mode, themeColors, themeColorsPickerDialog } = state;
    const [activeStep, setActiveStep] = useState(0);
    const [themeName, setThemeName] = useState('');
    const [userThemeColors, setUserThemeColors] = useState<IUserTheme>({
        background: '#',
        foreground: '#',
        primary: '#',
        font: '#'
    });
    const [userHighlight, setUserHighlight] = useState('#');
    const [isError, setIsError] = useState({
        isShow: false,
        message: ''
    });

    const InputHandle = (name: string, value: string) => {
        if (name === 'themeName') {
            setThemeName(value);
        } else {
            setUserThemeColors((prev) => ({ ...prev, [name]: value }));
        }
        setIsError((prev) => ({ ...prev, isShow: false, message: '' }));

    }

    const InputHighlightHandle = (value: string) => {
        setUserHighlight(value);
        setIsError((prev) => ({ ...prev, isShow: false, message: '' }));
    }

    const NextBtnHandle = () => {
        if (activeStep === 4) {
            let arrThemeName = Object.keys(themeColors[mode]);
            if (themeName.trim() === '') setIsError((prev) => ({ ...prev, isShow: true, message: 'Invalid or empty theme name' }));
            else if (arrThemeName.includes(themeName)) setIsError((prev) => ({ ...prev, isShow: true, message: 'Already given theme name.' }));
            else {
                console.log({ [mode]: { [themeName]: userThemeColors } })
                dispatch({ type: 'ADD_THEME', payload: { [themeName]: userThemeColors } })
            }
        } else if (activeStep <= 3) {
            let arrUserCol = Object.values(userThemeColors).filter((item) => item !== '#');
            let val = userThemeColors[steps[activeStep].toLowerCase()];
            if (!val.match(colorRegx)) setIsError((prev) => ({ ...prev, isShow: true, message: 'Invalid Hex Color' }));
            else if (new Set(arrUserCol).size !== arrUserCol.length) setIsError((prev) => ({ ...prev, isShow: true, message: 'Two or more Same Hex Color' }));
            else setActiveStep((prev) => prev + 1);
        }

    }

    const colorSuggestionPick = (value: string) => {
        if (activeStep <= 3) setUserThemeColors((prev) => ({ ...prev, [steps[activeStep].toLowerCase()]: value }));

        if (themeColorsPickerDialog.purpose === 'addHighlightColor') setUserHighlight(value);

        setIsError((prev) => ({ ...prev, isShow: false, message: '' }));
    }

    const CloseBtn = () => {
        dispatch({ type: 'COLOR_PICKER_DIALOG', payload: { isDialogOpen: false, purpose: themeColorsPickerDialog.purpose } });
        setActiveStep(0);
        setUserThemeColors((prev) => ({ ...prev, background: '#', foreground: '#', primary: '#', font: '#' }))
        setUserHighlight('#');
        setIsError((prev) => ({ ...prev, isShow: false, message: '' }));
    }

    const AddHighlightBtn = () => {
        if (userHighlight.match(colorRegx)) {
            if(!state.highlightColors[mode].includes(userHighlight)){
                dispatch({type: 'ADD_HIGHLIGHT', payload: userHighlight});
                setUserHighlight('#');
                dispatch({ type: 'COLOR_PICKER_DIALOG', payload: { isDialogOpen: false, purpose: themeColorsPickerDialog.purpose } });
            } 
            else setIsError((prev) => ({ ...prev, isShow: true, message: 'Already given highlight color.' }));
        } else setIsError((prev) => ({ ...prev, isShow: true, message: 'Invalid Hex Color value' }));
    }

    return (
        <>
            <Dialog
                open={themeColorsPickerDialog.isDialogOpen}
                sx={{
                    '& .MuiDialog-paper': {
                        width: { xxs: 'auto', xs: 300, md: 350 },

                    }
                }}
            >
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mx={3} mt={2}>
                    <DialogTitle sx={{ p: 0 }}>Add {themeColorsPickerDialog.purpose === 'addThemeColors' ? 'Theme' : 'Highlight'} Colors</DialogTitle>
                    <Tooltip title='Close'>
                        <IconButton onClick={() => CloseBtn()}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <DialogContent sx={{ overflow: 'hidden', pt: 0, pb: 0 }}>
                    {
                        themeColorsPickerDialog.purpose === 'addThemeColors' && (
                            <Box>
                                {
                                    activeStep <= 3 && (
                                        <TranslateXFramer>
                                            <Box>
                                                {/* Circle Steps Bar */}
                                                <Box sx={{
                                                    position: 'relative'
                                                }}>
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            height: '3px',
                                                            borderRadius: '25px',
                                                            backgroundColor: 'myThemeColors.primary',
                                                            position: 'absolute',
                                                            top: '15px'
                                                        }}
                                                    />
                                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                                        {steps.map((item, index) =>
                                                            <Stack key={index} height={54} alignItems={'center'} justifyContent={'flex-start'} position={'relative'}>
                                                                <Tooltip title={item}>
                                                                    <IconButton
                                                                        onClick={() => setActiveStep(index)}
                                                                        sx={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            fontSize: '1rem',
                                                                            fontWeight: 'bold',
                                                                            backgroundColor: steps[activeStep] === item ? 'myThemeColors.highlight' : 'myThemeColors.primary',
                                                                            '&:hover': {
                                                                                backgroundColor: 'myThemeColors.highlight'
                                                                            },
                                                                            // '&:disabled': {
                                                                            //     backgroundColor: steps[activeStep] === item ? 'myThemeColors.highlight' : 'myThemeColors.primary'
                                                                            // }
                                                                        }}>{index + 1}</IconButton>
                                                                </Tooltip>
                                                                {steps[activeStep] === item &&
                                                                    <motion.div
                                                                        key={item}
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ duration: 0.5 }}
                                                                    >
                                                                        <Typography variant='caption' sx={{
                                                                            position: 'absolute',
                                                                            left: '50%',
                                                                            top: 35,
                                                                            transform: 'translateX(-50%)'
                                                                        }}>{item}</Typography>
                                                                    </motion.div>
                                                                }
                                                            </Stack>

                                                        )}
                                                    </Stack>
                                                </Box>
                                                {/* Color Input Box */}
                                                <Stack>
                                                    {

                                                        steps[activeStep] === steps[activeStep] && (
                                                            <TranslateXFramer key={activeStep}>
                                                                <CustomTextField
                                                                    name={steps[activeStep].toLowerCase()}
                                                                    value={userThemeColors[steps[activeStep].toLowerCase()]}
                                                                    placeholder='#FFC0D9'
                                                                    color='secondary'
                                                                    inputProps={{ maxLength: 7 }}
                                                                    onChange={(e) => InputHandle(e.target.name, e.target.value)}
                                                                    error={isError.isShow}
                                                                />
                                                            </TranslateXFramer>
                                                        )
                                                    }
                                                </Stack >
                                            </Box>
                                        </TranslateXFramer>
                                    )
                                }
                                {
                                    activeStep === 4 && (
                                        <TranslateXFramer>
                                            <CustomTextField
                                                name='themeName'
                                                label='Theme Name'
                                                sx={{ mt: 1 }}
                                                value={themeName}
                                                onChange={(e) => InputHandle(e.target.name, e.target.value)}
                                            />
                                        </TranslateXFramer>
                                    )
                                }
                            </Box>
                        )
                    }

                    {
                        themeColorsPickerDialog.purpose === 'addHighlightColor' && (
                            <Box mt={1}>
                                <Typography variant='caption' color={'gray'}>Only Hex color value accepted.</Typography>
                                <CustomTextField
                                    placeholder='#FF90BC'
                                    value={userHighlight}
                                    color='warning'
                                    onChange={(e) => InputHighlightHandle(e.target.value)}
                                    inputProps={{ maxLength: 7 }}
                                />
                            </Box>
                        )
                    }

                    {isError.isShow && <InOutYmotion><Typography variant='caption' color={'error'}>{isError.message}</Typography></InOutYmotion>}

                    <ColorSuggestionBox suggestionColor={['#F99417', '#FF90BC', '#5FBDFF', '#EF4040', '#711DB0', '#65B741', '#DBFF3D', '#FFC436', '#F8FF95', '#9FFBFB']} colorSuggestionPick={colorSuggestionPick} />

                </DialogContent>
                <DialogActions >
                    {
                        themeColorsPickerDialog.purpose === 'addThemeColors' && (
                            <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
                                <Button disabled={activeStep === 0} onClick={() => setActiveStep((prev) => prev - 1)}><ArrowBack /></Button>
                                <Button onClick={() => NextBtnHandle()}>{activeStep === 4 ? 'Add Theme' : 'Next'}</Button>
                            </Stack>
                        )
                    }

                    {
                        themeColorsPickerDialog.purpose === 'addHighlightColor' && (
                            <Stack >
                                <Button onClick={() => AddHighlightBtn()}>Add</Button>
                            </Stack>
                        )
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ThemeColorsPickerDialog