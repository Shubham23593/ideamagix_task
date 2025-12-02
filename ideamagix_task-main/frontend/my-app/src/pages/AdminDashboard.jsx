import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiBook, FiUsers, FiCalendar, FiList, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalInstructors: 0,
    upcomingLectures: 0,
    totalLectures: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, instructorsRes, lecturesRes] = await Promise.all([
        api.get('/courses'),
        api.get('/instructors'),
        api.get('/lectures'),
      ]);

      const courses = coursesRes.data;
      const instructors = instructorsRes.data;
      const lectures = lecturesRes.data;

      const upcoming = lectures.filter(
        (lecture) => new Date(lecture.date) >= new Date(new Date().setHours(0, 0, 0, 0))
      );

      setStats({
        totalCourses: courses.length,
        totalInstructors: instructors.length,
        upcomingLectures: upcoming.length,
        totalLectures: lectures.length,
      });

      setRecentCourses(courses.slice(0, 3));
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return { bg: '#D1FAE5', text: '#065F46', label: 'Beginner' };
      case 'Intermediate':
        return { bg: '#FEF3C7', text: '#92400E', label: 'Intermediate' };
      case 'Advanced':
        return { bg: '#FEE2E2', text: '#991B1B', label: 'Advanced' };
      default:
        return { bg: '#F3F0F0', text: '#666666', label: level };
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

      {/* Welcome Message */}
      <div className="rounded-xl p-6 mb-8 border-2 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
          Welcome back, Admin! 👋
        </h1>
        <p className="text-gray-600">Here's a quick overview of your lecture scheduling system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Courses */}
        <div className="rounded-lg border-2 shadow-md p-5 md:p-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Total Courses</p>
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: '#3B2F2F' }}>
                {stats.totalCourses}
              </h3>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <FiBook size={24} style={{ color: '#059669' }} />
            </div>
          </div>
        </div>

        {/* Total Instructors */}
        <div className="rounded-lg border-2 shadow-md p-5 md:p-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Total Instructors</p>
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: '#3B2F2F' }}>
                {stats.totalInstructors}
              </h3>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
              <FiUsers size={24} style={{ color: '#0369A1' }} />
            </div>
          </div>
        </div>

        {/* Upcoming Lectures */}
        <div className="rounded-lg border-2 shadow-md p-5 md:p-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Upcoming Lectures</p>
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: '#3B2F2F' }}>
                {stats.upcomingLectures}
              </h3>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E9D5FF' }}>
              <FiCalendar size={24} style={{ color: '#7C3AED' }} />
            </div>
          </div>
        </div>

        {/* Total Lectures */}
        <div className="rounded-lg border-2 shadow-md p-5 md:p-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Total Lectures</p>
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: '#3B2F2F' }}>
                {stats.totalLectures}
              </h3>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FED7AA' }}>
              <FiList size={24} style={{ color: '#B45309' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ borderColor: '#E5E0E0' }}>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: '#3B2F2F' }}>
              Recent Courses
            </h2>
            <p className="text-sm text-gray-600">The most recently added courses</p>
          </div>
          <Link
            to="/admin/courses"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-sm md:text-base transition-all hover:shadow-md"
            style={{ backgroundColor: '#3B2F2F' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View All
            <FiArrowRight size={18} />
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {recentCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentCourses.map((course) => {
                const levelColor = getLevelColor(course.level);
                return (
                  <Link
                    key={course._id}
                    to={`/admin/courses/${course._id}`}
                    className="rounded-lg overflow-hidden border-2 hover:shadow-lg transition-all group"
                    style={{ backgroundColor: '#FAFAF9', borderColor: '#E5E0E0' }}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold mb-2 truncate text-sm md:text-base transition-colors"
                          style={{ color: '#3B2F2F' }}
                        >
                          {course.name}
                        </h3>
                        <span
                          className="inline-block px-3 py-1 text-xs font-bold rounded-full"
                          style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
                        >
                          {course.level}
                        </span>
                      </div>
                      <div
                        className="p-2 rounded-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: '#F3F0F0' }}
                      >
                        <FiArrowRight size={18} style={{ color: '#3B2F2F' }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiBook
                className="mx-auto mb-4"
                size={48}
                style={{ color: '#D1BAB0' }}
              />
              <p className="font-semibold text-gray-600 mb-2">No courses found</p>
              <p className="text-sm text-gray-500 mb-4">
                Add your first course to get started managing your lectures
              </p>
              <Link
                to="/admin/courses/add"
                className="inline-block px-6 py-2 rounded-lg font-bold text-white"
                style={{ backgroundColor: '#3B2F2F' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Add First Course
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
