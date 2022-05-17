import React from "react";

export interface inputProps {
  required?: boolean;
  state: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

export interface selectProps extends inputProps {
  options: [];
  onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface textProps extends inputProps {
  autoFocus?: boolean;
}
