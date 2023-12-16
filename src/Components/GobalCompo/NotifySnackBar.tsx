// import React from 'react';
import { Alert, Box, Snackbar, SnackbarOrigin } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { INotifySB } from '../Pages/UserSignIn/LogInPage';

interface INotify {
    notifyBarProps: INotifySB;
    setNotifyBarProps: Function;
}
interface IPosi extends SnackbarOrigin {

}
/*
    const [notifyBarProps, setNotifyBarProps] = useState({
        isOpen: false,
        alertType: 'info',
        message: ''
    }); // outside of component
*/ 

const NotifySnackBar = ({ notifyBarProps, setNotifyBarProps }: INotify) => {
    const position: IPosi = {
        vertical: 'top',
        horizontal: 'center',
    };
    const { vertical, horizontal } = position;

    const handleClose = () => {
        setNotifyBarProps({ ...notifyBarProps, isOpen: false });
    };

    return (
        <>
            <Box
                sx={{
                    // width: '-webkit-fill-available',
                    width: '100%',
                    position: 'absolute',
                    top: '0px',
                    left: '0px'
                }}
            >
                <AnimatePresence>
                    {
                        notifyBarProps.isOpen && (
                            <motion.div
                                initial={{
                                    y: '-100vh'
                                }}
                                animate={{
                                    y: 0
                                }}
                                transition={{
                                    // duration: 0.3,
                                    // type: 'spring',
                                    // bounce: 0.3,
                                    // stiffness: 65
                                }}
                                exit={{
                                    y: '-100vh'
                                }}
                            >
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={notifyBarProps.isOpen}
                                    onClose={handleClose}
                                    autoHideDuration={3000}
                                    key={vertical + horizontal}
                                    sx={{ position: 'relative', top: '10px', '@media(min-width: 600px)': { top: 15, left: 0, right: 0, transform: 'none' } }}
                                >
                                    <Alert severity={notifyBarProps.alertType}>{notifyBarProps.message}</Alert>
                                </Snackbar>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </Box>
        </>
    )
}

export default NotifySnackBar;