export interface IOption<T extends string | number = number> {
  value: T;
  label: string;
}
