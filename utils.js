export const formatTime = (elem) => elem.toString().padStart(2, "0");

// Генератор случайных дат в пределах 45 дней

export function getRandomDate() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const randomDay = Math.floor(Math.random() * 45) + 1;
  return new Date(currentYear, currentMonth, randomDay);
}