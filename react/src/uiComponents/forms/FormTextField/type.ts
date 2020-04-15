export interface FormOnChangeFunctionInterface {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}


export interface FormOnChangeSelectInterface {
  (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void;
}

export interface FormTextFieldProps {
  onChange: FormOnChangeFunctionInterface,
  value: string,
  fieldName: string,
  label: string,
  errorFields: string[],
  type?: string,
}
