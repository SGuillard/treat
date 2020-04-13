export interface FormOnChangeFunctionInterface {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface FormTextFieldProps {
  onChange: FormOnChangeFunctionInterface,
  value: string,
  fieldName: string,
  label: string,
  errorFields: string[],
}
