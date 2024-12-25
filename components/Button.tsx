import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="border border-blue-400 py-2 rounded-md bg-blue-400 hover:bg-blue-500 transition text-white"
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
