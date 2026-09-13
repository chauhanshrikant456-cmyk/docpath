import { useState, useCallback } from 'react';
import profileService from '../services/profile.service.js';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      setProfile(response.user);
      setError(null);
    } catch (err) {
      setError(err.error || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await profileService.updateProfile(data);
      setProfile(response.user);
      setError(null);
      return response;
    } catch (err) {
      setError(err.error || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
};

export default useProfile;
