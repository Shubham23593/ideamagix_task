import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiList, FiCalendar, FiClock, FiBook, FiUser, FiTrash2, FiPlus } from 'react-icons/fi';

const AllLectures = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const { data } = await api.get('/lectures');
      setLectures(data);
    } catch (error) {
      toast.error('Failed to fetch lectures');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await api. delete(`/lectures/${lectureId}`);
        toast.success('Lecture deleted successfully!  ✓');
        fetchLectures();
      } catch (error) {
        toast.error('Failed to delete lecture');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
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

  const filterLectures = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'upcoming':
        return lectures.filter((lecture) => new Date(lecture.date) >= today);
      case 'past':
        return lectures.filter((lecture) => new Date(lecture. date) < today);
      default:
        return lectures;
    }
  };

  const filteredLectures = filterLectures();

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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
            <FiList className="inline mr-3" />
            All Lectures
          </h1>
          <p className="text-gray-600">View and manage all scheduled lectures</p>
        </div>
        <button
          onClick={() => navigate('/admin/lectures')}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-md"
          style={{ backgroundColor: '#3B2F2F' }}
        >
          <FiPlus size={20} />
          Assign New Lecture
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'upcoming', 'past'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === filterOption
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={
              filter === filterOption
                ?  { backgroundColor: '#3B2F2F' }
                : {}
            }
          >
            {filterOption.charAt(0). toUpperCase() + filterOption. slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border-2 p-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <p className="text-sm font-semibold text-gray-600 mb-1">Total Lectures</p>
          <h3 className="text-3xl font-bold" style={{ color: '#3B2F2F' }}>{lectures.length}</h3>
        </div>
        <div className="rounded-lg border-2 p-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <p className="text-sm font-semibold text-gray-600 mb-1">Upcoming</p>
          <h3 className="text-3xl font-bold text-green-600">
            {lectures.filter((l) => new Date(l.date) >= new Date(). setHours(0, 0, 0, 0)).length}
          </h3>
        </div>
        <div className="rounded-lg border-2 p-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
          <p className="text-sm font-semibold text-gray-600 mb-1">Past</p>
          <h3 className="text-3xl font-bold text-gray-600">
            {lectures. filter((l) => new Date(l.date) < new Date(). setHours(0, 0, 0, 0)).length}
          </h3>
        </div>
      </div>

      {/* Lectures List */}
      <div className="rounded-xl border-2 shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        <div className="p-6">
          {filteredLectures.length > 0 ? (
            <div className="space-y-4">
              {filteredLectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="rounded-lg border-2 p-5 hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#FAFAF9', borderColor: '#E5E0E0' }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 space-y-3">
                      {/* Course & Batch */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <FiBook style={{ color: '#3B2F2F' }} size={18} />
                          <h3 className="font-bold text-lg" style={{ color: '#3B2F2F' }}>
                            {lecture.course?. name}
                          </h3>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: '#E5E0E0', color: '#3B2F2F' }}
                        >
                          {lecture.batchName}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{
                            backgroundColor:
                              lecture.course?.level === 'Beginner'
                                ? '#10B981'
                                : lecture.course?.level === 'Intermediate'
                                ?  '#F59E0B'
                                : '#EF4444',
                          }}
                        >
                          {lecture.course?.level}
                        </span>
                      </div>

                      {/* Topic */}
                      <p className="text-gray-700 font-medium">{lecture.topic}</p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiUser size={16} />
                        <span className="text-sm">{lecture.instructor?. name}</span>
                        <span className="text-xs text-gray-400">
                          • {lecture.instructor?.expertise}
                        </span>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiCalendar size={16} />
                          <span>{formatDate(lecture.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock size={16} />
                          <span>
                            {formatTime(lecture.startTime)} - {formatTime(lecture.endTime)}
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      {lecture.notes && (
                        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#F3F0F0' }}>
                          <p className="text-sm text-gray-700">{lecture.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Delete Button */}
                    <div>
                      <button
                        onClick={() => handleDelete(lecture._id)}
                        className="p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                        title="Delete lecture"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto text-6xl mb-4" style={{ color: '#D1BAB0' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
                No Lectures Found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? 'Start by assigning lectures to instructors'
                  : `No ${filter} lectures available`}
              </p>
              <button
                onClick={() => navigate('/admin/lectures')}
                className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-md"
                style={{ backgroundColor: '#3B2F2F' }}
              >
                <FiPlus className="inline mr-2" />
                Assign Lecture
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllLectures;