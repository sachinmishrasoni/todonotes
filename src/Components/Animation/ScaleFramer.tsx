import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IScaleF {
    children: ReactNode;
    keyName?: string;
}
const ScaleFramer = ({ children, keyName }: IScaleF) => {
    return (
        <motion.div
            key={keyName}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default ScaleFramer;