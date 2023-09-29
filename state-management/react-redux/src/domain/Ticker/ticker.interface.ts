export interface ITicker {
  ticker: string;
  name: string;
  description: string;
  market: string;
  market_cap: number | null;
  weighted_shares_outstanding: number | null;
  active: boolean;
}