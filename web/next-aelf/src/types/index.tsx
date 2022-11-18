export type TokenInfo = {
  decimals: number;
  symbol: string;
  tokenName?: string;
  address?: string;
  issueChainId?: number;
  issuer?: string;
  isBurnable?: boolean;
  totalSupply?: number;
};
