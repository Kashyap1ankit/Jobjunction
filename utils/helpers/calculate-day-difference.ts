const oneDay = 1000 * 60 * 60 * 24;

export function calculateDayDiff(dateToComp: Date) {
  const difference = (Date.now() - new Date(dateToComp).getTime()) / oneDay;

  return difference;
}
