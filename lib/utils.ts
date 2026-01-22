import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWithGrouping(
  value?: string,
  options: { fractionDigits?: number } = {},
) {
  if (!value) return "—";
  const fractionDigits = options.fractionDigits ?? 4;
  const [intPart, fracPart] = value.split(".");
  const groupedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!fracPart) return groupedInt;
  const trimmedFrac = fracPart.slice(0, fractionDigits).replace(/0+$/, "");
  return trimmedFrac ? `${groupedInt}.${trimmedFrac}` : groupedInt;
}
