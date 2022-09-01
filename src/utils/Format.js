export class Format{

    constructor(){


    }

    static toTime(duration) {

        let milliseconds = parseInt((duration % 1000) / 100)
            , seconds = parseInt((duration / 1000) % 60)
            , minutes = parseInt((duration / (1000 * 60)) % 60)
            , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        } else {
            return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;

        }

    }

    static fbTimeStampToTime(timeStamp) {

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';

    }

    static dateToTime(date, locale = 'pt-BR') {

        let string = '';

        if (date && date instanceof Date) {
            string = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        }

        return string;

    }

    static timeStampToTime(timeStamp) {

        return (timeStamp) ? Format.dateToTime(new Date(timeStamp)) : '';

    }

    static dateToTime(date) {

        let nDate = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', seconds: '2-digit' });

        let index = nDate.lastIndexOf(":");
        let newDate = nDate.substring(0, index);

        return newDate;

    }
}