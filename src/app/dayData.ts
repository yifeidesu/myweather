import { getDay } from './dateUtils';

export class DayData {
    dtTxt = '';
    desc = '';
    tempMax = 0;
    tempMin = 0;
    dayName = '';

    constructor(dtTxt: string = '', dt, tempMax, tempMin, desc) {
        this.dtTxt = dtTxt;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.desc = desc;
        this.dayName = this.getDay(dtTxt);
    }

    getDay(dt): string {
        return getDay(dt);
    }
}

