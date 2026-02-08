import { encodeFunctionData } from 'viem';

/**
 * Mirrors Solidity:
 *   struct Request { address to; uint256 value; bytes data; }
 *   function dispatch(Request[] calldata requests) external payable
 */
export interface DispatchRequest {
  /** Target address (20 bytes) */
  to: `0x${string}`;
  /** Wei (uint256) */
  value: bigint;
  /** Calldata for the inner call */
  data: `0x${string}`;
}

const DISPATCH_ABI = [
  {
    name: 'dispatch',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'requests',
        type: 'tuple[]',
        components: [
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'data', type: 'bytes' },
        ],
      },
    ],
  },
] as const;

/**
 * Builds calldata for dispatch(Request[] calldata requests).
 * Use as the `data` field of eth_sendTransaction when the target contract has dispatch(Request[]).
 */
export function buildDispatchData(requests: DispatchRequest[]): `0x${string}` {
  if (requests.length === 0) {
    throw new Error('dispatch requires at least one Request');
  }
  return encodeFunctionData({
    abi: DISPATCH_ABI,
    functionName: 'dispatch',
    args: [
      requests.map((r) => ({
        to: r.to as `0x${string}`,
        value: r.value,
        data: r.data as `0x${string}`,
      })),
    ],
  });
}

/**
 * Helper: one request (e.g. single token transfer or contract call).
 */
export function buildDispatchDataSingle(
  to: `0x${string}`,
  value: bigint,
  data: `0x${string}`
): `0x${string}` {
  return buildDispatchData([{ to, value, data }]);
}
