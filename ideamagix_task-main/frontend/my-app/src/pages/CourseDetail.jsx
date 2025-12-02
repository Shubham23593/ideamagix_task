import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus, FiCalendar, FiClock, FiUser, FiTrash2, FiArrowLeft, FiBook } from 'react-icons/fi';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data.course);
      setLectures(data.lectures);
    } catch (error) {
      toast.error('Failed to fetch course details');
      navigate('/admin/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await api.delete(`/lectures/${lectureId}`);
        toast.success('Lecture deleted successfully! ✓');
        fetchCourseDetails();
      } catch (error) {
        toast.error('Failed to delete lecture');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'Intermediate':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Advanced':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#F3F0F0', text: '#666666' };
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

  if (!course) return null;

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/courses')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg mb-8 transition-all hover:shadow-md"
        style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
      >
        <FiArrowLeft size={18} />
        <span className="font-semibold">Back to Courses</span>
      </button>

      {/* Course Info Card */}
      <div className="rounded-xl border-2 shadow-md overflow-hidden mb-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-8">
          {/* Course Image */}
          {course.image && (
            <img
              src={course.image}
              alt={course.name}
              className="w-full md:w-64 h-48 object-cover rounded-lg shadow-md flex-shrink-0"
            />
          )}

          {/* Course Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Level Badge */}
              <div className="mb-4">
                <span
                  className="inline-block px-4 py-1.5 text-sm font-bold rounded-full"
                  style={{ backgroundColor: getLevelColor(course.level).bg, color: getLevelColor(course.level).text }}
                >
                  {course.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#3B2F2F' }}>
                {course.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
            </div>

            {/* Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <span>
                <strong style={{ color: '#3B2F2F' }}>Created by:</strong> {course.createdBy?.name}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                <strong style={{ color: '#3B2F2F' }}>{lectures.length}</strong> {lectures.length !== 1 ? 'lectures' : 'lecture'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lectures Section */}
      <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        {/* Header */}
        <div className="p-4 sm:p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ borderColor: '#E5E0E0' }}>
          <div className="flex items-center gap-3">
            <FiBook size={24} style={{ color: '#3B2F2F' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#3B2F2F' }}>
              Course Lectures
            </h2>
          </div>
          <Link
            to={`/admin/courses/${id}/add-lecture`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-md"
            style={{ backgroundColor: '#3B2F2F' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <FiPlus size={18} />
            <span>Add Lecture</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {lectures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="rounded-lg border-2 p-4 md:p-6 hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#FAFAF9', borderColor: '#E5E0E0' }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b-2" style={{ borderColor: '#E5E0E0' }}>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold truncate" style={{ color: '#3B2F2F' }}>
                        {lecture.batchName}
                      </h3>
                      {lecture.topic && (
                        <p className="text-sm text-gray-600 truncate mt-1">{lecture.topic}</p>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteLecture(lecture._id)}
                      className="p-2 rounded-lg transition-all hover:shadow-md flex-shrink-0"
                      style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FECACA')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                      title="Delete lecture"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    {/* Instructor */}
                    <div className="flex items-center gap-2">
                      <FiUser size={16} style={{ color: '#3B2F2F', flexShrink: 0 }} />
                      <span className="text-gray-700">{lecture.instructor?.name}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} style={{ color: '#3B2F2F', flexShrink: 0 }} />
                      <span className="text-gray-700 font-medium">{formatDate(lecture.date)}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <FiClock size={16} style={{ color: '#3B2F2F', flexShrink: 0 }} />
                      <span className="text-gray-700">
                        {formatTime(lecture.startTime)} - {formatTime(lecture.endTime)}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {lecture.notes && (
                    <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F3F0F0', borderLeft: '3px solid #3B2F2F' }}>
                      <p className="text-sm text-gray-700">{lecture.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <FiCalendar
                size={64}
                style={{ color: '#D1BAB0' }}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
                No Lectures Yet
              </h3>
              <p className="text-gray-600 mb-6">Add lecture batches to this course to get started.</p>
              <Link
                to={`/admin/courses/${id}/add-lecture`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-md"
                style={{ backgroundColor: '#3B2F2F' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <FiPlus size={20} />
                <span>Add First Lecture</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;
