import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import InvestorProfile from '../models/InvestorProfile.model';
import Content from '../models/Content.model';
import Advisor from '../models/Advisor.model';
import Recommendation from '../models/Recommendation.model';
import Conversation from '../models/Conversation.model';

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalUsers,
      totalAdvisors,
      totalContent,
      totalRecommendations,
      totalConversations,
      activeUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Advisor.countDocuments(),
      Content.countDocuments({ status: 'published' }),
      Recommendation.countDocuments(),
      Conversation.countDocuments({ status: 'active' }),
      User.countDocuments({ isActive: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalAdvisors,
          totalContent,
          totalRecommendations,
          totalConversations,
          activeUsers,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, isActive } = req.query;

    const filter: any = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Delete associated data
    await Promise.all([
      InvestorProfile.findOneAndDelete({ userId: user._id }),
      Advisor.findOneAndDelete({ userId: user._id }),
      Recommendation.deleteMany({ userId: user._id }),
    ]);

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User and associated data deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

