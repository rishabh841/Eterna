export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  SNIPER = 'SNIPER'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ROUTING = 'ROUTING',
  BUILDING = 'BUILDING',
  SUBMITTED = 'SUBMITTED',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED'
}

export interface Order {
  id: string;
  type: OrderType;
  pair: string;
  amount: number;
  status: OrderStatus;
  timestamp: number;
  txHash?: string;
  routingInfo?: {
    bestDex: 'Raydium' | 'Meteora';
    raydiumPrice: number;
    meteoraPrice: number;
    executionPrice: number;
  };
  logs: string[];
}

export interface DexQuote {
  price: number;
  fee: number;
  dex: 'Raydium' | 'Meteora';
}