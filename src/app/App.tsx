import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { InstallGuide } from './components/InstallGuide';

export default function App() {
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');
  const [status3, setStatus3] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const handleTransaction = (setStatus: (status: string) => void) => {
    setStatus('Sending transaction...');
    setTimeout(() => {
      setStatus('✓ Transaction completed');
    }, 1500);
  };

  if (showGuide) {
    return <InstallGuide onBack={() => setShowGuide(false)} />;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl text-slate-900">
            <span className="text-blue-600">#</span> AEGIS Demo
          </h1>
          <Button 
            onClick={() => setShowGuide(true)}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Install Extension (Demo)
          </Button>
        </div>

        <div className="space-y-10">
          {/* Transaction 1: Normal Token Transfer */}
          <div>
            <h2 className="text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Normal Token Transfer
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Execute ModuleA7702.dispatch() to transfer 1 AGT token. AI precheck analyzes the transaction for security risks.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus1)}
              className="bg-blue-600 hover:bg-blue-700"
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
            <h2 className="text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Malicious Delegation Attempt
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Attempt to change EIP-7702 delegation target to unauthorized address. AI precheck should block this transaction.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus2)}
              className="bg-blue-600 hover:bg-blue-700"
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
            <h2 className="text-lg mb-2 text-slate-900">
              <span className="text-blue-600">##</span> Post-execution Anomaly Detection
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Execute transaction that passes precheck but shows anomalous behavior post-execution. Wallet should auto-freeze.
            </p>
            <Button 
              onClick={() => handleTransaction(setStatus3)}
              className="bg-blue-600 hover:bg-blue-700"
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