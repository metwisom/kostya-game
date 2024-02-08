import {BoxArea} from "../classes/Engine/Box/Box";

/**
 * Проверяет пересечение двух прямоугольных областей.
 *
 * @param {BoxArea} first - Первая прямоугольная область.
 * @param {BoxArea} second - Вторая прямоугольная область.
 * @returns {boolean} - Возвращает true, если области пересекаются, иначе false.
 */
const intersectRect = (first: BoxArea, second: BoxArea): boolean => {
  return !(second.x >= first.width + first.x ||
    second.x + second.width <= first.x ||
    second.y >= first.height + first.y ||
    second.y + second.height <= first.y);
};

export {intersectRect};
