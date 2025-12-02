import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload, FiArrowLeft, FiCheck } from 'react-icons/fi';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#E5E0E0';
    e.currentTarget.style.backgroundColor = '#FAFAF9';

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader. onloadend = () => {
        setImagePreview(reader. result);
        setFormData({ ...formData, image: reader. result });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please drop an image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name. trim()) {
      toast.error('Course name is required');
      return;
    }

    if (!formData.description.trim()) {
      toast. error('Course description is required');
      return;
    }

    setLoading(true);

    try {
      await api.post('/courses', formData);
      toast.success('Course added successfully!  🎉');
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add course');
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/courses')}
          className="p-2 rounded-lg transition-all hover:shadow-md"
          style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#3B2F2F' }}>
            Add New Course
          </h1>
          <p className="text-gray-600 text-sm mt-1">Create a new course for your instructors</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6">
            
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Course Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                placeholder="e.g., Advanced React Patterns"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target. style.borderColor = '#E5E0E0')}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Difficulty Level *
              </label>
              <select
                name="level"
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F', backgroundColor: '#FFFFFF' }}
                value={formData.level}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
              >
                <option value="Beginner">Beginner - New to this topic</option>
                <option value="Intermediate">Intermediate - Some experience</option>
                <option value="Advanced">Advanced - Expert level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Course Description *
              </label>
              <textarea
                name="description"
                required
                rows={5}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base resize-none"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                placeholder="Describe what students will learn in this course..."
                value={formData.description}
                onChange={handleInputChange}
                onFocus={(e) => (e. target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target.style. borderColor = '#E5E0E0')}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Course Image
              </label>

              {imagePreview && (
                <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                </div>
              )}

              <div
                className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center hover:shadow-md transition-all cursor-pointer"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
                onClick={() => document.getElementById('file-input').click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#3B2F2F';
                  e.currentTarget.style.backgroundColor = '#F3F0F0';
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E0E0';
                  e.currentTarget.style.backgroundColor = '#FAFAF9';
                }}
                onDrop={handleDrop}
              >
                <FiUpload className="mx-auto text-5xl mb-3" style={{ color: '#D1BAB0' }} />
                <p className="font-semibold mb-1" style={{ color: '#3B2F2F' }}>
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-600 mb-2">Or paste image URL:</p>
                <input
                  type="url"
                  name="image"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors text-sm"
                  style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                  placeholder="https://example. com/image.jpg"
                  value={formData.image}
                  onChange={handleInputChange}
                  onFocus={(e) => (e.target. style.borderColor = '#3B2F2F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2" style={{ borderColor: '#E5E0E0' }}>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: loading ? '#999999' : '#3B2F2F' }}
                onMouseEnter={(e) => { if (! loading) e.target.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { if (!loading) e. target.style.opacity = '1'; }}
              >
                <FiCheck size={20} />
                <span>{loading ? 'Creating Course...' : 'Create Course'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/courses')}
                className="flex-1 py-3 px-4 rounded-lg font-bold transition-all hover:shadow-md text-sm md:text-base"
                style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#E5E0E0')}
                onMouseLeave={(e) => (e.target.style. backgroundColor = '#F3F0F0')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCourse;