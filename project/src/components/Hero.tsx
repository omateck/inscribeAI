import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Star, Clock, Brain } from 'lucide-react';

export default function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    { text: 'Generate content in seconds', icon: Zap },
    { text: 'Powered by advanced AI', icon: Brain },
    { text: 'Save hours of work', icon: Clock },
    { text: 'Premium quality output', icon: Star },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Animated background gradient */}
      <div className="absolute inset-x-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 opacity-30 animate-gradient"></div>
        <div className="absolute -inset-x-1/2 top-0 h-[40rem] w-[200%] bg-gradient-to-br from-transparent via-indigo-50 to-transparent blur-3xl transform rotate-12 animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 relative">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {/* Badge */}
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="group inline-flex items-center space-x-6 text-sm">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/20 group-hover:bg-indigo-600/20 transition-colors duration-300">
                <span className="flex items-center gap-x-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Latest updates</span>
                </span>
              </span>
              <span className="inline-flex items-center space-x-2 font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          </div>

          {/* Main heading with animated gradient text */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
                Test Automatic Deployment
              </h1>
            </div>
          </div>

          {/* Animated feature list */}
          <div className="mt-6 h-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-lg leading-8 text-gray-600 absolute transition-all duration-500 ${
                  currentFeature === index
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-4'
                }`}
              >
                <feature.icon className="h-5 w-5 text-indigo-600" />
                {feature.text}
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="mt-16 text-lg leading-8 text-gray-600">
            Transform your ideas into compelling content with our AI-powered platform. Create, optimize, and publish content that resonates with your audience.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/signup"
              className="group relative rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get started free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/signin"
              className="group text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
            >
              Learn more
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="relative max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
            
            {/* Main image with hover effect */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                alt="App screenshot"
                width="2432"
                height="1442"
                className="w-[76rem] rounded-xl bg-white/5 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 group-hover:ring-black/20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}