'use client';

import { useState, useEffect, useRef } from 'react';

export default function Terminal({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = [
      { text: '> Initializing SolanaBot...', delay: 300 },
      { text: '✓ Connected to Solana Mainnet', delay: 600 },
      { text: '✓ Wallet initialized', delay: 900 },
      { text: '✓ Smart contract templates loaded', delay: 1200 },
      { text: '> Preparing development environment...', delay: 1800 },
      { text: '✓ Bot interface ready', delay: 2200 },
      { text: '✓ Token creation tools loaded', delay: 2500 },
      { text: '> System ready! Redirecting to dashboard...', delay: 3000 },
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      onComplete();
    }, 3500);
  }, [onComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-dark border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-white/40 font-mono">solanabot.terminal</div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-6 h-96 overflow-y-auto font-mono text-sm space-y-2"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${
                  line.startsWith('✓') ? 'text-secondary' : 
                  line.startsWith('>') ? 'text-primary' : 
                  'text-white/60'
                } animate-fade-in`}
              >
                {line}
              </div>
            ))}
            {lines.length > 0 && (
              <div className="flex items-center text-white/60">
                <span className="terminal-cursor"></span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-sm text-white/60">Setting up your workspace...</span>
          </div>
        </div>
      </div>
    </div>
  );
}