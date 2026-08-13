export function formatCurrency(
  amount: number,
  options?: {
    locale?: string;
    currency?: string;
    maximumFractionDigits?: number;
  }
) {
  return new Intl.NumberFormat(options?.locale ?? "en-IN", {
    style: "currency",
    currency: options?.currency ?? "INR",
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(amount);
}
