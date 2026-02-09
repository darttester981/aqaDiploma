/**
 * Преобразует строку цены в число
 * Пример: "12 345 ₽" → 12345
 */
export function parsePrice(text) {
  return Number(text.replace(/\D/g, ''));
}