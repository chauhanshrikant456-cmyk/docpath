import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';
import { ChevronLeft } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2).optional(),
  mobileNumber: z.string().regex(/^\d{10}$/).optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  educationLevel: z.string().optional(),
  course: z.string().optional(),
  institution: z.string().optional(),
  year: z.string().optional(),
  category: z.string().optional(),
  annualFamilyIncome: z.number().optional()
});

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { profile, fetchProfile, updateProfile, loading } = useProfile();
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    values: profile ? {
      fullName: profile.fullName || '',
      mobileNumber: profile.mobileNumber || '',
      dateOfBirth: profile.profile?.dateOfBirth || '',
      gender: profile.profile?.gender || '',
      state: profile.profile?.state || '',
      district: profile.profile?.district || '',
      address: profile.profile?.address || '',
      educationLevel: profile.profile?.educationLevel || '',
      course: profile.profile?.course || '',
      institution: profile.profile?.institution || '',
      year: profile.profile?.year || '',
      category: profile.profile?.category || '',
      annualFamilyIncome: profile.profile?.annualFamilyIncome || ''
    } : undefined
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.error || 'Failed to update profile');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'education', label: 'Education' },
    { id: 'location', label: 'Location' },
    { id: 'financial', label: 'Financial' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {profile && profile.profileCompletion && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-900">Profile Completion</h2>
              <span className="text-lg font-bold text-blue-600">{profile.profileCompletion.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${profile.profileCompletion.percentage}%` }} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 flex">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 text-center font-medium transition ${ activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900' }`}>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input {...register('fullName')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input {...register('mobileNumber')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input {...register('dateOfBirth')} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select {...register('gender')} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                  <select {...register('educationLevel')} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select</option>
                    <option value="HSC">12th (HSC)</option>
                    <option value="UG">Undergraduate</option>
                    <option value="PG">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input {...register('course')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  <input {...register('institution')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select {...register('year')} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input {...register('state')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input {...register('district')} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea {...register('address')} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select {...register('category')} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Family Income</label>
                  <input {...register('annualFamilyIncome', { valueAsNumber: true })} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => navigate('/dashboard')} className="flex-1 bg-gray-300 text-gray-900 py-3 rounded-md hover:bg-gray-400 font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
