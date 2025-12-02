import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { FiMail, FiUser } from 'react-icons/fi';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const { data } = await api.get('/instructors');
      setInstructors(data);
    } catch (error) {
      toast.error('Failed to fetch instructors');
    } finally {
      setLoading(false);
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

      <div className="rounded-xl border-2 shadow-md overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0E0' }}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b-2" style={{ borderColor: '#E5E0E0' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#3B2F2F' }}>
            All Instructors
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            List of all instructors registered in the system
          </p>
        </div>

        {/* Table / Empty State */}
        {instructors.length > 0 ? (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ backgroundColor: '#F3F0F0', borderBottom: '2px solid #E5E0E0' }}>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wide" style={{ color: '#3B2F2F' }}>
                    Instructor
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wide" style={{ color: '#3B2F2F' }}>
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wide" style={{ color: '#3B2F2F' }}>
                    Assignment
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructor) => (
                  <tr
                    key={instructor._id}
                    className="text-sm transition-all"
                    style={{ borderBottom: '1px solid #E5E0E0' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFAF9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    {/* Name + Avatar + Expertise */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {instructor.profilePicture ? (
                          <img
                            src={instructor.profilePicture}
                            alt={instructor.name}
                            className="w-10 h-10 rounded-full object-cover shadow-sm flex-shrink-0"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                            style={{ backgroundColor: '#3B2F2F', color: '#FFFFFF' }}
                          >
                            {instructor.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold truncate" style={{ color: '#3B2F2F' }}>
                            {instructor.name}
                          </p>
                          {instructor.expertise && (
                            <p className="text-xs text-gray-600 truncate">
                              {instructor.expertise}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiMail size={14} className="text-gray-500" />
                        <span className="text-xs sm:text-sm break-all">
                          {instructor.email}
                        </span>
                      </div>
                    </td>

                    {/* Assignment */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F3F0F0', color: '#3B2F2F' }}>
                        Not Assigned
                      </span>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Next lecture: N/A
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <FiUser
              className="mx-auto mb-4"
              size={56}
              style={{ color: '#D1BAB0' }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#3B2F2F' }}>
              No Instructors Found
            </h3>
            <p className="text-sm text-gray-600">
              Instructors will appear here once they sign up.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InstructorList;
