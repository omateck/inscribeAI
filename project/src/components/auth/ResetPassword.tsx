import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { KeyRound, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      {success ? (
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-green-700">
            Password reset instructions have been sent to your email.
          </p>
          <Link
            to="/signin"
            className="mt-4 block text-center text-indigo-600 hover:text-indigo-500"
          >
            Return to sign in
          </Link>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center p-4 text-red-700 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Remember your password? Sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}