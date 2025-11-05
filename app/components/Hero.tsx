'use client';

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">AI-Powered dApp Generation</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Build Solana dApps
          <br />
          <span className="gradient-text">in Seconds</span>
        </h1>

        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          Create custom decentralized applications, launch memecoins, and deploy to Solana blockchain with simple bot commands. No coding required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 animate-glow"
          >
            Get Started Free
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
            View Demo
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
            title="Bot Commands"
            description="Generate complete dApps using natural language commands through our intelligent bot interface"
          />
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Instant Deploy"
            description="Deploy your dApp to Solana mainnet in seconds with automatic optimization and security checks"
          />
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Token Launchpad"
            description="Create and launch tokens with built-in bonding curves and liquidity management systems"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10">
          <StatCard value="1,247" label="dApps Generated" />
          <StatCard value="$2.4M" label="Total Volume" />
          <StatCard value="8,432" label="Active Users" />
          <StatCard value="99.9%" label="Uptime" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm group">
      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <div className="text-primary group-hover:text-secondary transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-sm text-white/40">{label}</div>
    </div>
  );
}