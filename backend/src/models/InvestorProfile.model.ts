import mongoose, { Document, Schema } from 'mongoose';

export interface IInvestorProfile extends Document {
  userId: mongoose.Types.ObjectId;
  investmentGoals: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  preferredLocations: string[];
  propertyTypes: string[];
  investmentHorizon: 'short' | 'medium' | 'long';
  riskTolerance: 'low' | 'medium' | 'high';
  preferredReturnType: 'rental' | 'appreciation' | 'both';
  additionalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const investorProfileSchema = new Schema<IInvestorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    investmentGoals: {
      type: [String],
      default: [],
    },
    budgetRange: {
      min: {
        type: Number,
        required: true,
        min: 0,
      },
      max: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    preferredLocations: {
      type: [String],
      default: [],
    },
    propertyTypes: {
      type: [String],
      enum: ['residential', 'commercial', 'industrial', 'agricultural', 'mixed-use'],
      default: [],
    },
    investmentHorizon: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium',
    },
    riskTolerance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    preferredReturnType: {
      type: String,
      enum: ['rental', 'appreciation', 'both'],
      default: 'both',
    },
    additionalNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InvestorProfile = mongoose.model<IInvestorProfile>('InvestorProfile', investorProfileSchema);

export default InvestorProfile;

