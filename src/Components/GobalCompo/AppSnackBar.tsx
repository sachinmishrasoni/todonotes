import { Alert, Slide, SlideProps, Snackbar, SnackbarOrigin } from '@mui/material';
import { useContext } from 'react';
import { AppDataContext } from '../../AppContext/AppDataProvider';

type TransitionProps = Omit<SlideProps, 'direction'>;
function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

const AppSnackBar = () => {
    const { state, dispatch } = useContext(AppDataContext);
    const { isOpen, severity, message } = state.appSnackBar;
    const stateSnack: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'center',
    }
    const { vertical, horizontal } = stateSnack;

    const handleClose = () => {
        dispatch({
            type: 'SNACKBARHANDL',
            payload: {
                isOpen: false,
                severity: severity === 'success' ? 'success' : severity === 'info' ? 'info' : 'error',
                message: ''
            }
        })
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                key={vertical + horizontal}
                TransitionComponent={TransitionDown}
                // key={transition ? transition.name : ''}
                sx={{
                    '&.MuiSnackbar-root': {
                        top: '65px'
                    },
                    '& .MuiPaper-root': {
                        borderRadius: '25px',
                        padding: '0px 10px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        alignItems: 'center',
                    },
                    '& .MuiAlert-icon': {
                        // padding: '0'
                        marginRight: '2px'
                    }
                }}
            >
                <Alert severity={severity === 'success' ? 'success' : severity === 'info' ? 'info' : 'error'}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default AppSnackBar