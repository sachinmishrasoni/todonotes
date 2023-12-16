import { useContext } from 'react';
import { Add, Check, Close, DarkMode, LightMode } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, MenuItem, Paper, Select, Stack, Tooltip, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import ModeBtnFramer from '../../Animation/ModeBtnFramer';
import { ThemeContext } from '../../../AppContext/AppThemeProvider';
import InOutYmotion from '../../Animation/InOutYmotion';
import ThemeColorsPickerDialog from '../../../AppContext/ThemeColorsPickerDialog';

interface ISettingsProps {
    isSettingsOpen: boolean;
    setIsSettingsOpen: Function
}

const SettingsDrawer = ({ isSettingsOpen, setIsSettingsOpen }: ISettingsProps) => {
    const { state, dispatch } = useContext(ThemeContext);
    const { mode, themeColors, themeColorsSelect, highlightColors, highlightColorsIndex, selectFontFamily, appFontFamily } = state;

    // Toggle Button for Dark mode to Light Mode
    const ModeToggleBtn = () => {
        dispatch({ type: 'MODE_CHANGE', payload: state.mode === 'dark' ? 'light' : 'dark' })
    }

    const themeColorHandle = (theme: string) => {
        if (theme === 'add theme') {
            dispatch({ type: 'COLOR_PICKER_DIALOG', payload: { isDialogOpen: true, purpose: 'addThemeColors' } })
        } else {
            dispatch({ type: 'THEME_CHANGE_HANDLE', payload: theme })
        }
    }

    const highlightHandler = (colorIndex: number) => {
        dispatch({ type: 'HIGHLIGHT_CHANGE_HANDLE', payload: colorIndex });
    }

    const fontChangeHandle = (value: string) => {
        dispatch({ type: 'FONTFAMILY_HANDLE', payload: value })
    }

    const ResetThemeBtn = () => {
        localStorage.removeItem('themeColorsSelect')
        localStorage.removeItem('highlightColorsIndex')
        localStorage.removeItem('userThemeColors');
        localStorage.removeItem('userHighliColors');
        window.location.reload()
    }
    return (
        <>
            <Drawer
                open={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                anchor='right'
                sx={{
                    '& .MuiBackdrop-root': {
                        backdropFilter: 'blur(5px)'
                    },
                    '& .MuiDrawer-paper': {
                        width: { xxs: 250, xs: 300, sm: 350 },
                        borderRadius: '15px 0 0 15px',
                        borderLeft: '1px solid',
                        borderColor: 'myThemeColors.highlight'
                    }
                }}
            >
                <Box p={1.5}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1}>
                        <Typography variant='h5' fontWeight={600}>Settings</Typography>
                        <Tooltip title='Close'>
                            <IconButton size='small' onClick={() => setIsSettingsOpen(false)}>
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} my={1}>
                        <Typography variant='h6' fontWeight={600} textTransform={'capitalize'}>{mode} mode</Typography>

                        <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                            <IconButton size='small' onClick={() => ModeToggleBtn()} sx={{ overflow: 'hidden' }}>
                                <AnimatePresence mode='wait'>
                                    {mode === 'light' && (<ModeBtnFramer keyName={'light'}>< LightMode /></ModeBtnFramer>)}
                                    {mode === 'dark' && (<ModeBtnFramer keyName={'dark'}><DarkMode /></ModeBtnFramer>)}
                                </AnimatePresence>
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    {/* Theme Colors */}
                    <Box my={1}>
                        <Typography variant='body1' fontWeight={'bold'} textAlign={'center'} mb={0.5}>Theme Colors</Typography>
                        {
                            (mode === 'dark' || mode === 'light') && (
                                <InOutYmotion key={mode}>
                                    <Select
                                        value={themeColorsSelect[mode]}
                                        size='small'
                                        fullWidth
                                        sx={{
                                            textTransform: 'capitalize',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderStyle: 'dashed',
                                                borderColor: 'myThemeColors.highlight'
                                            }
                                        }}
                                        onChange={(e) => themeColorHandle(e.target.value)}
                                    >
                                        {
                                            Object.entries(themeColors[mode]).map((obj, index) => <MenuItem key={index} value={obj[0]} sx={{ textTransform: 'capitalize' }}>{obj[0]}</MenuItem>)
                                        }
                                        <MenuItem value={'add theme'}>Add Theme</MenuItem>
                                    </Select>
                                </InOutYmotion>
                            )
                        }

                    </Box>

                    {/* Highlisht Box */}
                    <Box
                        sx={{
                            mt: 2.5,
                            minHeight: 100,
                            border: '2px dashed',
                            borderColor: 'myThemeColors.highlight',
                            borderRadius: '15px',
                            position: 'relative'
                        }}
                    >
                        <Typography variant='caption'
                            sx={{
                                px: 1,
                                backgroundColor: 'myThemeColors.foreground',
                                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
                                fontWeight: 'bold',
                                position: 'absolute',
                                left: '50%', top: '-10px',
                                transform: 'translateX(-50%)'
                            }}
                        >Highlight Colors</Typography>
                        <Stack direction={'row'} gap={{ xxs: 0.5, md: 1 }} flexWrap={'wrap'} p={1.5}>
                            <Tooltip title='Add'>
                                <IconButton 
                                onClick={() => dispatch({ type: 'COLOR_PICKER_DIALOG', payload: { isDialogOpen: true, purpose: 'addHighlightColor' } })}
                                sx={{
                                    width: 35,
                                    height: 35,
                                    border: '1px solid white'
                                }}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                            {
                                highlightColors[mode].map((item, index) => (
                                    <Paper
                                        key={index}
                                        className={highlightColorsIndex[mode] === index ? 'active' : ''}
                                        sx={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: '50%',
                                            backgroundColor: item,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '& .MuiSvgIcon-root': {
                                                opacity: 0,
                                                transition: 'all 0.2s ease-in'
                                            },
                                            '&.active .MuiSvgIcon-root': {
                                                opacity: 1
                                            },
                                        }}
                                        onClick={() => highlightHandler(index)}
                                    ><Check /></Paper>
                                ))
                            }
                        </Stack>
                    </Box>

                    {/* Font Styles */}
                    <Box my={1}>
                        <Typography variant='body1' fontWeight={'bold'} textAlign={'center'} mb={0.5}>Font Styles</Typography>
                        <Select
                            value={selectFontFamily}
                            size='small'
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderStyle: 'dashed',
                                    borderColor: 'myThemeColors.highlight'
                                }
                            }}
                            onChange={(e) => fontChangeHandle(e.target.value)}
                        >
                            {
                                Object.entries(appFontFamily).map((fontFam, index) =>
                                    <MenuItem key={index} value={fontFam[0]} sx={{
                                        fontFamily: fontFam[1].join()
                                    }}>{fontFam[0]}</MenuItem>
                                )
                            }
                        </Select>
                    </Box>
                </Box>

                <Stack width={'100%'} position={'absolute'} bottom={30} > 
                    <Button onClick={() => ResetThemeBtn()}>Reset Theme & Colors</Button>
                </Stack>

                <Box position={'absolute'} bottom={0} left={'50%'} sx={{ transform: 'translateX(-50%)' }}>
                    <Divider />
                    <Typography variant='caption'>DevelopBy @SAM</Typography>
                </Box>

                {/* Theme Color Picker Dialog */}
                <ThemeColorsPickerDialog />
            </Drawer>
        </>
    )
}

export default SettingsDrawer;