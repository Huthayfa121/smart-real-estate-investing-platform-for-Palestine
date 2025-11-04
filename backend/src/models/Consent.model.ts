import mongoose, { Document, Schema } from 'mongoose';

export interface IConsent extends Document {
  userId: mongoose.Types.ObjectId;
  termsOfService: {
    accepted: boolean;
    acceptedAt?: Date;
    version: string;
  };
  privacyPolicy: {
    accepted: boolean;
    acceptedAt?: Date;
    version: string;
  };
  marketingEmails: boolean;
  dataSharing: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const consentSchema = new Schema<IConsent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    termsOfService: {
      accepted: {
        type: Boolean,
        required: true,
        default: false,
      },
      acceptedAt: {
        type: Date,
      },
      version: {
        type: String,
        required: true,
        default: '1.0',
      },
    },
    privacyPolicy: {
      accepted: {
        type: Boolean,
        required: true,
        default: false,
      },
      acceptedAt: {
        type: Date,
      },
      version: {
        type: String,
        required: true,
        default: '1.0',
      },
    },
    marketingEmails: {
      type: Boolean,
      default: false,
    },
    dataSharing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Consent = mongoose.model<IConsent>('Consent', consentSchema);

export default Consent;

