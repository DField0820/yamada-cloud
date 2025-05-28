'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalSteps = [
    { type: 'cmd', text: 'ssh-keygen -t ed25519' },
    { type: 'cmd', text: 'ssh -i ~/.ssh/id_ed25519 terumi@hostname.yamada.cloud' },
    { type: 'cmd', text: 'cd ~/projects/cfd-solver' },
    { type: 'cmd', text: 'mpirun -n 8 ./simulate flow.yaml' },
    { type: 'output', text: '[✔] Simulation started on 8 cores' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.map(s => s.text).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 text-white font-mono text-sm relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          {terminalSteps.map((step, index) => (
            <div
              key={index}
              className={`${index > terminalStep ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 whitespace-pre-line`}
            >
              {step.type === 'cmd' ? (
                <>
                  <span className="text-green-400">$</span> {step.text}
                </>
              ) : (
                <span className="text-gray-300">{step.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
