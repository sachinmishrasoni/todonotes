import { createContext, useMemo, ReactNode, useReducer, Dispatch, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

/* ********* TypeScipt Define ********** */

interface IAppThemeProv {
    children: ReactNode;
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxs: true,
    }
}

interface ImyThemeCol {
    background: string;
    foreground: string;
    primary: string;
    font: string;
}

interface IState {
    mode: string;
    themeColors: {
        // dark: Array<object>;
        // light: Array<object>;
        [key: string]: { [key: string]: ImyThemeCol };
    };
    userThemeColors: {
        [key: string]: { [key: string]: ImyThemeCol };
    };
    themeColorsSelect: {
        [key: string]: string;
    };
    highlightColors: {
        [key: string]: string[];
    };
    userHighlightColors: {
        [key: string]: string[];
    };
    highlightColorsIndex: {
        [key: string]: number;
    }
    appFontFamily: {
        [key: string]: string[];
    };
    selectFontFamily: string;
    themeColorsPickerDialog: {
        isDialogOpen: boolean;
        purpose: string;
    };
}

type AppThemeActions = { type: 'MODE_CHANGE', payload: 'dark' | 'light' }
    | { type: 'HIGHLIGHT_CHANGE_HANDLE', payload: number }
    | { type: 'THEME_CHANGE_HANDLE', payload: string }
    | { type: 'FONTFAMILY_HANDLE', payload: string }
    | { type: 'ADD_THEME', payload: any }
    | { type: 'ADD_HIGHLIGHT', payload: string }
    | { type: 'COLOR_PICKER_DIALOG'; payload: { isDialogOpen: boolean, purpose: 'addThemeColors' | 'addHighlightColor' | string } };

type Context = {
    state: IState;
    dispatch: Dispatch<AppThemeActions>;
}


/* ************************************ */
function LclObjCoveter(value: any) {
    return value === null ? null : JSON.parse(value);
};

const modeFmLclStrg = localStorage.getItem('mode') || 'dark';
let themeColorsStrg: any = LclObjCoveter(localStorage.getItem('themeColorsSelect')) || { dark:'default', light: 'default' };
let highlightColorsStrg: any = LclObjCoveter(localStorage.getItem('highlightColorsIndex')) || { dark: 0, light: 0};
const fontFamilyStrg: any = localStorage.getItem('fontFamily') || 'Mooli';
let userThemeColorStrg: any = LclObjCoveter(localStorage.getItem('userThemeColors')) || { dark: {}, light: {}};
let userHighlightColorStrg: any = LclObjCoveter(localStorage.getItem('userHighlightColors')) || { dark: [], light: [] };

const initialState: IState = {
    mode: modeFmLclStrg,
    themeColors: {
        dark: {
            default: { background: '#040D12', foreground: '#040D12', primary: '#040b0f', font: '#00000' },
            theme1: { background: '#331D2C', foreground: '#3F2E3E', primary: '#3F2E3E', font: '#00000' },
            theme2: { background: '#393646', foreground: '#4F4557', primary: '#6D5D6E', font: '#00000' },
            theme3: { background: '#2C3333', foreground: '#2C3639', primary: '#3F4E4F', font: '#00000' },
            theme4: { background: '#313131', foreground: '#414141', primary: '#525252', font: '#00000' },
            ...userThemeColorStrg['dark']
        },
        light: {
            default: { background: '#DFCCFB', foreground: '#D0BFFF', primary: '#BEADFA', font: '#040D12' },
            theme1: { background: '#EEE7DA', foreground: '#AFC8AD', primary: '#88AB8E', font: '#040D12' },
            theme2: { background: '#FFC0D9', foreground: '#FFEED9', primary: '#FF90BC', font: '#040D12' },
            theme3: { background: '#F9FBE7', foreground: '#F0EDD4', primary: '#ECCDB4', font: '#040D12' },
            theme4: { background: '#DDFFBB', foreground: '#C7E9B0', primary: '#A4BC92', font: '#040D12' },
            ...userThemeColorStrg['light']
        }
    },
    userThemeColors: userThemeColorStrg,
    highlightColors: {
        dark: ['#F99417', '#FF90BC', '#5FBDFF', '#EF4040', '#711DB0', '#65B741', '#DBFF3D', '#FFC436', '#F8FF95', '#9FFBFB', ...userHighlightColorStrg['dark']],
        light: ['#F99417', '#9FFBFB', ...userHighlightColorStrg['light']]
    },
    userHighlightColors: userHighlightColorStrg,
    themeColorsSelect: themeColorsStrg,
    highlightColorsIndex: highlightColorsStrg,
    appFontFamily: {
        Caveat: ['Caveat', 'cursive'],
        DancingScript: ['"Dancing Script"', "cursive"],
        Dosis: ['Dosis', 'sans-serif'],
        KaushanScript: ['"Kaushan Script"', 'cursive'],
        MontserratAlternates: ['"Montserrat Alternates"', 'sans-serif'],
        Mooli: ['Mooli', 'sans-serif'],
        Pacifico: ['Pacifico', 'cursive'],
        Philosopher: ['Philosopher', 'sans-serif'],
        PTSerif: ['"PT Serif"', 'serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Rubik: ['Rubik', 'sans-serif'],
        Ysabeau: ['Ysabeau', 'sans-serif'],
    },
    selectFontFamily: fontFamilyStrg,
    themeColorsPickerDialog: {
        isDialogOpen: false,
        purpose: 'addThemeColors'
    }
};

export const ThemeContext = createContext<Context>({
    state: initialState,
    dispatch: () => { }
});

const reducer = (state: IState, action: AppThemeActions) => {
    switch (action.type) {
        case 'MODE_CHANGE':
            return { ...state, mode: action.payload };

        case 'THEME_CHANGE_HANDLE':
            return {
                ...state,
                themeColorsSelect: {
                    ...state.themeColorsSelect,
                    [state.mode]: action.payload
                }
            };

        case 'HIGHLIGHT_CHANGE_HANDLE':
            return {
                ...state,
                highlightColorsIndex: {
                    ...state.highlightColorsIndex,
                    [state.mode]: action.payload
                }
            };

        case 'FONTFAMILY_HANDLE':
            return {
                ...state, selectFontFamily: action.payload
            };

        case 'ADD_THEME':
            return {
                ...state,
                themeColors: {
                    ...state.themeColors,
                    [state.mode]: { ...state.themeColors[state.mode], ...action.payload }
                },
                userThemeColors: {
                    ...state.userThemeColors,
                    [state.mode]: { ...state.userThemeColors[state.mode], ...action.payload }
                }
            };

        case 'COLOR_PICKER_DIALOG':
            return {
                ...state,
                themeColorsPickerDialog: {
                    isDialogOpen: action.payload.isDialogOpen, purpose: action.payload.purpose
                }
            };

        case 'ADD_HIGHLIGHT':
            return {
                ...state,
                highlightColors: {
                    ...state.highlightColors,
                    [state.mode]: [...state.highlightColors[state.mode], action.payload]
                },
                userHighlightColors: {
                    ...state.userHighlightColors,
                    [state.mode]: [...state.userHighlightColors[state.mode], action.payload]
                }
            }

        default:
            return state;
    }
};

const AppThemeProvider = ({ children }: IAppThemeProv) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { mode, themeColors, themeColorsSelect, highlightColors, highlightColorsIndex, appFontFamily, selectFontFamily, userThemeColors, userHighlightColors } = state;
    const myTheme = themeColors[mode][themeColorsSelect[mode]];
    const myThemeHighlight = highlightColors[mode][highlightColorsIndex[mode]];
    // console.log(userHighlightColors)

    useEffect(() => {
        localStorage.setItem('mode', mode);   // Store theme mode
        localStorage.setItem('highlightColorsIndex', JSON.stringify(highlightColorsIndex));
        localStorage.setItem('themeColorsSelect', JSON.stringify(themeColorsSelect));
        localStorage.setItem('fontFamily', selectFontFamily);
        localStorage.setItem('userThemeColors', JSON.stringify(userThemeColors));
        localStorage.setItem('userHighlightColors', JSON.stringify(userHighlightColors))
    }, [state]);

    const themeObj: any = {
        dark: {
            myThemeColors: {
                background: myTheme.background,
                foreground: myTheme.foreground,
                primary: myTheme.primary,
                highlight: myThemeHighlight,
                font: myTheme.font
            },
            background: {
                default: myTheme.background,
                paper: myTheme.foreground
            },
            warning: {
                main: myThemeHighlight
            }
        },
        light: {
            myThemeColors: {
                background: myTheme.background,
                foreground: myTheme.foreground,
                primary: myTheme.primary,
                highlight: myThemeHighlight,
                font: myTheme.font
            },
            background: {
                default: myTheme.background,
                paper: myTheme.foreground
            }
        }
    };

    // Create Theme
    let theme = useMemo(() => createTheme({
        breakpoints: {
            keys: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
            values: {
                xxs: 0,
                xs: 300,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        },
        palette: {
            mode: state.mode,
            ...themeObj[state.mode]
        },
        typography: {
            fontFamily: appFontFamily[selectFontFamily].join(',')
        },
    }), [state]);
    theme = responsiveFontSizes(theme);
    // console.log(theme)
    return (
        <>
            <ThemeContext.Provider value={{ state, dispatch }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        </>
    )
}

export default AppThemeProvider;