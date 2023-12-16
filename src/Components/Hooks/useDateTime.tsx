import { useState } from 'react'

const useDateTime = () => {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const [dateTime] = useState({
        time: '',
        fullDate: `${date <= 9 ? '0' + date : date}-${month <= 9 ? '0' + month : month}-${year}`
    });
    return [dateTime]
}
 
export default useDateTime