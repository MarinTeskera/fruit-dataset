export interface ICreateData {
  name: string;
  color: string;
  type: string;
  description: string;
  country: {
    countryName: string;
    countryCode: string;
  };
  nutritionalValues: Array<{
    nutritionalValueName: string;
    percentage: number;
  }>;
  prices: Array<{ amount: number; currency: string }>;
}
