export type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]};

export type Position = {
  x: number;
  y: number;
};
