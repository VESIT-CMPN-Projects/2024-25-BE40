import { User, MessageSquare, Users, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 h-full w-[280px] bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Main sidebar content */}
        <div className="flex-1 py-20 px-4">
          <div className="flex flex-col space-y-2">
            {user?.type === 'DOCTOR' && (
              <button
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
                className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                  isActive('/profile')
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-sm font-medium">Profile</span>
              </button>
            )}

            {user?.type === 'PATIENT' && (
              <>
                <button
                  onClick={() => {
                    navigate('/chat');
                    onClose();
                  }}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                    isActive('/chat')
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm font-medium">Chat</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/profile');
                    onClose();
                  }}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                    isActive('/profile')
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-sm font-medium">Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/doctors');
                    onClose();
                  }}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                    isActive('/doctors')
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm font-medium">Doctors</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Emergency Call Link at Bottom (only for PATIENT users) */}
        {user?.type === 'PATIENT' && (
          <div className="px-4 pb-8 mt-auto">
            <a
              href="tel:911"
              className="w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100"
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Emergency</span>
            </a>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default Sidebar;