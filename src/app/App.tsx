import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { InstallGuide } from './components/InstallGuide';

function shortenAddress(address: string, head = 6, tail = 4): string {
  if (address.length <= head + tail) return address;
  return `${address.slice(0, head)}...${address.slice(-tail)}`;
}

export default function App() {
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');
  const [status3, setStatus3] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connectError, setConnectError] = useState('');

  const handleTransaction = (setStatus: (status: string) => void) => {
    setStatus('Sending transaction...');
    setTimeout(() => {
      setStatus('✓ Transaction completed');
    }, 1500);
  };

  const connectWallet = async () => {
    setConnectError('');
    if (typeof window === 'undefined' || !window.aegis) {
      setShowGuide(true);
      return;
    }
    try {
      const result = await window.aegis.request({ method: 'eth_requestAccounts' });
      const accounts = Array.isArray(result) ? result : (result as { accounts?: string[] })?.accounts;
      const address = Array.isArray(accounts) && accounts.length > 0
        ? (typeof accounts[0] === 'string' ? accounts[0] : String(accounts[0]))
        : null;
      if (address) {
        setWalletAddress(address);
      } else {
        setConnectError('No account returned');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Connection failed';
      setConnectError(message);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setConnectError('');
  };

  if (showGuide) {
    return <InstallGuide onBack={() => setShowGuide(false)} />;
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl text-slate-900 mb-4">
            <span className="text-blue-600">#</span> AEGIS Demo
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            {walletAddress ? (
              <>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 border border-green-200 rounded-lg flex-1 sm:flex-none">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 truncate" title={walletAddress}>
                    {shortenAddress(walletAddress)}
                  </span>
                </div>
                <Button 
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button 
                onClick={connectWallet}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                Connect Wallet
              </Button>
            )}
            {connectError && (
              <p className="text-sm text-red-600 w-full">{connectError}</p>
            )}
            <Button 
              onClick={() => setShowGuide(true)}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
            >
              Install Extension (Demo)
            </Button>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {/* Transaction 1: Normal Token Transfer */}
          <div>
            <h2 className="text-base sm:text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Normal Token Transfer
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Execute ModuleA7702.dispatch() to transfer 1 AGT token. AI precheck analyzes the transaction for security risks.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus1)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Execute Transaction
            </Button>
            {status1 && (
              <p className={`mt-3 text-sm ${status1.includes('✓') ? 'text-green-600' : 'text-slate-600'}`}>
                {status1}
              </p>
            )}
          </div>

          {/* Transaction 2: Malicious Delegation */}
          <div>
            <h2 className="text-base sm:text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Malicious Delegation Attempt
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Attempt to change EIP-7702 delegation target to unauthorized address. AI precheck should block this transaction.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus2)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Execute Transaction
            </Button>
            {status2 && (
              <p className={`mt-3 text-sm ${status2.includes('✓') ? 'text-green-600' : 'text-slate-600'}`}>
                {status2}
              </p>
            )}
          </div>

          {/* Transaction 3: Post-execution Anomaly */}
          <div>
            <h2 className="text-base sm:text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Post-execution Anomaly Detection
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Execute transaction that passes precheck but shows anomalous behavior post-execution. Wallet should auto-freeze.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus3)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Execute Transaction
            </Button>
            {status3 && (
              <p className={`mt-3 text-sm ${status3.includes('✓') ? 'text-green-600' : 'text-slate-600'}`}>
                {status3}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}