import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    features: [
      '1,000 words per month',
      'Basic AI writing features',
      'Limited SEO tools',
      'Limited templates'
    ]
  },
  {
    name: 'Basic',
    price: '9.99',
    features: [
      '5,000 words per month',
      'Full AI writing features',
      'Basic SEO features',
      'Limited templates',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    popular: true,
    price: '29.99',
    features: [
      '20,000 words per month',
      'Advanced SEO features',
      'Premium templates',
      'Team collaboration',
      'Priority support',
      'Analytics dashboard'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited words',
      'Custom integrations',
      'Dedicated manager',
      'Custom API access',
      '24/7 phone support',
      'SLA guarantee'
    ]
  }
];

const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 ring-1 ${
                plan.popular
                  ? 'bg-white/5 ring-indigo-500'
                  : 'bg-white/5 ring-white/10'
              }`}
            >
              <h3 className="text-lg font-semibold leading-8 text-white">
                {plan.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ${plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-sm font-semibold leading-6 text-gray-300">
                    /month
                  </span>
                )}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;