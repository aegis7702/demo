/** Transaction payload for eth_sendTransaction */
export interface EthTransactionParams {
  from: string;
  to?: string;
  value?: string;
  data?: string;
  txType?: number;
  authorizationList?: { address: string }[];
  gas?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  nonce?: string;
  chainId?: string;
}

/**
 * AEGIS wallet provider injected by the extension (window.aegis).
 * - Wallet connection: request({ method: 'eth_requestAccounts' }) → Promise<string[]>
 * - Send tx: request({ method: 'eth_sendTransaction', params: [tx] }) → Promise<string> (tx hash)
 */
interface AegisProvider {
  request(args: { method: 'eth_requestAccounts'; params?: never }): Promise<string[]>;
  request(args: { method: 'eth_sendTransaction'; params: [EthTransactionParams] }): Promise<string>;
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

declare global {
  interface Window {
    aegis?: AegisProvider;
  }
}

export {};
