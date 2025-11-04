import { Request, Response, NextFunction } from 'express';
import Recommendation from '../models/Recommendation.model';
import InvestorProfile from '../models/InvestorProfile.model';
import { generateRecommendations } from '../services/recommendation.service';

// @desc    Get recommendations for user
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    const filter: any = { userId: req.user?._id };
    if (status) filter.status = status;

    const recommendations = await Recommendation.find(filter).sort({ matchScore: -1 });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: { recommendations },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recommendation
// @route   GET /api/recommendations/:id
// @access  Private
export const getRecommendationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      res.status(404);
      throw new Error('Recommendation not found');
    }

    // Check if user owns this recommendation
    if (recommendation.userId.toString() !== String(req.user?._id)) {
      res.status(403);
      throw new Error('Not authorized to view this recommendation');
    }

    res.status(200).json({
      success: true,
      data: { recommendation },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate new recommendations for user
// @route   POST /api/recommendations/generate
// @access  Private
export const generateNewRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user's investor profile
    const profile = await InvestorProfile.findOne({ userId: req.user?._id });

    if (!profile) {
      res.status(400);
      throw new Error('Please complete your investor profile first');
    }

    // Generate recommendations
    const recommendations = await generateRecommendations(profile);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: { recommendations },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recommendation status
// @route   PUT /api/recommendations/:id
// @access  Private
export const updateRecommendationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      res.status(404);
      throw new Error('Recommendation not found');
    }

    // Check if user owns this recommendation
    if (recommendation.userId.toString() !== String(req.user?._id)) {
      res.status(403);
      throw new Error('Not authorized to update this recommendation');
    }

    recommendation.status = status;
    await recommendation.save();

    res.status(200).json({
      success: true,
      data: { recommendation },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recommendation
// @route   DELETE /api/recommendations/:id
// @access  Private
export const deleteRecommendation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      res.status(404);
      throw new Error('Recommendation not found');
    }

    // Check if user owns this recommendation
    if (recommendation.userId.toString() !== String(req.user?._id)) {
      res.status(403);
      throw new Error('Not authorized to delete this recommendation');
    }

    await Recommendation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recommendation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

