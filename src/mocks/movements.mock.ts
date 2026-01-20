export type Movement = {
  id: number;
  date: string;
  description: string;
  points: number;
};

const ALL_MOVEMENTS: Movement[] = Array.from({ length: 17 }).map((_, i) => ({
  id: i + 1,
  date: `2025-01-${String((i % 28) + 1).padStart(2, '0')}`,
  description: `Movimiento #${i + 1}`,
  points: i % 2 === 0 ? 120 : -80,
}));

export function getMovementsMock(page: number, pageSize = 4) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: ALL_MOVEMENTS.slice(start, end),
    total: ALL_MOVEMENTS.length,
    page,
    pageSize,
  };
}
