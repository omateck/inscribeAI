import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div id="contact" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Contact</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in touch with us
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions? We're here to help. Reach out to our team through any of these channels.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl">
            <Mail className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-6 text-base font-semibold text-gray-900">Email</h3>
            <p className="mt-2 text-gray-600">support@inscribeai.com</p>
          </div>
          
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl">
            <Phone className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-6 text-base font-semibold text-gray-900">Phone</h3>
            <p className="mt-2 text-gray-600">1-800-INSCRIBE</p>
          </div>
          
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl">
            <MapPin className="h-10 w-10 text-indigo-600" />
            <h3 className="mt-6 text-base font-semibold text-gray-900">Office</h3>
            <p className="mt-2 text-gray-600">San Francisco, CA</p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-x-6">
          <a
            href="https://twitter.com/inscribeai"
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter <span aria-hidden="true">→</span>
          </a>
          <a
            href="https://linkedin.com/company/inscribeai"
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">→</span>
          </a>
          <a
            href="https://instagram.com/inscribeai"
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;