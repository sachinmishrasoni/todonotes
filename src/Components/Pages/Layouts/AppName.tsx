import { Box, Stack, Typography } from "@mui/material";
import { Create } from "@mui/icons-material"

const AppName = ({ note = false }) => {
    return (
        <>
            <Box className='app-name-box' display={'inline-block'} bgcolor={'light-pink'}>
                <Stack flexDirection={'column'} sx={{
                    position: 'relative',
                    userSelect: 'none',
                    '& .MuiTypography-root:not(span), ': {
                        textShadow: '2px 2px 3px rgba(0,0,0,0.5)',
                    },
                    '& .appname': { fontSize: { xxs: '1.25rem', xs: '1.32rem', sm: '1.82rem', md: '2.034rem' } },
                    '& .appname span': { position: 'relative', color: 'pink' },
                    '& .appname span::before': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        // top: { xxs: '4px', xs: '4px', sm: '5px', md: '7px' },
                        top: { xxs: '1px', xs: '1px', sm: '2px', md: '3px' },
                        width: '100%',
                        // height: {xxs: '3px', sm: '5px'},
                        height: { xxs: '7px', sm: '9px' },
                        borderRadius: '10px',
                        backgroundColor: 'pink',
                        // boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                    },
                    '& .sm-text': {
                        fontSize: { xxs: '0.35rem', xs: '0.45rem', sm: '0.55rem' },
                        color: 'black',
                        position: 'absolute',
                        right: {xxs: '18px', xs: '16px', sm: '25px', md: '28px'},
                        top: {xxs: '-0.658px', xs: '-1.9px', sm: '-0.8px', md: '0.5px'}
                    },
                    '& .pencil-icon': {
                        position: 'absolute',
                        bottom: { xxs: '8px', xs: '8px', sm: '11px', md: '13px' },
                        right: -15
                    }
                }}>
                    <Typography className="appname" variant="h4" fontWeight={'bold'} fontFamily={'Merienda'}>Todo<span>noTes</span>.</Typography>
                    <Create className="pencil-icon" fontSize="small"/>
                    <Typography className="sm-text" variant="caption" fontWeight={600}>EveryDay</Typography>

                    {
                        note && (
                            <Typography component={'span'} variant="caption" fontWeight={'bold'} textAlign={'center'} lineHeight={0} >-: Todo+Notes :-</Typography>
                        )
                    }

                </Stack>
            </Box>
        </>
    )
}

export default AppName;