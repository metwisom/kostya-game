## Что это такое

Утилиты это набор функций для упрощения некоторых действий

## Базовый набор

```typescript
getRandom(min: number, max: number): number
// min <= RESULT <= max
```  
Возвращает случайное целое число включая границы указанного диапазона  

```typescript
getRandomFloat(min: number, max: number): number
// min <= RESULT < max
```  
Возвращает случайное вещественное число включая минимальную границу и не вклюая максимальную  

```typescript
intersectRect(first: BoxArea, second: BoxArea): boolean
```
Проверка на пересечение двух прямоугольников

```typescript
requestAnimationFrame(callback: FrameRequestCallback)
```
Отрисовка с вертикальной синхронизакией с браузером