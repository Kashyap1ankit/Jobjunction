import { TextComponentType } from "@/types/types";

export default function TextComponent({ text, className }: TextComponentType) {
  return <p className={className}>{text}</p>;
}
