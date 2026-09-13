import User from '../models/User.js';
import { AppError } from '../errors/AppError.js';
import { updateProfileSchema } from '../validators/auth.validators.js';

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        profile: user.profile,
        isActive: user.isActive,
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

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profile: user.profile
      }
    });
  } catch (error) {
    throw error;
  }
};

export { getProfile, updateProfile };
