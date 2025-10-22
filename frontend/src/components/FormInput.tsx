import type { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInput = {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  labelStyle?: string;
  inputStyle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

export const FormInput = (props: FormInput) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={props.name} className={props.labelStyle || ""}>
        {props.label}
      </Label>
      <Input
        disabled={props.disabled}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange}
        autoComplete="on"
        className={props.inputStyle || ""}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};
