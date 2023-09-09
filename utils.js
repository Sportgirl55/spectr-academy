export const formatTime = (elem) => elem.toString().padStart(2, "0");

// Генератор случайных дат в пределах текущего месяца

export function getRandomDateWithinMonth() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const randomDay = Math.floor(Math.random() * 30) + 1;
  return new Date(currentYear, currentMonth, randomDay);
}