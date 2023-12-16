import { motion } from 'framer-motion';

interface IInOutYmotionProps {
    children: any;
    keyName?: string;
    inyVal?: number;
    exyVal?: number;
    durVal?: number;
}
const InOutYmotion = ({ children, keyName, inyVal = -50, exyVal = 50 }: IInOutYmotionProps) => {
    return (
        <motion.div
            key={keyName}
            initial={{
                y: inyVal,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            exit={{
                y: exyVal,
                opacity: 0
            }}
        >
            {children}
        </motion.div>
    )
}

export default InOutYmotion