import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUserCheck, FiMail, FiLock, FiArrowLeft, FiEye, FiEyeSlash } from 'react-icons/fi';

const AdminLogin = () => {
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
      await login(email, password, 'admin');
      toast.success('Admin login successful! 🎉');
      
      setTimeout(() => {
        navigate('/admin');
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

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#3B2F2F' }}
            >
              <FiUserCheck className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
            Admin Portal
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className="rounded-xl border-2 shadow-md overflow-hidden p-6 md:p-8"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2"
                style={{ color: '#3B2F2F' }}
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
                style={{ color: '#3B2F2F' }}
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeSlash size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-bold text-white"
              style={{ backgroundColor: loading ? '#999999' : '#3B2F2F' }}
            >
              {loading ? 'Signing in...' : 'Login to Admin Panel'}
            </button>
          </form>

          {/* OR Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E0E0' }}></div>
            <span className="text-xs text-gray-500">OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E0E0' }}></div>
          </div>

          {/* Switch Role */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not an admin?{' '}
              <Link
                to="/instructor-login"
                className="font-bold"
                style={{ color: '#3B2F2F' }}
              >
                Login as Instructor
              </Link>
            </p>
          </div>
          
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          🔒 Your credentials are secure and encrypted
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;
