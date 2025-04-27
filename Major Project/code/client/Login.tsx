import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { login, uploadDoctorLocation } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      setUser(user);
      setIsAuthenticated(!!user.email);

      if (user.type === "DOCTOR") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await uploadDoctorLocation(latitude, longitude);
          }, (err) => {
            console.error("Failed to get location:", err);
          });
        }
      }
      if (user.type === "PATIENT") {
        navigate('/chat');
      } else navigate('/profile');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AuthLayout title="Welcome back">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};