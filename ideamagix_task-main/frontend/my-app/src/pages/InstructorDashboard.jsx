import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiCalendar, FiClock, FiBook, FiAlertCircle } from 'react-icons/fi';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const { data } = await api.get(`/lectures/instructor/${user._id}`);
      setLectures(data);
    } catch (error) {
      toast.error('Failed to fetch lectures');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isUpcoming = (date) => {
    return new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0));
  };

  const upcomingLectures = lectures.filter((lecture) => isUpcoming(lecture.date));
  const totalLectures = lectures.length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2" style={{ borderColor: '#3B2F2F' }}></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Welcome Message */}
      <div className="rounded-xl p-6 mb-8 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0', color: '#3B2F2F' }}>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your lecture schedule and upcoming classes.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Lectures Card */}
        <div className="rounded-xl p-6 border-2 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Upcoming Lectures</p>
              <h3 className="text-5xl font-bold" style={{ color: '#3B2F2F' }}>
                {upcomingLectures.length}
              </h3>
            </div>
            <div className="h-16 w-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F3F0F0' }}>
              <FiCalendar className="text-3xl" style={{ color: '#3B2F2F' }} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Scheduled for this month</p>
        </div>

        {/* Total Lectures Card */}
        <div className="rounded-xl p-6 border-2 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Total Lectures Assigned</p>
              <h3 className="text-5xl font-bold" style={{ color: '#3B2F2F' }}>
                {totalLectures}
              </h3>
            </div>
            <div className="h-16 w-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F3F0F0' }}>
              <FiBook className="text-3xl" style={{ color: '#3B2F2F' }} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">All-time total</p>
        </div>
      </div>

      {/* Upcoming Lectures Section */}
      <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        <div className="p-6 border-b-2" style={{ borderColor: '#E5E0E0' }}>
          <div className="flex items-center gap-3">
            <FiCalendar className="text-2xl" style={{ color: '#3B2F2F' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#3B2F2F' }}>
              Upcoming Lectures
            </h2>
          </div>
        </div>

        <div className="p-6">
          {upcomingLectures.length > 0 ? (
            <div className="space-y-4">
              {upcomingLectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="rounded-lg p-5 border-l-4 hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#FAFAF9', borderLeftColor: '#3B2F2F', borderColor: '#E5E0E0', borderWidth: '1px' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Course Header */}
                      <div className="flex items-center space-x-4 mb-4">
                        {lecture.course?.image && (
                          <img
                            src={lecture.course.image}
                            alt={lecture.course.name}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-bold" style={{ color: '#3B2F2F' }}>
                            {lecture.course?.name}
                          </h3>
                          <span className="text-sm text-gray-600">{lecture.batchName}</span>
                        </div>
                      </div>

                      {/* Date & Time Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2 text-base" style={{ color: '#3B2F2F' }} />
                          <span className="font-medium">{formatDate(lecture.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiClock className="mr-2 text-base" style={{ color: '#3B2F2F' }} />
                          <span className="font-medium">
                            {lecture.startTime} - {lecture.endTime}
                          </span>
                        </div>
                      </div>

                      {/* Topic */}
                      {lecture.topic && (
                        <div className="mb-3 pb-3 border-b" style={{ borderColor: '#E5E0E0' }}>
                          <p className="text-sm text-gray-700">
                            <strong style={{ color: '#3B2F2F' }}>Topic:</strong> {lecture.topic}
                          </p>
                        </div>
                      )}

                      {/* Notes */}
                      {lecture.notes && (
                        <div className="p-3 rounded-lg mt-3" style={{ backgroundColor: '#F3F0F0', borderLeft: '3px solid #3B2F2F' }}>
                          <p className="text-sm text-gray-700">{lecture.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiAlertCircle className="mx-auto text-5xl mb-4" style={{ color: '#D1BAB0' }} />
              <p className="text-gray-500 font-medium">No upcoming lectures scheduled.</p>
              <p className="text-sm text-gray-400 mt-1">Check back soon for new assignments.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;
