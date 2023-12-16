import { useEffect, useState } from 'react'

const useDayCount = (currFullDate: string, prevFullDate: string) => {
    const [dateCount, setDateCount] = useState(0);
    const currFullDateArr = currFullDate.split('-').map((item) => parseInt(item));
    const [currDate] = currFullDateArr;
    const prevFullDateArr = prevFullDate.split('-').map((item) => parseInt(item));
    const [prevDate] = prevFullDateArr;

    useEffect(() => {
        if (currDate > prevDate) {
            setDateCount(currDate - prevDate)
        } else {
            setDateCount(currDate + 30 - prevDate)
        }
    }, [])

    return [dateCount]
}

export default useDayCount