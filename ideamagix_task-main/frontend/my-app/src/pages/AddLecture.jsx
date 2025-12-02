import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiArrowLeft, FiAlertCircle, FiCheckCircle, FiClock, FiUser, FiBook } from 'react-icons/fi';

const AddLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const [formData, setFormData] = useState({
    batchName: '',
    instructor: '',
    date: '',
    startTime: '',
    endTime: '',
    topic: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [courseRes, instructorsRes] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get('/instructors'),
      ]);
      setCourse(courseRes.data.course);
      setInstructors(instructorsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      navigate('/admin/courses');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (instructorId, date) => {
    if (!instructorId || !date) return;

    try {
      const { data } = await api.post('/lectures/check-availability', {
        instructorId,
        date,
      });

      setIsAvailable(data.available);
      setAvailabilityMessage(data.message);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'instructor' || name === 'date') {
      const instructorId = name === 'instructor' ? value : formData.instructor;
      const date = name === 'date' ? value : formData.date;

      if (instructorId && date) {
        checkAvailability(instructorId, date);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailable) {
      toast.error('Selected instructor is not available on this date');
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/lectures', {
        ...formData,
        course: id,
      });
      toast.success('Lecture added successfully! 🎉');
      setTimeout(() => {
        navigate(`/admin/courses/${id}`);
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add lecture');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-t-4"
            style={{ borderColor: '#E5E0E0', borderTopColor: '#3B2F2F' }}
          ></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Back Button */}
      <button
        onClick={() => navigate(`/admin/courses/${id}`)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg mb-8 transition-all hover:shadow-md"
        style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
      >
        <FiArrowLeft size={18} />
        <span className="font-semibold">Back to Course</span>
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
          Add Lecture
        </h1>
        <p className="text-gray-600">
          Course: <span className="font-bold" style={{ color: '#3B2F2F' }}>{course?.name}</span>
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl">
        <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6">
            
            {/* Batch Name */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Batch Name *
              </label>
              <input
                type="text"
                name="batchName"
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                placeholder="e.g., Batch A, Morning Session"
                value={formData.batchName}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
              />
            </div>

            {/* Instructor Selection */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Instructor *
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E5E0E0' }}>
                <FiUser size={20} style={{ color: '#3B2F2F' }} />
                <select
                  name="instructor"
                  required
                  className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
                  style={{ color: '#3B2F2F' }}
                  value={formData.instructor}
                  onChange={handleInputChange}
                >
                  <option value="">Select an instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor.name} {instructor.expertise ? `- ${instructor.expertise}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
              />
            </div>

            {/* Availability Message */}
            {availabilityMessage && (
              <div
                className="p-4 rounded-lg flex items-start gap-3 border-2"
                style={{
                  backgroundColor: isAvailable ? '#D1FAE5' : '#FEE2E2',
                  borderColor: isAvailable ? '#6EE7B7' : '#FECACA',
                }}
              >
                {isAvailable ? (
                  <FiCheckCircle size={20} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <FiAlertCircle size={20} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
                )}
                <p
                  className="text-sm font-medium"
                  style={{ color: isAvailable ? '#047857' : '#991B1B' }}
                >
                  {availabilityMessage}
                </p>
              </div>
            )}

            {/* Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  Start Time *
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E5E0E0' }}>
                  <FiClock size={18} style={{ color: '#3B2F2F' }} />
                  <input
                    type="time"
                    name="startTime"
                    required
                    className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
                    style={{ color: '#3B2F2F' }}
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  End Time *
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E5E0E0' }}>
                  <FiClock size={18} style={{ color: '#3B2F2F' }} />
                  <input
                    type="time"
                    name="endTime"
                    required
                    className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
                    style={{ color: '#3B2F2F' }}
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Topic
              </label>
              <div className="flex items-start gap-3 px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E5E0E0' }}>
                <FiBook size={18} style={{ color: '#3B2F2F', marginTop: '2px', flexShrink: 0 }} />
                <input
                  type="text"
                  name="topic"
                  className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
                  style={{ color: '#3B2F2F' }}
                  placeholder="e.g., Introduction to React Hooks"
                  value={formData.topic}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Notes
              </label>
              <textarea
                name="notes"
                rows={4}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-sm md:text-base resize-none"
                style={{ borderColor: '#E5E0E0', color: '#3B2F2F' }}
                placeholder="Additional information about this lecture..."
                value={formData.notes}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.style.borderColor = '#3B2F2F')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E0E0')}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2" style={{ borderColor: '#E5E0E0' }}>
              <button
                type="submit"
                disabled={submitting || !isAvailable}
                className="flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                style={{ backgroundColor: submitting || !isAvailable ? '#999999' : '#3B2F2F' }}
                onMouseEnter={(e) => {
                  if (!submitting && isAvailable) e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  if (!submitting && isAvailable) e.target.style.opacity = '1';
                }}
              >
                {submitting ? 'Adding Lecture...' : 'Add Lecture'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/admin/courses/${id}`)}
                className="flex-1 py-3 px-4 rounded-lg font-bold transition-all hover:shadow-md text-sm md:text-base"
                style={{
                  backgroundColor: '#F3F0F0',
                  color: '#3B2F2F',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#E5E0E0')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#F3F0F0')}
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

export default AddLecture;
