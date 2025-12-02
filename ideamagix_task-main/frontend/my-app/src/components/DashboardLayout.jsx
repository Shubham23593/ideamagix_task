import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBars } from 'react-icons/fa'; // Fixed: FaBars instead of FaMenu
import { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = () => {
    const path = window.location.pathname.split('/').pop();
    return path
      .replace(/-/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase()) || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Sidebar - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Header */}
        <header
          className="border-b shadow-sm px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-30"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}
        >
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg transition-all"
              style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
            >
              <FaBars size={20} />
            </button>

            {/* Page Title - Responsive */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold truncate"
              style={{ color: '#3B2F2F' }}
            >
              {getPageTitle()}
            </h2>

            {/* User Info - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 ml-auto">
              {/* User Text - Hidden on small screens */}
              <div className="text-right hidden sm:block">
                <p
                  className="text-xs sm:text-sm font-semibold truncate max-w-[120px]"
                  style={{ color: '#3B2F2F' }}
                >
                  {user?.name}
                </p>
                <p className="text-xs" style={{ color: '#888888' }}>
                  {user?.role === 'admin' ? 'Admin' : 'Instructor'}
                </p>
              </div>

              {/* Avatar - Responsive size */}
              <div
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shadow-md flex-shrink-0"
                style={{ backgroundColor: '#3B2F2F' }}
              >
                {user?.name?.charAt(0).toUpperCase() || <FaUser size={16} />}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Responsive Padding */}
        <main
          className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
