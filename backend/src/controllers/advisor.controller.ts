import { Request, Response, NextFunction } from 'express';
import Advisor from '../models/Advisor.model';
import User from '../models/User.model';

// @desc    Get all advisors
// @route   GET /api/advisors
// @access  Public
export const getAdvisors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { specialization, available } = req.query;

    const filter: any = {};
    if (specialization) filter.specialization = { $in: [specialization] };
    if (available) filter.isAvailable = available === 'true';

    const advisors = await Advisor.find(filter)
      .populate('userId', 'name email phoneNumber')
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: advisors.length,
      data: { advisors },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single advisor
// @route   GET /api/advisors/:id
// @access  Public
export const getAdvisorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisor = await Advisor.findById(req.params.id).populate('userId', 'name email phoneNumber');

    if (!advisor) {
      res.status(404);
      throw new Error('Advisor not found');
    }

    res.status(200).json({
      success: true,
      data: { advisor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create advisor profile
// @route   POST /api/advisors
// @access  Private (Admin)
export const createAdvisor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, ...advisorData } = req.body;

    // Check if user exists and is advisor role
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update user role to advisor if not already
    if (user.role !== 'advisor') {
      user.role = 'advisor';
      await user.save();
    }

    const advisor = await Advisor.create({
      userId,
      ...advisorData,
    });

    res.status(201).json({
      success: true,
      data: { advisor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update advisor profile
// @route   PUT /api/advisors/:id
// @access  Private (Advisor/Admin)
export const updateAdvisor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisor = await Advisor.findById(req.params.id);

    if (!advisor) {
      res.status(404);
      throw new Error('Advisor not found');
    }

    // Check if user is the advisor or admin
    if (advisor.userId.toString() !== String(req.user?._id) && req.user?.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to update this advisor profile');
    }

    const updatedAdvisor = await Advisor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: { advisor: updatedAdvisor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete advisor profile
// @route   DELETE /api/advisors/:id
// @access  Private (Admin)
export const deleteAdvisor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const advisor = await Advisor.findById(req.params.id);

    if (!advisor) {
      res.status(404);
      throw new Error('Advisor not found');
    }

    await Advisor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Advisor profile deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

