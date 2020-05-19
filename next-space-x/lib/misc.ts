import { formatDistance, parseISO, format } from "date-fns";

export function distanceDate(dateStr: string, baseDate: number) {
  const date = getDate(dateStr);
  return formatDistance(date, baseDate);
}

const FORMAT = 'yyyy-MM-dd';
export function formatDate(dateStr) {
  const date = getDate(dateStr);
  return format(date, FORMAT);
}

const getDate = (dateStr: string) => parseISO(dateStr);

interface LaunchDate {
  launch_date_utc: string
}

export function sortByLaunchDate<T extends LaunchDate>(data1: T, data2: T) {
  if (data1.launch_date_utc < data2.launch_date_utc) {
    return 1;
  } else if (data1.launch_date_utc > data2.launch_date_utc) {
    return -1;
  } else {
    return 1;
  }
}