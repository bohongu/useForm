import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="border border-blue-500 px-2 py-3 rounded-2xl"
        {...props}
      />
      {!!error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
