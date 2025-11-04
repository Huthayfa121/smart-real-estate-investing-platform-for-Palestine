import { Request, Response, NextFunction } from 'express';
import InvestorProfile from '../models/InvestorProfile.model';

// @desc    Get or create investor profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let profile = await InvestorProfile.findOne({ userId: req.user?._id });

    if (!profile) {
      // Create default profile
      profile = await InvestorProfile.create({
        userId: req.user?._id,
        budgetRange: { min: 0, max: 0 },
        investmentGoals: [],
        preferredLocations: [],
        propertyTypes: [],
      });
    }

    res.status(200).json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update investor profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await InvestorProfile.findOneAndUpdate(
      { userId: req.user?._id },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete investor profile
// @route   DELETE /api/profile
// @access  Private
export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InvestorProfile.findOneAndDelete({ userId: req.user?._id });

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

