import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus, FiEdit, FiCalendar, FiUsers } from 'react-icons/fi';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const getLevelStyle = (level) => {
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
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#3B2F2F' }}>
            Manage Courses
          </h1>
          <p className="text-sm text-gray-600">
            View, edit and assign lectures to courses
          </p>
        </div>
        <Link
          to="/admin/courses/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-md flex-shrink-0"
          style={{ backgroundColor: '#3B2F2F' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <FiPlus size={18} />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {courses.map((course) => {
            const level = getLevelStyle(course.level);
            return (
              <div
                key={course._id}
                className="rounded-xl border-2 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-all group"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}
              >
                {/* Image */}
                {course.image && (
                  <div className="h-40 md:h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Body */}
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  {/* Level + Name + Meta */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <span
                        className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-2"
                        style={{ backgroundColor: level.bg, color: level.text }}
                      >
                        {course.level}
                      </span>
                      <h3
                        className="text-base md:text-lg font-bold truncate leading-tight"
                        style={{ color: '#3B2F2F' }}
                      >
                        {course.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                      <FiUsers size={14} />
                      <span>3 Assigned</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {course.description}
                  </p>

                  {/* Footer Actions */}
                  <div className="mt-auto space-y-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/courses/${course._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:shadow-md hover:scale-[1.02]"
                        style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
                      >
                        <FiEdit size={14} />
                        <span>Edit</span>
                      </Link>
                      <Link
                        to={`/admin/courses/${course._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:shadow-md hover:scale-[1.02]"
                        style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}
                      >
                        <FiCalendar size={14} />
                        <span>Batches</span>
                      </Link>
                    </div>
                    <Link
                      to={`/admin/courses/${course._id}/add-lecture`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all hover:shadow-lg hover:scale-[1.02]"
                      style={{ backgroundColor: '#3B2F2F', color: '#FFFFFF' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <FiUsers size={14} />
                      <span>Assign Lecture</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="rounded-xl border-2 shadow-md text-center py-16 px-4"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}
        >
          <FiCalendar
            className="mx-auto mb-4"
            size={64}
            style={{ color: '#D1BAB0' }}
          />
          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
            No Courses Found
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Get started by adding your first course.
          </p>
          <Link
            to="/admin/courses/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: '#3B2F2F' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <FiPlus size={18} />
            <span>Add Course</span>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourseList;
