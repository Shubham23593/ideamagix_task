import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUsers, FiMail, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

const InstructorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const userData = await login(email, password, 'instructor');
      toast.success(`Welcome back, ${userData.name}! 🎉`);
      
      setTimeout(() => {
        navigate('/instructor');
      }, 1000);
    } catch (error) {
      toast.error(error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg w-fit transition-all hover:shadow-md"
          style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
        >
          <FiArrowLeft size={18} />
          <span className="font-semibold text-sm">Back to Home</span>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#3B2F2F' }}
            >
              <FiUsers className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
            Instructor Login
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-xl border-2 shadow-md overflow-hidden p-6 md:p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2"
                style={{ color: '#3B2F2F' }}
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                  style={{
                    borderColor: '#E5E0E0',
                    color: '#3B2F2F',
                  }}
                  placeholder="instructor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
                style={{ color: '#3B2F2F' }}
              >
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                  style={{
                    borderColor: '#E5E0E0',
                    color: '#3B2F2F',
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              style={{ backgroundColor: loading ? '#999999' : '#3B2F2F' }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.opacity = '1';
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    ircle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t-2" style={{ borderColor: '#E5E0E0' }}>
            <p className="text-xs font-bold text-gray-600 mb-3" style={{ color: '#3B2F2F' }}>
              🔐 Demo Credentials:
            </p>
            <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#FAFAF9' }}>
              <div className="text-xs">
                <span className="font-bold text-gray-700">Email:</span>
                de
                  className="ml-2 px-2 py-1 rounded text-xs font-mono"
                  style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
                >
                  instructor@example.com
                </code>
              </div>
              <div className="text-xs">
                <span className="font-bold text-gray-700">Password:</span>
                de
                  className="ml-2 px-2 py-1 rounded text-xs font-mono"
                  style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
                >
                  instructor123
                </code>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/instructor-signup"
                className="font-bold transition-colors"
                style={{ color: '#3B2F2F' }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link
                to="/admin-login"
                className="font-bold transition-colors"
                style={{ color: '#888888' }}
                onMouseEnter={(e) => (e.target.style.color = '#3B2F2F')}
                onMouseLeave={(e) => (e.target.style.color = '#888888')}
              >
                Login as Admin →
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          🔒 Your credentials are secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default InstructorLogin;
