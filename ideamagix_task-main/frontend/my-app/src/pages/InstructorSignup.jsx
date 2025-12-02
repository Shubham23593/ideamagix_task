import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUsers, FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiArrowLeft, FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';

const InstructorSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    expertise: '',
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, and GIF files are allowed');
        return;
      }

      setFormData({ ...formData, profilePicture: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('phone', formData.phone);
      submitData.append('expertise', formData.expertise);
      
      if (formData.profilePicture) {
        submitData.append('profilePicture', formData.profilePicture);
      }

      await signup(submitData);
      toast.success('Account created successfully! 🎉');
      
      setTimeout(() => {
        navigate('/instructor');
      }, 1500);
    } catch (error) {
      toast.error(error || 'Signup failed');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg w-fit transition-all hover:shadow-md"
          style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
        >
          <FiArrowLeft size={18} />
          <span className="font-semibold text-sm">Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="rounded-xl border-2 shadow-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          
          {/* Header */}
          <div className="p-6 md:p-8 border-b-2 text-center" style={{ borderColor: '#E5E0E0' }}>
            <div className="flex justify-center mb-4">
              <div
                className="p-4 rounded-full shadow-lg"
                style={{ backgroundColor: '#3B2F2F' }}
              >
                <FiUsers className="text-white text-4xl" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
              Create Account
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Sign up to become an instructor
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                    style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                    style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                  />
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={handleInputChange}
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone & Expertise Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="expertise" className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                    Expertise (Optional)
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                      id="expertise"
                      name="expertise"
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      placeholder="React, Node.js..."
                      value={formData.expertise}
                      onChange={handleInputChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  Profile Picture (Optional)
                </label>
                <div className="flex items-center gap-4 p-4 border-2 rounded-lg" style={{ backgroundColor: '#FAFAF9', borderColor: '#E5E0E0' }}>
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="h-20 w-20 rounded-full object-cover shadow-sm flex-shrink-0"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F3F0F0' }}>
                      <FiUser size={28} style={{ color: '#3B2F2F' }} />
                    </div>
                  )}
                  
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
                </div>
                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>

              {/* Submit Button */}
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

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/instructor-login"
                  className="font-bold transition-colors"
                  style={{ color: '#3B2F2F' }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSignup;
