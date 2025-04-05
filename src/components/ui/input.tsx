import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
    label : string;
    name : string;
    type? : string;
    placeholder? : string;
    register: UseFormRegister<any>;
    required? : boolean;
    errors: FieldErrors;
}

const FloatingLabelInput = ({
  label,
  name,
  type ,
  placeholder,
  register,
  required,
  errors = {},
} : InputProps) => {
  return (
    <div className=" relative w-full">
      <label
        htmlFor={name}
        className="absolute -top-3 left-2 bg-white px-1 text-sm text-purple-600"
      >
        {label}
        {required&& <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className="w-[335px] h-[40px] border border-[#CBCBCB] rounded-[6px] opacity-100 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message as string}</p>
      )}
    </div>
  );
};

export default FloatingLabelInput;
