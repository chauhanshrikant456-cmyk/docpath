import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  category: String,
  deadline: Date,
  officialSource: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
