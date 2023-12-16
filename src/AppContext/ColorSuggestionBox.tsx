import React, { useRef, useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import InOutYmotion from '../Components/Animation/InOutYmotion';

interface IColrSuggBox{
    suggestionColor: string[];
    colorSuggestionPick: Function
}

const ColorSuggestionBox = ({ suggestionColor, colorSuggestionPick }: IColrSuggBox) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isSuggestion, setIsSuggestion] = useState(false);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollLeft += event.deltaY;
            // event.preventDefault();
        }
    };

    const ChipHandle = (color: string) => {
        colorSuggestionPick(color);
    }
    return (
        <>
            <Box className='color-suggestion-box' mt={0.5}>
                <Typography
                    variant='caption'
                    onClick={() => setIsSuggestion((prev) => !prev)}
                    sx={{ 'cursor': 'pointer' }}
                >Suggestion : {isSuggestion ? 'Hide' : 'Show'}</Typography>
                <Box overflow={'hidden'}>
                    <AnimatePresence>
                        {
                            isSuggestion && (
                                <InOutYmotion inyVal={-50} exyVal={-50}>
                                    <Stack
                                        ref={containerRef}
                                        onWheel={handleWheel}
                                        direction={'row'}
                                        gap={0.7} mt={0.5}
                                        sx={{
                                            overflow: 'auto',
                                            scrollBehavior: 'smooth',
                                            '&::-webkit-scrollbar': {
                                                display: 'none'
                                            },
                                        }}>
                                        {
                                            suggestionColor.map((item, index) =>
                                                <Chip
                                                    key={index}
                                                    clickable
                                                    label={item}
                                                    size='small'
                                                    variant='filled'
                                                    sx={{ 
                                                        bgcolor: item,
                                                        '&:hover': { bgcolor: item}
                                                    }}
                                                    onClick={() => ChipHandle(item)}
                                                />
                                            )
                                        }
                                    </Stack>
                                </InOutYmotion>
                            )
                        }
                    </AnimatePresence>
                </Box>
            </Box>
        </>
    )
}

export default ColorSuggestionBox;