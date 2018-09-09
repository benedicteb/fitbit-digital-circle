const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

const getMonthShortName = monthIndex => {
  return monthShortNames[monthIndex];
};

export default getMonthShortName;
