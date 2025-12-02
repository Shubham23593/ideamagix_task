import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiCalendar, FiUser, FiBook, FiClock } from 'react-icons/fi';

const AssignLecture = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const [formData, setFormData] = useState({
    course: '',
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
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, instructorsRes] = await Promise.all([
        api.get('/courses'),
        api.get('/instructors'),
      ]);
      setCourses(coursesRes.data);
      setInstructors(instructorsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'instructor' || name === 'date') {
      if (formData.instructor && formData.date && (name === 'instructor' || name === 'date')) {
        checkAvailability(
          name === 'instructor' ? value : formData.instructor,
          name === 'date' ? value : formData.date
        );
      }
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

      if (!data.available) {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error('Failed to check availability');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailable) {
      toast.error('Please select an available instructor or different date');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/lectures', formData);
      toast.success('Lecture assigned successfully!  ✓');
      setTimeout(() => {
        navigate('/admin/all-lectures');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to assign lecture');
    } finally {
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

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
          <FiCalendar className="inline mr-3" />
          Assign Lecture
        </h1>
        <p className="text-gray-600">Assign lectures to instructors for courses</p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border-2 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                <FiBook className="inline mr-2" />
                Course *
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course. name} ({course.level})
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Name */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Batch Name *
              </label>
              <input
                type="text"
                name="batchName"
                value={formData.batchName}
                onChange={handleChange}
                required
                placeholder="e.g., Batch A, Morning Batch"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              />
            </div>

            {/* Instructor Selection */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                <FiUser className="inline mr-2" />
                Instructor *
              </label>
              <select
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              >
                <option value="">Select an instructor</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name} - {instructor.expertise}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData. date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              />
            </div>

            {/* Availability Message */}
            {availabilityMessage && (
              <div
                className={`p-4 rounded-lg border-2 flex items-start gap-3 ${
                  isAvailable ? 'bg-green-50' : 'bg-red-50'
                }`}
                style={{ borderColor: isAvailable ? '#86EFAC' : '#FCA5A5' }}
              >
                {isAvailable ? (
                  <FiClock className="text-green-600 mt-0.5" size={20} />
                ) : (
                  <FiClock className="text-red-600 mt-0.5" size={20} />
                )}
                <p className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                  {availabilityMessage}
                </p>
              </div>
            )}

            {/* Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                  style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                  style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
                />
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Topic *
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="Lecture topic"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#3B2F2F' }}>
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData. notes}
                onChange={handleChange}
                rows="4"
                placeholder="Additional notes or instructions"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
                style={{ borderColor: '#E5E0E0', backgroundColor: '#FAFAF9' }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting || !isAvailable}
                className="flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#3B2F2F' }}
              >
                {submitting ? 'Assigning...' : 'Assign Lecture'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 py-3 px-4 rounded-lg font-bold transition-all hover:shadow-md"
                style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
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

export default AssignLecture;