function convertTime (time)
{
    const year = parseInt((time/31536000).toFixed(8));
    const remainingMonth = time % 31536000;
    const month = parseInt((remainingMonth / 2592000).toFixed(8));
    const remainingWeek = remainingMonth % 2592000;
    const week = parseInt(remainingWeek / 604800);
    const remainingDay = remainingWeek % 604800;
    const day = parseInt(remainingDay/86400);
    const remainingHour = remainingDay % 86400;
    const hour = parseInt(remainingHour/3600);
    const remainingMinute = remainingHour%3600;
    const minute = parseInt(remainingMinute / 60);
    const remainingSecond = remainingMinute % 60;

    if(year)
    {
        const mainTime =`${year} year ${month} month ${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} second`
        return mainTime;
    }
    else if(month)
    {
        const mainTime =`${month} month ${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} second`
        return mainTime; 
    }
    else if(week)
    {
        const mainTime =`${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} second`
        return mainTime; 
    }
    else if(day)
    {
        const mainTime =`${day} day ${hour} hour ${minute} minute ${remainingSecond} second`
        return mainTime; 
    }
    else if(hour)
    {
        const mainTime =`${hour} hour ${minute} minute ${remainingSecond} second`
        return mainTime; 
    }
    else if(minute)
    {
        const mainTime =`${minute} minute ${remainingSecond} second`
        return mainTime; 
    }
    else
    {
        const mainTime =`${remainingSecond} second`
        return mainTime; 
    }
    
    
}
const output = convertTime(75600);
console.log(output)