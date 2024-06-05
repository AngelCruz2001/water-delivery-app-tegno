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
