import moment from 'moment';

export const formatDisplayDate = date => {
  const formattedDate = moment
    .utc(date)
    .format('llll')
    .split(' ');

  return (
    formattedDate[0] +
    ' ' +
    formattedDate[1] +
    ' ' +
    formattedDate[2] +
    ' ' +
    formattedDate[3]
  );
};

export const formatDate = (date, formatType) => {
  return moment.utc(date).format(formatType);
};

export const getCurrentDate = () => {
  return moment.parseZone().format('MM/DD/YYYY');
};

export const getCurrentMonth = () => {
  const currentDate = moment(moment(), 'YYYY/MM/DD');
  const currentMonth = currentDate.format('M');
  return currentMonth;
};

export const getCurrentYear = () => {
  const currentDate = moment(moment(), 'YYYY/MM/DD');
  const currentYear = currentDate.format('Y');
  return currentYear;
};
