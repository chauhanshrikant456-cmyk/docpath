import mongoose from 'mongoose';

const dependencySchema = new mongoose.Schema({
  sourceDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  dependentDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  description: String
}, { timestamps: true });

const Dependency = mongoose.model('Dependency', dependencySchema);
export default Dependency;
