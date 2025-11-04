import mongoose, { Document, Schema } from 'mongoose';

export interface IAdvisor extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string[];
  experience: number;
  certifications: string[];
  languages: string[];
  bio: string;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  rating: number;
  reviewCount: number;
  hourlyRate?: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const advisorSchema = new Schema<IAdvisor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    certifications: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: ['Arabic'],
    },
    bio: {
      type: String,
      required: true,
    },
    availability: {
      monday: { type: Boolean, default: true },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    hourlyRate: {
      type: Number,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Advisor = mongoose.model<IAdvisor>('Advisor', advisorSchema);

export default Advisor;

