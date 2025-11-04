import mongoose, { Document, Schema } from 'mongoose';

export interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId;
  propertyTitle: string;
  propertyDescription: string;
  location: string;
  propertyType: string;
  price: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  matchScore: number;
  reasons: string[];
  imageUrl?: string;
  propertyDetails: {
    size?: number;
    bedrooms?: number;
    bathrooms?: number;
    yearBuilt?: number;
    features?: string[];
  };
  status: 'active' | 'interested' | 'dismissed';
  createdAt: Date;
  updatedAt: Date;
}

const recommendationSchema = new Schema<IRecommendation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    expectedReturn: {
      type: Number,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    reasons: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
    },
    propertyDetails: {
      size: Number,
      bedrooms: Number,
      bathrooms: Number,
      yearBuilt: Number,
      features: [String],
    },
    status: {
      type: String,
      enum: ['active', 'interested', 'dismissed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Recommendation = mongoose.model<IRecommendation>('Recommendation', recommendationSchema);

export default Recommendation;

