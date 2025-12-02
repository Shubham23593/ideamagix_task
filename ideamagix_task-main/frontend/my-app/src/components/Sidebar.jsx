import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiGrid, 
  FiBook, 
  FiUsers, 
  FiCalendar, 
  FiPlusCircle, 
  FiList,
  FiUser,
  FiLogOut,
  FiX
} from 'react-icons/fi';
import { useState } from 'react';

const Sidebar = ({ isOpen = true, onClose = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      onClose();
      navigate('/');
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  const adminLinks = [
    { path: '/admin', icon: FiGrid, label: 'Dashboard' },
    { path: '/admin/courses', icon: FiBook, label: 'Manage Courses' },
    { path: '/admin/courses/add', icon: FiPlusCircle, label: 'Add Course' },
    { path: '/admin/instructors', icon: FiUsers, label: 'All Instructors' },
    { path: '/admin/lectures', icon: FiCalendar, label: 'Assign Lecture' },
    { path: '/admin/all-lectures', icon: FiList, label: 'All Lectures' },
  ];

  const instructorLinks = [
    { path: '/instructor', icon: FiGrid, label: 'Dashboard' },
    { path: '/instructor/lectures', icon: FiList, label: 'My Lectures' },
    { path: '/instructor/profile', icon: FiUser, label: 'Profile' },
  ];

  const links = isAdmin ? adminLinks : instructorLinks;

  return (
    <div
      className="w-64 min-h-screen flex flex-col border-r-2 shadow-lg transition-all duration-300"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}
    >
      {/* Logo Section */}
      <div
        className="p-4 sm:p-6 border-b-2 flex items-center justify-between"
        style={{ borderColor: '#E5E0E0' }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#3B2F2F' }}>
          Scheduler
        </h1>
        {/* Close button for mobile (when sidebar is overlay) */}
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-lg transition-all"
          style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleNavClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
              style={{
                backgroundColor: active ? '#F3F0F0' : 'transparent',
                color: active ? '#3B2F2F' : '#666666',
                borderLeft: active ? '4px solid #3B2F2F' : '4px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = '#F9F9F9';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="text-lg sm:text-xl flex-shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info Section */}
      <div
        className="p-3 sm:p-4 border-t-2 space-y-3"
        style={{ borderColor: '#E5E0E0' }}
      >
        {/* User Profile Card */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ backgroundColor: '#F3F0F0' }}
        >
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0"
            style={{ backgroundColor: '#3B2F2F' }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs sm:text-sm font-bold truncate"
              style={{ color: '#3B2F2F' }}
            >
              {user?.name}
            </p>
            <p
              className="text-xs uppercase font-semibold truncate tracking-wide"
              style={{ color: '#888888' }}
            >
              {user?.role}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-sm sm:text-base transition-all hover:shadow-md"
          style={{ backgroundColor: '#3B2F2F' }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
