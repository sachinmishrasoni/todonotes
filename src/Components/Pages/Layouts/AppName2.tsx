import { Box, Typography } from '@mui/material';

const AppName2 = () => {
    return (
        <>
            <Box sx={{
                display: 'inline-block',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
                '& .app-name:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 3,
                    height: '3px',
                    width: '100%',
                    borderRadius: '5px',
                    backgroundColor: 'myThemeColors.highlight'
                }
            }}>
                <Typography
                    className="app-name"
                    variant="h4" 
                    fontFamily={'Pacifico'}
                    sx={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}
                >Todonotes</Typography>
                <Typography variant="caption" sx={{
                    px: 0.5,
                    lineHeight: 1.3,
                    fontSize: {xxs: '0.45rem', sm: '0.50rem', md: '0.55rem'},
                    fontWeight: 'bold',
                    // color: 'white',
                    backgroundColor: 'myThemeColors.highlight',
                    borderRadius: '25px',
                    position: 'absolute',
                    bottom: {xxs:18 , sm: 21, md: 22},
                    right: {xxs:24 , sm: 30, md: 34},
                    zIndex: -5
                }}>Everyday</Typography>
            </Box>
        </>
    )
}

export default AppName2;