import User from '../models/User.js';
import { AppError } from '../errors/AppError.js';
import { updateProfileSchema } from '../validators/auth.validators.js';

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const profileCompletion = calculateProfileCompletion(user);

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        profile: user.profile,
        isActive: user.isActive,
        profileCompletion,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (req, res) => {
  try {
    const validation = updateProfileSchema.safeParse(req.body);
    if (!validation.success) {
      throw new AppError(validation.error.errors[0].message, 400);
    }

    const { fullName, mobileNumber, ...profileData } = validation.data;

    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (fullName) user.fullName = fullName;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    user.profile = { ...user.profile, ...profileData };
    await user.save();

    const profileCompletion = calculateProfileCompletion(user);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profile: user.profile,
        profileCompletion
      }
    });
  } catch (error) {
    throw error;
  }
};

const calculateProfileCompletion = (user) => {
  const basicFields = ['fullName', 'email', 'mobileNumber'];
  const profileFields = ['dateOfBirth', 'gender', 'state', 'district', 'educationLevel', 'annualFamilyIncome'];

  let completedBasic = 0;
  basicFields.forEach(field => {
    if (field === 'fullName' && user.fullName) completedBasic++;
    if (field === 'email' && user.email) completedBasic++;
    if (field === 'mobileNumber' && user.mobileNumber) completedBasic++;
  });

  let completedProfile = 0;
  profileFields.forEach(field => {
    if (user.profile && user.profile[field]) completedProfile++;
  });

  const basicPercentage = (completedBasic / basicFields.length) * 50;
  const profilePercentage = (completedProfile / profileFields.length) * 50;
  const total = Math.round(basicPercentage + profilePercentage);

  return {
    percentage: total,
    completed: completedBasic + completedProfile,
    total: basicFields.length + profileFields.length,
    isComplete: total === 100
  };
};

export { getProfile, updateProfile, calculateProfileCompletion };
