import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobileNumber: String,
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: {
    dateOfBirth: Date,
    gender: String,
    state: String,
    district: String,
    educationLevel: String,
    annualFamilyIncome: Number
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

userSchema.index({ email: 1 });
const User = mongoose.model('User', userSchema);
export default User;
