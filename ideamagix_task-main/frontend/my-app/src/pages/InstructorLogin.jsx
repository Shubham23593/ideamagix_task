import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUsers, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

const InstructorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login(email, password, 'instructor'); // Pass role for validation
      
      toast.success('Welcome back! ');
      
      setTimeout(() => {
        navigate('/instructor');
      }, 1000);
    } catch (error) {
      toast.error(error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-md w-full space-y-8">
        <Link
          to="/"
          className="flex items-center text-green-700 hover:text-green-900 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to home
        </Link>

        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full">
              <FiUsers className="text-white text-4xl" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Instructor Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your details. 
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="input pl-10"
                  placeholder="john@ideamagix.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="input pl-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 py-3 text-lg font-semibold disabled:opacity-50"
            >
              {loading ?  'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Don't have an account? {' '}
              <Link to="/instructor-signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link to="/admin-login" className="font-medium text-blue-600 hover:text-blue-500">
                Login as Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;