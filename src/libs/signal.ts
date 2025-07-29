export type Signal<T> = {
  (): T;
  set: (value: T) => void;
  subscribe: (fn: () => void) => void;
};

let currentEffect: (() => void) | null = null;

export const signal = <T>(initialValue: T): Signal<T> => {
  let value = initialValue;
  const subscribers = new Set<() => void>();


  const getter = () => {
    if (currentEffect) subscribers.add(currentEffect);
    return value;
  };

  getter.set = (newValue: T) => {
    value = newValue;
    subscribers.forEach((fn) => fn());
  };

  getter.subscribe = (fn: () => void) => {
    subscribers.add(fn);
  }

  return getter;
}

export function effect(fn: () => void): void {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

export const computed = (fn: () =>  void) => {
  const value = signal(fn());
  
  effect(() => value.set(fn()))

  return value;
}