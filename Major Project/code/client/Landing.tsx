import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, MessageCircle, Shield, Heart } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-600" />
            <span className="ml-2 text-lg font-bold text-gray-900">Well Mind</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-sm text-gray-700 hover:text-purple-600">Login</Link>
            <Link to="/signup" className="text-sm px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Compassionate AI
            <span className="text-purple-600"> Mental Health</span> Companion
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            24/7 support, personalized conversations, and a safe space for your mental well-being.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              to="/signup"
              className="w-full inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Get Started
            </Link>
            <Link
              to="/signup?type=doctor"
              className="w-full inline-block px-6 py-3 border-2 border-purple-600 text-base font-medium rounded-md text-purple-600 hover:bg-purple-50"
            >
              Join as a Healthcare Professional
            </Link>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-purple-600 rounded-md">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Always available to listen and support you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-purple-600 rounded-md">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Private & Secure</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your conversations are completely private.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-purple-600 rounded-md">
                  <Heart className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Personalized Care</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tailored conversations for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};