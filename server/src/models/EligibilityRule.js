import mongoose from 'mongoose';

const eligibilityRuleSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  field: { type: String, required: true },
  operator: { type: String, enum: ['==', '!=', '>', '<', '>=', '<=', 'IN', 'BETWEEN'] },
  value: mongoose.Schema.Types.Mixed,
  logicalOperator: { type: String, enum: ['AND', 'OR'], default: 'AND' }
}, { timestamps: true });

const EligibilityRule = mongoose.model('EligibilityRule', eligibilityRuleSchema);
export default EligibilityRule;
