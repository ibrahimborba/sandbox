export interface ITicker {
  ticker: string;
  name: string;
  description: string;
  market: 'stocks' |'crypto' | 'fx' | 'otc' | 'indices';
  market_cap: number;
  weighted_shares_outstanding: number;
  active: boolean;
}