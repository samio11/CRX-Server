import { AppError } from "../../errors/AppError";

export const priceByDays = (price: number, days: number) => {
  if (days === 1) return price;
  if (days === 7) return price * 7 * 0.95;
  if (days === 30) return price * 30 * 0.9;
  throw new AppError(400, "Invalid rental duration");
};
