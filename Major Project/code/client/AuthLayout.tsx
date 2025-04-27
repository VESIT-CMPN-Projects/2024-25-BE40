import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <Link to="/" className="flex items-center">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-lg font-bold text-gray-900">Well Mind</span>
        </Link>
      </nav>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center">
              <Brain className="mx-auto h-10 w-10 text-purple-600" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};