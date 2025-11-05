'use client';

import { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import Hero from './components/Hero';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [username, setUsername] = useState('');

  const handleTwitterLogin = () => {
    // Simulate Twitter OAuth
    setUsername('@crypto_builder');
    setIsAuthenticated(true);
    setTimeout(() => setShowDashboard(true), 1000);
  };

  return (
    <main className="min-h-screen bg-darker relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">SolanaBot</span>
          </div>
          
          {!isAuthenticated ? (
            <button
              onClick={handleTwitterLogin}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect with X
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{username}</span>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          )}
        </nav>
      </header>

      <div className="relative z-10">
        {!isAuthenticated ? (
          <Hero onGetStarted={handleTwitterLogin} />
        ) : !showDashboard ? (
          <Terminal onComplete={() => setShowDashboard(true)} />
        ) : (
          <Dashboard username={username} />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/40">
              © 2024 SolanaBot. Powered by Solana Blockchain.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">API</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}