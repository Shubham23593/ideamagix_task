import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload, FiUser } from 'react-icons/fi';

const InstructorProfile = () => {
  const { user } = useAuth();
  const [profilePreview, setProfilePreview] = useState(user?.profilePicture || null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    expertise: user?.expertise || '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.info('Profile picture upload feature coming soon!');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.info('Profile update feature coming soon!');
  };

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="rounded-xl border-2 shadow-md bg-white border-gray-200 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h2>
            <p className="text-gray-600">Update your personal information and profile picture.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Profile Picture</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#3B2F2F] transition-colors">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4">
                      <FiUser className="text-gray-400 text-5xl" />
                    </div>
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B2F2F] text-white font-semibold hover:bg-[#2a231f] transition-colors cursor-pointer">
                    <FiUpload className="text-lg" />
                    Click to upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-3 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B2F2F] text-gray-800"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B2F2F] text-gray-800"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B2F2F] text-gray-800"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us a little about yourself..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B2F2F] text-gray-800 resize-none"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#3B2F2F] text-white rounded-lg font-semibold hover:bg-[#2a231f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorProfile;
