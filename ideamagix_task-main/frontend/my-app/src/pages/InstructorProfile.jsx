import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload, FiUser, FiSave } from 'react-icons/fi';

const InstructorProfile = () => {
  const { user, updateUser } = useAuth(); // ✅ Get updateUser from context
  const [profilePreview, setProfilePreview] = useState(user?.profilePicture || null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    expertise: user?.expertise || '',
    profilePicture: user?.profilePicture || '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
  e. preventDefault();
  setSaving(true);

  try {
    console.log('📤 Sending profile update:', formData);
    
    const { data } = await api.put(`/instructors/${user._id}`, formData);
    
    console.log('✅ Profile update response:', data);
    
    // ✅ Update user in context
    updateUser(data);
    
    console.log('🔄 Context updated, new user should be:', data);

    toast.success('Profile updated successfully!  ✓');
  } catch (error) {
    console.error('❌ Profile update error:', error);
    toast.error(error. response?.data?.message || 'Failed to update profile');
  } finally {
    setSaving(false);
  }
};


  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
                My Profile
              </h2>
              <p className="text-gray-600">Update your personal information and profile picture</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-bold mb-4" style={{ color: '#3B2F2F' }}>
                    Profile Picture
                  </label>
                  <div
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all hover:border-opacity-70"
                    style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
                    onClick={() => document.getElementById('profile-input').click()}
                  >
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-md"
                      />
                    ) : (
                      <div
                        className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: '#3B2F2F' }}
                      >
                        <FiUser className="text-white text-5xl" />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all cursor-pointer hover:shadow-md"
                      style={{ backgroundColor: '#3B2F2F' }}
                    >
                      <FiUpload className="text-lg" />
                      Click to upload
                      <input
                        id="profile-input"
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
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled
                      className="w-full px-4 py-3 border-2 rounded-lg bg-gray-100 cursor-not-allowed"
                      style={{ borderColor: '#E5E0E0', color: '#666666' }}
                      value={formData.email}
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 890"
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e. target.style.borderColor = '#E5E0E0')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                      Expertise / Bio
                    </label>
                    <textarea
                      name="expertise"
                      rows={4}
                      placeholder="Tell us about your expertise..."
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none"
                      style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                      value={formData.expertise}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                      onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t-2 pt-6" style={{ borderColor: '#E5E0E0' }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#3B2F2F' }}
                >
                  <FiSave size={18} />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorProfile;