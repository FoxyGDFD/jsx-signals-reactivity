import { signal, createElement, computed } from "../libs";

export function Counter() {
  const count = signal(0);
  const isEven = computed(() => count() % 2 === 0 ? "Четное" : "Нечетное")
  return (
    <div>
      <h1>Счет: {count}</h1>
      <button onClick={() => count.set(count() + 1)}>+1</button>
      <button onClick={() => count.set(count() - 1)}>-1</button>
      <p>{isEven}</p>
    </div>
  );
}