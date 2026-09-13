import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  issuingAuthority: String,
  officialRoute: String,
  validityPeriod: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
