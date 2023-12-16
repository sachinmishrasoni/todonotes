import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IModeBtnF {
    children: ReactNode;
    keyName?: string;
}
const ModeBtnFramer = ({ children, keyName }: IModeBtnF) => {
    return (
        <motion.div
            style={{display: 'inline-flex'}}
            key={keyName}
            initial={{ translate: '30px -25px', scale: 0 }}
            animate={{ translate: '0px 0px', scale: 1 }}
            exit={{ translate: '-30px -25px', scale: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}

export default ModeBtnFramer