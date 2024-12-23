import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
}

export default function Input({ errors, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="border border-blue-500 px-2 py-3 rounded-2xl"
        {...props}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
