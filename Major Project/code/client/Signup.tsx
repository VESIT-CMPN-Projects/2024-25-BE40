import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { signup, doctorSignup } from '../api/auth';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDoctor = searchParams.get('type') === 'doctor';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    doctorId: '',
    degree: '',
    speciality: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      if (isDoctor) {
        // Call doctorSignup for doctors
        await doctorSignup(
          formData.name,
          formData.email,
          formData.doctorId,
          formData.degree,
          formData.speciality,
          formData.password
        );
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      navigate('/login')
    } catch (err) {
      setError('Failed to create account');
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
    <AuthLayout title={isDoctor ? "Join as a Healthcare Professional" : "Create your account"}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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

          {isDoctor && (
            <>
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                  Universal Doctor ID
                </label>
                <input
                  id="doctorId"
                  name="doctorId"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Enter your medical license number"
                  value={formData.doctorId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                  Medical Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="MD, MBBS, etc."
                  value={formData.degree}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                  Speciality
                </label>
                <input
                  id="speciality"
                  name="speciality"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Psychiatry, Psychology, etc."
                  value={formData.speciality}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="••••••••"
              value={formData.confirmPassword}
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
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link 
            to="/login" 
            className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};