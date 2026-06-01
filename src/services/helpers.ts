export function formatDate(date: Date) {
  let formattedDate = date?.toLocaleString();
  formattedDate = formattedDate.replace("\,", " -");

  return formattedDate;
}
