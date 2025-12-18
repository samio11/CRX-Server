export interface ICar {
  _id?: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  category: "sedan" | "suv" | "hatchback" | "luxury" | "sports" | "van";
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  seats: number;
  features: string[];
  image: string;
  mileage: number;
  isAvailable: boolean;
  location: string;
  isDeleted: boolean;
}
