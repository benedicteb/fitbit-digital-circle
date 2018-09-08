// Add zero in front of numbers < 10
export function padNumber(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
