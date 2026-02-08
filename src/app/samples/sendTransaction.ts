import type { EthTransactionParams } from '../../types/aegis';
import { buildDispatchDataSingle } from './dispatchData';

/** 0.001 ETH (for demo) */
const SEND_ETH_AMOUNT = 10n ** 12n;

/**
 * Sample 1: Normal ETH transfer via dispatch(Request[]).
 * One request: to = recipient, value = 0.001 ETH, data = '0x'.
 * AI precheck analyzes for security risks.
 */
export function sampleNormalTokenTransfer(fromAddress: string): EthTransactionParams {
  const recipient = '0x8606c37657bB955D3A2692f5C8902d95E9EC5537' as `0x${string}`;
  return {
    from: fromAddress,
    to: fromAddress, // module / dispatch contract
    value: '0x0',
    data: buildDispatchDataSingle(recipient, SEND_ETH_AMOUNT, '0x'),
  };
}

/**
 * Sample 2: Malicious delegation attempt (EIP-7702).
 * Attempt to set delegation target to an unauthorized address – should be blocked by AI precheck.
 */
export function sampleMaliciousDelegation(fromAddress: string): EthTransactionParams {
  return {
    from: fromAddress,
    to: fromAddress,
    value: '0x0',
    data: '0x',
    txType: 4,
    authorizationList: [
      { address: "0x1111111111111111111111111111111111111111" }
    ],
  };
}

/**
 * Sample 3: Post-execution anomaly.
 * dispatch(Request[]) with one request – passes precheck but anomalous post-execution; wallet may auto-freeze.
 */
export function samplePostExecutionAnomaly(fromAddress: string): EthTransactionParams {
  // const target = '0xb297094a4cb1599f792478bdb966852bff6c117a' as `0x${string}`;
  // const innerCalldata = '0x6cf6cd740000000000000000000000005006818630a7f9d2832fed5b390d93d3ea052b87' as `0x${string}`;
  // const requests: DispatchRequest[] = [
  //   { to: target, value: 0n, data: innerCalldata },
  // ];
  return {
    from: fromAddress,
    to: fromAddress,
    value: '0x0',
    data: "0xb4fa1730000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b297094a4cb1599f792478bdb966852bff6c117a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000246cf6cd740000000000000000000000005006818630a7f9d2832fed5b390d93d3ea052b8700000000000000000000000000000000000000000000000000000000",
  };
}
