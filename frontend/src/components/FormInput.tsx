import type { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInput = {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = (props: FormInput) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={props.name}>{props.label}</Label>
      <Input
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange}
        required
        autoComplete="on"
      />
    </div>
  );
};
