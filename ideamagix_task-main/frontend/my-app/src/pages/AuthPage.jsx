import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiUpload, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('instructor-login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    expertise: '',
    profilePicture: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const role = activeTab === 'admin-login' ? 'admin' : 'instructor';

      const userData = await login(loginData.email, loginData.password, role);

      toast.success(`Welcome back, ${userData.name}! 🎉`);

      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/instructor');
        }
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error || 'Login failed');
      setLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', signupData.name);
      formData.append('email', signupData.email);
      formData.append('password', signupData.password);
      formData.append('phone', signupData.phone);
      formData.append('expertise', signupData.expertise);

      if (signupData.profilePicture) {
        formData.append('profilePicture', signupData.profilePicture);
      }

      await signup(formData);
      toast.success('Account created successfully! 🎉');

      setTimeout(() => {
        navigate('/instructor');
      }, 1500);
    } catch (error) {
      toast.error(error || 'Signup failed');
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, and GIF files are allowed');
        return;
      }

      setSignupData({ ...signupData, profilePicture: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
            Scheduler
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Lecture Management System
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border-2 shadow-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          
          {/* Dynamic Title */}
          <div className="p-6 md:p-8 border-b-2 text-center" style={{ borderColor: '#E5E0E0' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
              {activeTab === 'instructor-login' && 'Instructor Login'}
              {activeTab === 'instructor-signup' && 'Create Account'}
              {activeTab === 'admin-login' && 'Admin Portal'}
            </h2>
            <p className="text-sm text-gray-600">
              {activeTab === 'instructor-login' && 'Welcome back! Please enter your details.'}
              {activeTab === 'instructor-signup' && 'Sign up to become an instructor.'}
              {activeTab === 'admin-login' && 'Restricted access for administrators.'}
            </p>
          </div>

          {/* Forms Container */}
          <div className="p-6 md:p-8">
            
            {/* Instructor Login */}
            {activeTab === 'instructor-login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="instructor@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

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
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                {/* Demo Credentials */}
                <div className="p-4 rounded-lg border-2 mt-4" style={{ backgroundColor: '#D1FAE5', borderColor: '#6EE7B7' }}>
                  <p className="text-xs font-bold mb-2" style={{ color: '#059669' }}>
                    🔐 Demo Credentials:
                  </p>
                  <div className="text-xs space-y-1" style={{ color: '#047857' }}>
                    <p><strong>Email:</strong> instructor@example.com</p>
                    <p><strong>Password:</strong> instructor123</p>
                  </div>
                </div>
              </form>
            )}

            {/* Instructor Signup */}
            {activeTab === 'instructor-signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="John Doe"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="john@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Password *
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                        style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Confirm *
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                        style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                        style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                        placeholder="+1 234 5678"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Expertise (Optional)
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                        style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                        placeholder="React, Node.js..."
                        value={signupData.expertise}
                        onChange={(e) => setSignupData({ ...signupData, expertise: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                        onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4 p-4 border-2 rounded-lg" style={{ backgroundColor: '#FAFAF9', borderColor: '#E5E0E0' }}>
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Preview"
                        className="h-12 w-12 rounded-full object-cover shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F3F0F0' }}>
                        <FiUser size={24} style={{ color: '#3B2F2F' }} />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all" style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}>
                        <FiUpload size={16} />
                        Upload Photo
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/jpg,image/png,image/gif"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Max 10MB (JPG, PNG)</p>
                    </div>
                  </div>
                </div>

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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Admin Login */}
            {activeTab === 'admin-login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Admin Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="admin@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

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
                  {loading ? 'Verifying...' : 'Access Admin Panel'}
                </button>

                {/* Demo Credentials */}
                <div className="p-4 rounded-lg border-2 mt-4" style={{ backgroundColor: '#FEE2E2', borderColor: '#FECACA' }}>
                  <p className="text-xs font-bold mb-2" style={{ color: '#DC2626' }}>
                    🔐 Demo Admin Access:
                  </p>
                  <div className="text-xs space-y-1" style={{ color: '#991B1B' }}>
                    <p><strong>Email:</strong> admin@example.com</p>
                    <p><strong>Password:</strong> admin123</p>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-6 md:p-8 border-t-2" style={{ borderColor: '#E5E0E0' }}>
            {activeTab === 'instructor-login' && (
              <div className="space-y-3 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setActiveTab('instructor-signup');
                      setLoginData({ email: '', password: '' });
                    }}
                    className="font-bold transition-colors"
                    style={{ color: '#3B2F2F' }}
                    onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.target.style.opacity = '1')}
                  >
                    Sign up for free
                  </button>
                </p>
                <button
                  onClick={() => {
                    setActiveTab('admin-login');
                    setLoginData({ email: '', password: '' });
                  }}
                  className="text-xs font-semibold flex items-center justify-center gap-2 mx-auto transition-colors"
                  style={{ color: '#888888' }}
                  onMouseEnter={(e) => (e.target.style.color = '#3B2F2F')}
                  onMouseLeave={(e) => (e.target.style.color = '#888888')}
                >
                  Admin Access <FiArrowRight size={14} />
                </button>
              </div>
            )}

            {activeTab === 'instructor-signup' && (
              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setActiveTab('instructor-login');
                    setSignupData({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                      phone: '',
                      expertise: '',
                      profilePicture: null,
                    });
                    setProfilePreview(null);
                  }}
                  className="font-bold transition-colors"
                  style={{ color: '#3B2F2F' }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  Sign in
                </button>
              </p>
            )}

            {activeTab === 'admin-login' && (
              <button
                onClick={() => {
                  setActiveTab('instructor-login');
                  setLoginData({ email: '', password: '' });
                }}
                className="w-full text-sm font-bold transition-colors"
                style={{ color: '#3B2F2F' }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                ← Back to Instructor Login
              </button>
            )}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Scheduler. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
