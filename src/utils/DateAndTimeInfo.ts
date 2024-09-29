import { format, parseISO } from 'date-fns';

export function extractDateTimeInfo(dateString: string) {
    const date = parseISO(dateString);
    
    const dayName = format(date, 'EEEE');
    const dayNumber = format(date, 'dd');
    
    const monthName = format(date, 'MMMM');
    const monthNumber = format(date, 'MM');
    
    const year = format(date, 'yyyy');
    
    const time = format(date, 'HH:mm');

    const dateInfo: DateInfo = {
        dayName,
        dayNumber,
        monthName,
        monthNumber,
        year,
        time
    }

    return dateInfo;
}