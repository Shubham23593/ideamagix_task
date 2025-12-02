  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Pages
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import InstructorLectures from './pages/InstructorLectures';
import InstructorProfile from './pages/InstructorProfile';
import InstructorList from './pages/InstructorList';
import CourseList from './pages/CourseList';
import AddCourse from './pages/AddCourse';
import CourseDetail from './pages/CourseDetail';
import AddLecture from './pages/AddLecture';
import AssignLecture from './pages/AssignLecture';
import AllLectures from './pages/AllLectures';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route - Combined Auth Page */}
        <Route 
          path="/" 
          element={
            user ?  (
              user.role === 'admin' ?  (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/instructor" replace />
              )
            ) : (
              <AuthPage />
            )
          } 
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute requiredRole="admin">
              <CourseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/add"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/:id/add-lecture"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddLecture />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute requiredRole="admin">
              <InstructorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lectures"
          element={
            <ProtectedRoute requiredRole="admin">
              <AssignLecture />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/all-lectures"
          element={
            <ProtectedRoute requiredRole="admin">
              <AllLectures />
            </ProtectedRoute>
          }
        />

        {/* Instructor Routes */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute requiredRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/lectures"
          element={
            <ProtectedRoute requiredRole="instructor">
              <InstructorLectures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <ProtectedRoute requiredRole="instructor">
              <InstructorProfile />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;