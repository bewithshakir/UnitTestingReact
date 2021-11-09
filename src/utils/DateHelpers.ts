import moment from 'moment';

const preFormatDate = (date: string | null | Date) => {
  return typeof date === 'string' && date.length > 0 ? date.replace('Z', '') : date;
};

export const formatDateAsYYYYMMDD = (date: string | null | Date) => {
  return date ? moment(preFormatDate(date)).format('YYYY-MM-DD') : '';
};

export const formatTime = (date: string | null | Date) => {
  return date ? moment(preFormatDate(date)).format('hh:mm A') : '';
};

export const formatDateAsMMDDYYYY = (date: string | null | Date) => {
  return date ? moment(preFormatDate(date)).format('MM/DD/YYYY') : '';
};

export const formatDateMonthDayYear = (date: string | null | Date) => {
  return date ? moment(preFormatDate(date)).format('MMM DD, YYYY') : '';
};

export const formatDateTime = (date: string | null | Date) => {
  return date ? moment(date).format('MMM DD, YYYY hh:mm A') : '';
};

export const isTheDateToday = (date: string | null | Date) => {
  return date ? moment(date).format("Do") === moment().format("Do") : '';
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};