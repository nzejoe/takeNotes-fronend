import React from 'react'

const DateDashboard = ({date}) => {
    const daysWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 
    const dateCreated = new Date(date)

    // day
    const day = dateCreated.getDate()
    const dayFormatted = day < 10 ? '0'+day: day

    // hours
    const hour = dateCreated.getHours()
    const hourFormatted = hour < 10 ? '0'+hour: hour

    // minutes
    const minutes = dateCreated.getMinutes()
    const minutesFormatted = minutes < 10 ? '0'+minutes: minutes

    return (
      <small>
        {daysWeek[dateCreated.getDay()]},{" "}
        <small>
         { `${dayFormatted} ${month[dateCreated.getMonth()]}
          ${dateCreated.getFullYear()} ${hourFormatted}:${minutesFormatted}`}
        </small>
      </small>
    );
}

export default DateDashboard;
