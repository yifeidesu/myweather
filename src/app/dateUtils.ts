function getDay(dt): string {
    const days = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
    const date = new Date(dt);

    return days[date.getDay()];
}

function formatTime(dt):string {
    const date = new Date(dt);
    let hour = date.getHours();
    let hourStr = (hour > 12)? (hour.toString() + ' a.m.') :(hour.toString() + ' p.m.');
    console.log(dt);
    console.log(hourStr);
    return hourStr;
}

export { getDay, formatTime };