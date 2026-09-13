import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';
import toast from 'react-hot-toast';
import { Edit2, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profile, fetchProfile } = useProfile();
  const [profileCompletion, setProfileCompletion] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile?.profileCompletion) {
      setProfileCompletion(profile.profileCompletion);
    }
  }, [profile]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">DOCPath</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{user?.fullName}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.fullName}! 👋</h2>
          <p className="text-gray-600 text-lg">Manage your applications and track your readiness</p>
        </div>

        {profileCompletion && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
                <p className="text-gray-600 text-sm">Complete your profile to unlock all features</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{profileCompletion.percentage}%</p>
                <p className="text-gray-600 text-sm">{profileCompletion.completed} of {profileCompletion.total} fields</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${profileCompletion.percentage}%` }} />
            </div>
            {profileCompletion.percentage < 100 && (
              <button onClick={() => navigate('/profile/edit')} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 font-medium">
                <Edit2 className="w-4 h-4" />
                Complete Your Profile
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Applications</h3>
            <p className="text-gray-600 text-sm mb-4">Explore available applications and opportunities</p>
            <button onClick={() => navigate('/applications')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">Explore →</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">My Progress</h3>
            <p className="text-gray-600 text-sm mb-4">Track your readiness and completion status</p>
            <button onClick={() => navigate('/progress')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Progress →</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your information and preferences</p>
            <button onClick={() => navigate('/profile/edit')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit Profile →</button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-gray-600 text-sm mt-1">Applications Selected</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-gray-600 text-sm mt-1">Documents Uploaded</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">0</p>
              <p className="text-gray-600 text-sm mt-1">Completed Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">0</p>
              <p className="text-gray-600 text-sm mt-1">Pending Actions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
