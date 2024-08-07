import {format} from 'date-fns';
import {es} from 'date-fns/locale';

export const formatDate = (dateToFormat: Date) => {
  const date = dateToFormat;
  const formatString = 'dd/MMMM/yyyy';

  const formattedDate = format(date, formatString, {
    locale: es,
  });
  return formattedDate;
};

export const getWeekDay = (dayNumber: number) => {
  const days = [
    'Dom',
    'Lun',
    'Mar',
    'Mié',
    'Jue',
    'Vie',
    'Sáb',
  ];
  return days[dayNumber] || '';
};

export const getWeekDaysFromArray = (dayNumbers: number[]) => {
  const todayDayNumber = new Date().getDay();

  if (dayNumbers === undefined) {
    return [];
  }


  return dayNumbers.map(dayNumber => {
    const dayName = getWeekDay(dayNumber);
    // return dayNumber === todayDayNumber ? 'Hoy' : dayName;
    return dayName;
  });
};
