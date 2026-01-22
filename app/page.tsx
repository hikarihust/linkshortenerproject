import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link2, BarChart3, Lock, Zap, Globe, Shield } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Shorten Links, Amplify Your Reach
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Create powerful short links in seconds. Track engagement, manage your URLs, and share with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Everything You Need to Manage Your Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Link2 className="h-8 w-8" />}
              title="Custom Short Links"
              description="Create memorable, branded short URLs that are easy to share and remember."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Analytics & Insights"
              description="Track clicks, geographic data, and engagement metrics for all your links."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Built on modern infrastructure for instant redirects and zero downtime."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="Secure & Private"
              description="Your data is protected with enterprise-grade security and encryption."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Global CDN"
              description="Fast link resolution worldwide with our distributed network infrastructure."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Reliable Service"
              description="99.9% uptime guarantee ensures your links are always accessible."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-zinc-900 rounded-2xl p-12 border border-zinc-800">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of users who trust us with their links. Create your account in seconds.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg px-8">
              Create Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}
