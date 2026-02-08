/**
 * AEGIS wallet provider injected by the extension (window.aegis).
 * Wallet connection: request({ method: 'eth_requestAccounts' }) → Promise<string[]>
 */
interface AegisProvider {
  request(args: { method: 'eth_requestAccounts'; params?: never }): Promise<string[]>;
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

declare global {
  interface Window {
    aegis?: AegisProvider;
  }
}

export {};
