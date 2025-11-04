import { Request, Response, NextFunction } from 'express';
import Consent from '../models/Consent.model';

// @desc    Get user consent
// @route   GET /api/consent
// @access  Private
export const getConsent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let consent = await Consent.findOne({ userId: req.user?._id });

    if (!consent) {
      // Create default consent record
      consent = await Consent.create({
        userId: req.user?._id,
        termsOfService: { accepted: false, version: '1.0' },
        privacyPolicy: { accepted: false, version: '1.0' },
        marketingEmails: false,
        dataSharing: false,
      });
    }

    res.status(200).json({
      success: true,
      data: { consent },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user consent
// @route   PUT /api/consent
// @access  Private
export const updateConsent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates: any = {};

    if (req.body.termsOfService !== undefined) {
      updates.termsOfService = {
        accepted: req.body.termsOfService,
        acceptedAt: req.body.termsOfService ? new Date() : undefined,
        version: '1.0',
      };
    }

    if (req.body.privacyPolicy !== undefined) {
      updates.privacyPolicy = {
        accepted: req.body.privacyPolicy,
        acceptedAt: req.body.privacyPolicy ? new Date() : undefined,
        version: '1.0',
      };
    }

    if (req.body.marketingEmails !== undefined) {
      updates.marketingEmails = req.body.marketingEmails;
    }

    if (req.body.dataSharing !== undefined) {
      updates.dataSharing = req.body.dataSharing;
    }

    const consent = await Consent.findOneAndUpdate(
      { userId: req.user?._id },
      updates,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: { consent },
    });
  } catch (error) {
    next(error);
  }
};

