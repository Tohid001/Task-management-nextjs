type Modify<T, R> = Omit<T, keyof R> & R;
export interface inputProps {
  required?: boolean;
  value: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

export type selectProps = Modify<
  inputProps,
  {
    options: string[];
    onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }
>;
export interface textProps extends inputProps {
  autoFocus?: boolean;
}
