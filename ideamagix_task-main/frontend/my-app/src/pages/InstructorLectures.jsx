import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiCalendar, FiClock, FiBook } from 'react-icons/fi';

const InstructorLectures = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

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

  const isUpcoming = (date) => {
    return new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0));
  };

  const filteredLectures = lectures.filter((lecture) => {
    if (filter === 'upcoming') return isUpcoming(lecture.date);
    if (filter === 'completed') return !isUpcoming(lecture.date);
    return true;
  });

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
          My Lectures
        </h1>
        <p className="text-gray-600">View and manage your assigned lecture schedules</p>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-4 sm:p-6 border-b-2" style={{ borderColor: '#E5E0E0' }}>
          {['upcoming', 'completed', 'all'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200"
              style={{
                backgroundColor: filter === filterOption ? '#3B2F2F' : '#F3F0F0',
                color: filter === filterOption ? '#FFFFFF' : '#3B2F2F',
              }}
              onMouseEnter={(e) => {
                if (filter !== filterOption) {
                  e.target.style.backgroundColor = '#E5E0E0';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== filterOption) {
                  e.target.style.backgroundColor = '#F3F0F0';
                }
              }}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {filteredLectures.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#F3F0F0', borderBottom: '2px solid #E5E0E0' }}>
                      <th className="text-left py-4 px-4 font-bold text-sm" style={{ color: '#3B2F2F' }}>
                        COURSE
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-sm" style={{ color: '#3B2F2F' }}>
                        BATCH
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-sm" style={{ color: '#3B2F2F' }}>
                        DATE
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-sm" style={{ color: '#3B2F2F' }}>
                        TIME
                      </th>
                      <th className="text-center py-4 px-4 font-bold text-sm" style={{ color: '#3B2F2F' }}>
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLectures.map((lecture) => (
                      <tr
                        key={lecture._id}
                        className="hover:shadow-md transition-all"
                        style={{ borderBottom: '1px solid #E5E0E0' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAF9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {lecture.course?.image && (
                              <img
                                src={lecture.course.image}
                                alt={lecture.course.name}
                                className="w-10 h-10 object-cover rounded-lg shadow-sm"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-sm" style={{ color: '#3B2F2F' }}>
                                {lecture.course?.name}
                              </p>
                              <p className="text-xs text-gray-500">{lecture.course?.level}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{lecture.batchName}</td>
                        <td className="py-4 px-4 text-sm font-medium" style={{ color: '#3B2F2F' }}>
                          {formatDate(lecture.date)}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {formatTime(lecture.startTime)} - {formatTime(lecture.endTime)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: isUpcoming(lecture.date) ? '#D1FAE5' : '#E5E7EB',
                              color: isUpcoming(lecture.date) ? '#065F46' : '#374151',
                            }}
                          >
                            {isUpcoming(lecture.date) ? 'Upcoming' : 'Completed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredLectures.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="rounded-lg p-4 border-l-4"
                    style={{ backgroundColor: '#FAFAF9', borderLeftColor: '#3B2F2F', borderColor: '#E5E0E0', borderWidth: '1px' }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        {lecture.course?.image && (
                          <img
                            src={lecture.course.image}
                            alt={lecture.course.name}
                            className="w-12 h-12 object-cover rounded-lg shadow-sm"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate" style={{ color: '#3B2F2F' }}>
                            {lecture.course?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{lecture.batchName}</p>
                        </div>
                      </div>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2"
                        style={{
                          backgroundColor: isUpcoming(lecture.date) ? '#D1FAE5' : '#E5E7EB',
                          color: isUpcoming(lecture.date) ? '#065F46' : '#374151',
                        }}
                      >
                        {isUpcoming(lecture.date) ? 'Upcoming' : 'Done'}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <FiCalendar size={16} style={{ color: '#3B2F2F' }} />
                        <span className="text-gray-700">{formatDate(lecture.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock size={16} style={{ color: '#3B2F2F' }} />
                        <span className="text-gray-700">
                          {formatTime(lecture.startTime)} - {formatTime(lecture.endTime)}
                        </span>
                      </div>
                    </div>

                    {/* Topic */}
                    {lecture.topic && (
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: '#E5E0E0' }}>
                        <p className="text-xs text-gray-600">
                          <strong style={{ color: '#3B2F2F' }}>Topic:</strong> {lecture.topic}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto text-6xl mb-4" style={{ color: '#D1BAB0' }} />
              <p className="text-lg font-semibold text-gray-600 mb-2">No lectures found</p>
              <p className="text-sm text-gray-500">
                {filter === 'upcoming' && 'No upcoming lectures scheduled'}
                {filter === 'completed' && 'No completed lectures yet'}
                {filter === 'all' && 'No lectures assigned'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorLectures;
