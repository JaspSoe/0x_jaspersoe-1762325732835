'use client';

import { useState } from 'react';

interface DApp {
  id: string;
  name: string;
  type: string;
  status: 'deployed' | 'generating' | 'draft';
  address: string;
  volume: string;
  users: number;
  created: string;
}

export default function Dashboard({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState<'apps' | 'create' | 'tokens'>('create');
  const [botInput, setBotInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'bot'; message: string }>>([
    { role: 'bot', message: 'Hello! I\'m SolanaBot. I can help you create dApps, launch tokens, or deploy NFT collections. What would you like to build today?' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [dapps] = useState<DApp[]>([
    {
      id: '1',
      name: 'MoonDoge Token',
      type: 'Memecoin Launchpad',
      status: 'deployed',
      address: '7xKXtg2CW...',
      volume: '$124.5K',
      users: 432,
      created: '2 hours ago'
    },
    {
      id: '2',
      name: 'NFT Marketplace',
      type: 'NFT Platform',
      status: 'deployed',
      address: '9pLMng3FX...',
      volume: '$89.2K',
      users: 287,
      created: '1 day ago'
    },
    {
      id: '3',
      name: 'DeFi Staking',
      type: 'Staking Protocol',
      status: 'generating',
      address: 'Pending...',
      volume: '-',
      users: 0,
      created: 'Just now'
    }
  ]);

  const handleSendMessage = () => {
    if (!botInput.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', message: botInput }]);
    setIsGenerating(true);

    setTimeout(() => {
      let response = '';
      const input = botInput.toLowerCase();

      if (input.includes('token') || input.includes('coin')) {
        response = 'Great! I\'ll help you create a token. Let me set that up:\n\n✓ Token name: Custom Token\n✓ Symbol: CSTM\n✓ Supply: 1,000,000,000\n✓ Bonding curve: Enabled\n✓ Anti-bot protection: Active\n\nYour token is being deployed to Solana mainnet...';
      } else if (input.includes('nft')) {
        response = 'Perfect! I\'ll create an NFT collection for you:\n\n✓ Collection size: 10,000\n✓ Metadata: On-chain\n✓ Royalties: 5%\n✓ Minting UI: Included\n\nDeploying your NFT smart contract...';
      } else if (input.includes('dapp') || input.includes('app')) {
        response = 'Awesome! I\'ll generate a custom dApp:\n\n✓ Smart contracts: Initialized\n✓ Frontend: React + Solana Web3.js\n✓ Wallet integration: Multiple providers\n✓ UI theme: Modern crypto\n\nBuilding your dApp now...';
      } else {
        response = 'I can help you with:\n\n🚀 Launch a memecoin with bonding curves\n🎨 Create NFT collections\n⚡ Build custom dApps\n💰 Set up staking protocols\n\nJust tell me what you\'d like to create!';
      }

      setChatHistory(prev => [...prev, { role: 'bot', message: response }]);
      setIsGenerating(false);
    }, 2000);

    setBotInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {username}</h1>
        <p className="text-white/60">Build and deploy Solana dApps with AI assistance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatBox
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
          label="Active dApps"
          value="3"
          change="+2 this week"
          positive
        />
        <StatBox
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          label="Total Volume"
          value="$213.7K"
          change="+18.2%"
          positive
        />
        <StatBox
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          label="Total Users"
          value="719"
          change="+124 today"
          positive
        />
        <StatBox
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="Revenue"
          value="4.2 SOL"
          change="+0.8 SOL"
          positive
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bot Interface */}
        <div className="lg:col-span-2">
          <div className="bg-dark border border-white/10 rounded-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <TabButton
                active={activeTab === 'create'}
                onClick={() => setActiveTab('create')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
              >
                Create with Bot
              </TabButton>
              <TabButton
                active={activeTab === 'apps'}
                onClick={() => setActiveTab('apps')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              >
                My dApps
              </TabButton>
              <TabButton
                active={activeTab === 'tokens'}
                onClick={() => setActiveTab('tokens')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                Tokens
              </TabButton>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {activeTab === 'create' && (
                <div>
                  {/* Chat History */}
                  <div className="h-96 overflow-y-auto mb-4 space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                      >
                        {msg.role === 'bot' && (
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        )}
                        <div
                          className={`max-w-md p-4 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-white/5 text-white/90'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-line">{msg.message}</div>
                        </div>
                      </div>
                    ))}
                    {isGenerating && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={botInput}
                      onChange={(e) => setBotInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a command... (e.g., 'Create a memecoin launchpad')"
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      disabled={isGenerating}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isGenerating || !botInput.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <QuickAction onClick={() => setBotInput('Create a memecoin with bonding curve')}>
                      🚀 Launch Memecoin
                    </QuickAction>
                    <QuickAction onClick={() => setBotInput('Build an NFT marketplace')}>
                      🎨 NFT Marketplace
                    </QuickAction>
                    <QuickAction onClick={() => setBotInput('Create a staking platform')}>
                      💰 Staking dApp
                    </QuickAction>
                    <QuickAction onClick={() => setBotInput('Deploy a token with liquidity pool')}>
                      ⚡ Token + DEX
                    </QuickAction>
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div className="space-y-4">
                  {dapps.map((dapp) => (
                    <DAppCard key={dapp.id} dapp={dapp} />
                  ))}
                </div>
              )}

              {activeTab === 'tokens' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No tokens yet</h3>
                  <p className="text-white/60 mb-6">Create your first token with the bot</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:opacity-90 transition-all"
                  >
                    Create Token
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="bg-dark border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Templates</h3>
            <div className="space-y-3">
              <TemplateCard
                icon="🚀"
                title="Memecoin Launchpad"
                description="With bonding curve & anti-bot"
              />
              <TemplateCard
                icon="🎨"
                title="NFT Collection"
                description="10K generative art + minting"
              />
              <TemplateCard
                icon="💎"
                title="DeFi Staking"
                description="Lock tokens, earn rewards"
              />
              <TemplateCard
                icon="🎮"
                title="GameFi Platform"
                description="Play-to-earn mechanics"
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-dark border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <ActivityItem
                icon="✓"
                text="MoonDoge deployed"
                time="2h ago"
                color="text-secondary"
              />
              <ActivityItem
                icon="↑"
                text="Volume +$12.4K"
                time="3h ago"
                color="text-primary"
              />
              <ActivityItem
                icon="👥"
                text="124 new users"
                time="5h ago"
                color="text-secondary"
              />
              <ActivityItem
                icon="🎨"
                text="NFT collection live"
                time="1d ago"
                color="text-primary"
              />
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-dark border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Network Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Solana Mainnet</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-secondary">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Gas Price</span>
                <span className="text-sm font-medium">0.000005 SOL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Block Height</span>
                <span className="text-sm font-medium">247,382,194</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, change, positive }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-dark border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-white/40 mb-2">{label}</div>
      <div className={`text-xs font-medium ${positive ? 'text-secondary' : 'text-red-400'}`}>
        {change}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
        active
          ? 'text-white border-b-2 border-primary'
          : 'text-white/40 hover:text-white/60'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function DAppCard({ dapp }: { dapp: DApp }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold mb-1">{dapp.name}</h4>
          <p className="text-sm text-white/60">{dapp.type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          dapp.status === 'deployed' ? 'bg-secondary/20 text-secondary' :
          dapp.status === 'generating' ? 'bg-primary/20 text-primary' :
          'bg-white/10 text-white/60'
        }`}>
          {dapp.status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div>
          <div className="text-xs text-white/40 mb-1">Address</div>
          <div className="text-sm font-mono">{dapp.address}</div>
        </div>
        <div>
          <div className="text-xs text-white/40 mb-1">Volume</div>
          <div className="text-sm font-semibold">{dapp.volume}</div>
        </div>
        <div>
          <div className="text-xs text-white/40 mb-1">Users</div>
          <div className="text-sm font-semibold">{dapp.users}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-white/40">{dapp.created}</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs font-medium transition-colors">
            View
          </button>
          <button className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded text-xs font-medium transition-colors">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-left">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium mb-0.5">{title}</div>
          <div className="text-xs text-white/40 truncate">{description}</div>
        </div>
      </div>
    </button>
  );
}

function ActivityItem({ icon, text, time, color }: {
  icon: string;
  text: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm">{text}</div>
        <div className="text-xs text-white/40">{time}</div>
      </div>
    </div>
  );
}

function QuickAction({ onClick, children }: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}