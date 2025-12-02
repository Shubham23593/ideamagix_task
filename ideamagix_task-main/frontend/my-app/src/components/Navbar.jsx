import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiBook, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  // ✅ Update currentUser whenever user context changes
  useEffect(() => {
    setCurrentUser(user);
    console.log('🔄 Navbar: User updated', user);
  }, [user]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="shadow-md sticky top-0 z-50"
      style={{ backgroundColor: '#FFFFFF', borderBottom: '2px solid #E5E0E0' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <Link
            to={isAdmin ? '/admin' : '/instructor'}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: '#F3F0F0' }}
            >
              <FiBook
                className="text-2xl sm:text-3xl"
                style={{ color: '#3B2F2F' }}
              />
            </div>
            <span
              className="text-lg sm:text-xl md:text-2xl font-bold hidden sm:inline truncate"
              style={{ color: '#3B2F2F' }}
            >
              Lecture Scheduler
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg" style={{ backgroundColor: '#F3F0F0' }}>
              {currentUser?.profilePicture ?  (
                <img
                  key={`desktop-${currentUser.profilePicture}`}
                  src={currentUser.profilePicture}
                  alt={currentUser. name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    console.error('❌ Failed to load profile image:', currentUser.profilePicture);
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: '#3B2F2F' }}
                >
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#3B2F2F' }}
                >
                  {currentUser?. name}
                </p>
                <p
                  className="text-xs uppercase tracking-wide font-bold"
                  style={{ color: '#888888' }}
                >
                  {currentUser?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:shadow-md"
              style={{ backgroundColor: '#3B2F2F' }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              <FiLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(! mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-all"
            style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t py-3 space-y-3"
            style={{ borderColor: '#E5E0E0' }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ backgroundColor: '#F3F0F0' }}
            >
              {currentUser?.profilePicture ? (
                <img
                  key={`mobile-${currentUser.profilePicture}`}
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    console.error('❌ Failed to load mobile profile image');
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#3B2F2F' }}
                >
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#3B2F2F' }}
                >
                  {currentUser?.name}
                </p>
                <p
                  className="text-xs uppercase tracking-wide font-bold"
                  style={{ color: '#888888' }}
                >
                  {currentUser?. role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: '#3B2F2F' }}
              onTouchStart={(e) => (e.target.style.opacity = '0.9')}
              onTouchEnd={(e) => (e.target.style.opacity = '1')}
            >
              <FiLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;