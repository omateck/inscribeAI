import React, { useState } from 'react';
import { CreditCard, Check, Zap, Star, Shield } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 0,
    features: [
      '5,000 words per month',
      'Basic AI features',
      'Standard support',
      '1 team member',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    features: [
      '50,000 words per month',
      'Advanced AI features',
      'Priority support',
      'Up to 5 team members',
      'Custom templates',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Unlimited words',
      'All AI features',
      '24/7 support',
      'Unlimited team members',
      'Custom templates',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const billingHistory = [
  {
    id: 1,
    date: '2024-01-01',
    amount: 29.00,
    status: 'Paid',
    invoice: 'INV-2024-001',
  },
  {
    id: 2,
    date: '2023-12-01',
    amount: 29.00,
    status: 'Paid',
    invoice: 'INV-2023-012',
  },
];

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Billing & Plans</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
            <p className="mt-1 text-sm text-gray-500">
              You are currently on the <span className="font-medium">Pro</span> plan
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Next billing date</span>
            <span className="font-medium">February 1, 2024</span>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.popular
                  ? 'border-2 border-indigo-500'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <button
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    setShowPaymentModal(true);
                  }}
                  className={`mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                    plan.popular
                      ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                      : 'text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600'
                  }`}
                >
                  {selectedPlan === plan.name ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Current Plan
                    </>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm text-gray-500"
                    >
                      <Check className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
        <div className="mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <CreditCard className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                •••• •••• •••• 4242
              </p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
            <button className="ml-auto text-sm text-indigo-600 hover:text-indigo-500">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {billingHistory.map((item) => (
            <div
              key={item.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{item.invoice}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-900">${item.amount}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {item.status}
                </span>
                <button className="text-sm text-indigo-600 hover:text-indigo-500">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowPaymentModal(false)}
            />

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Update Payment Method
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your payment details to upgrade to the {selectedPlan} plan
                    </p>
                  </div>
                </div>
              </div>

              <form className="mt-5 sm:mt-4">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      name="card-number"
                      id="card-number"
                      placeholder="1234 1234 1234 1234"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiry"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiry date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        placeholder="123"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                  >
                    Update Payment Method
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
