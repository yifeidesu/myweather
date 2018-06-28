// array of cities to show
let cities =
    [
        { id: 0, name: 'toronto' },
        { id: 1, name: 'vancouver' },
        { id: 2, name: 'ottawa' },
        { id: 3, name: 'hamilton' },
        { id: 4, name: 'london,ca' },
        { id: 5, name: 'kingston' },
        { id: 6, name: 'windsor' }
    ];

function getWeatherEmojiCode(desc: string): any {
    desc = desc.toLowerCase();
    
    switch (desc) {
        case 'rain': { return '<i class="fas fa-umbrella"><i>'; }
        case 'clear': { return '<i class="fas fa-umbrella-beach"><i>'; }
        case 'clouds': { return '<i class="fas fa-cloud"><i>'; }
        case 'drizzle': { return '<i class="fas fa-shower"><i>'; }
        case 'snow': { return '<i class="fas fa-snow"><i>'; }
        case 'Atmosphere': { return '<i class="fas fa-align-justify"><i>'; }
        case 'mist': { return '<i class="fas fa-align-justify"><i>'; }

        default: { return '<i class="far fa-smile-wink"></i>'; }
    }
}

export { cities, getWeatherEmojiCode };