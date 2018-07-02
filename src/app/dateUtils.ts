function getDay(dt): string {
    const days = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
    const date = new Date(dt);

    return days[date.getDay()];
}


function formatTime(dt):string {
    const date = new Date(dt + ' UTC');
    
    let hour = date.getHours();
    let hourStr = (hour < 12)? (hour.toString() + ' a.m.') :((hour-12).toString() + ' p.m.');
  
    return hourStr;
}

export { getDay, formatTime };