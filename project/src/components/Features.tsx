import React from 'react';
import {
  Brain,
  Search,
  Users,
  Globe,
  Zap,
  Shield,
  BarChart3,
  Cog,
} from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Content',
    description: 'Create high-quality content in seconds using advanced AI technology.',
    icon: Brain,
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'SEO Optimization',
    description: 'Automatically optimize your content for search engines with smart suggestions.',
    icon: Search,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Team Collaboration',
    description: 'Work together seamlessly with real-time collaboration features.',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Global Reach',
    description: 'Create content in multiple languages to reach audiences worldwide.',
    icon: Globe,
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    name: 'Lightning Fast',
    description: 'Generate content in seconds, not hours. Save time and boost productivity.',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Enterprise Security',
    description: 'Your content is protected with enterprise-grade security measures.',
    icon: Shield,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    name: 'Analytics',
    description: 'Track performance and optimize your content strategy with insights.',
    icon: BarChart3,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Automation',
    description: 'Streamline your content workflow with powerful automation tools.',
    icon: Cog,
    gradient: 'from-cyan-500 to-blue-500',
  },
];

export default function Features() {
  return (
    <div className="relative py-24 sm:py-32 bg-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-800 to-indigo-900 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-base font-semibold leading-7 text-indigo-400">Everything you need</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Powerful features for powerful content
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Create, optimize, and manage your content with our comprehensive suite of tools.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group overflow-hidden rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm ring-1 ring-gray-700/50 hover:ring-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></div>
              
              {/* Icon with gradient background */}
              <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-lg font-semibold leading-7 text-white group-hover:text-indigo-400 transition-colors duration-300">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom gradient effect */}
        <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-800 to-indigo-900 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
  );
}