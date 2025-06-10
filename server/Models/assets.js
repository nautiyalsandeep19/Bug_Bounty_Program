import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  assetURL: {
    type: String,
    required: true,
    trim: true
  },
  assetDescription: {
    type: String,
    trim: true
  },
  assetType: {
    type: String,
    required: true,
    enum: ['website', 'api', 'mobile android', 'mobile ios', 'hardware', 'others']
  },
  labels: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        const allowedLabels = ['production', 'development', 'staging', 'testing', 'qa', 'devops'];
        return arr.every(val => allowedLabels.includes(val));
      },
      message: props => `Invalid label(s) in [${props.value}]. Allowed values: production, development, staging, testing, qa, devops`
    }
  },
  scopeGroupLabels: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        const allowedScopeLabels = ['api cluster', 'payment gateway', 'infrastructure', 'microservices'];
        return arr.every(val => allowedScopeLabels.includes(val));
      },
      message: props => `Invalid scope group label(s) in [${props.value}]. Allowed values: api cluster, payment gateway, infrastructure, microservices`
    }
  },
  scopeGroupType: {
    type: String,
    required: true,
    enum: ['In Scope', 'Out Scope']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
program: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Program',
  required: false,
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Asset = mongoose.model('Asset', assetSchema);
export default Asset;
