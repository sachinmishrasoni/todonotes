import { Box, Typography } from '@mui/material'
import AppName2 from '../Layouts/AppName2'

const LoadingPage = () => {
    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box position={'relative'}>
                    <Box
                        className='outer-spiner'
                        sx={{
                            width: { xxs: 225, xs: 225, sm: 275 },
                            height: { xxs: 225, xs: 225, sm: 275 },
                            // backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '10px solid',
                            borderColor: 'myThemeColors.highlight',
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderRadius: '50%',
                            transform: 'rotate(90deg)'
                        }}
                    />
                    <Box
                        className='inner-spiner'
                        sx={{
                            width: { xxs: 150, xs: 150, sm: 200 },
                            height: { xxs: 150, xs: 150, sm: 200 },
                            // backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '10px solid',
                            borderColor: 'myThemeColors.highlight',
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <AppName2 />
                    </Box>
                </Box>

                <Typography variant='h4' fontWeight={'bold'} color={'gray'} mt={2}>Please Wait...</Typography>

            </Box>
        </>
    )
}

export default LoadingPage