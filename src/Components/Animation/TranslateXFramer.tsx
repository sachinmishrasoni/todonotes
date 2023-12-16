import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ITransX {
    children: ReactNode;
    keyName?: string;
    xVal?: string;
    exVal?: string;
    durVal?: number;
    style?: object;
    transType?: string;
}
const TranslateXFramer = ({ children, keyName, xVal = '100vw', exVal = '100vw', durVal=0.5, transType='spring', style }: ITransX) => {
    return (
        /*
            type: just, keyframes, spring, tween
        */
        <motion.div
            className='translate-x-framer'
            style={style}
            key={keyName}
            initial={{ x: xVal, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
                duration: durVal,
                type: transType,
                // bounce: 0
            }}
            exit={{ x: exVal, opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default TranslateXFramer