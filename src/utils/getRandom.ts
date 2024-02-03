/**
 * Генерирует случайное целое число в заданном диапазоне.
 *
 * @param {number} min - Минимальное значение диапазона (включительно).
 * @param {number} max - Максимальное значение диапазона (включительно).
 * @returns {number} - Случайное целое число в указанном диапазоне.
 */
const getRandom = (min: number, max: number): number => {
  const minInt = Math.floor(min);
  const maxInt = Math.floor(max) - minInt + 1;

  return Math.floor(Math.random() * maxInt) + minInt;
};

/**
 * Генерирует случайное число с плавающей точкой в заданном диапазоне.
 *
 * @param {number} min - Минимальное значение диапазона (включительно)
 * @param {number} max - Максимальное значение диапазона (не включая)
 * @returns {number} - Случайное число с плавающей точкой в заданном диапазоне.
 */
const getRandomFloat = (min: number, max: number): number => {
  const minInt = min;
  const maxInt = max - min;

  return Math.random() * maxInt + minInt;
};

export {getRandom, getRandomFloat};
