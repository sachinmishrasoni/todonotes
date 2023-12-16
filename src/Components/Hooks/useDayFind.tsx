// import React from 'react'
import dayjs from "dayjs";

const useDayFind = (date: string) => {
    let dayCount = 0;
    const currentDate = dayjs().format("DD-MM-YYYY");
    const currentDateArr = currentDate.split('-').map((item) => parseInt(item));
    const [currDate] = currentDateArr;
    const myDate = date.split('-').map((item) => parseInt(item));
    const [userDate] = myDate;
    if (currDate >= userDate) {
        dayCount = currDate - userDate;
    } else {
        dayCount = currDate + 30 - userDate;
    }

    return dayCount === 0 ? 'Today' : dayCount === 1 ? 'Yesterday' : date;
}

export default useDayFind