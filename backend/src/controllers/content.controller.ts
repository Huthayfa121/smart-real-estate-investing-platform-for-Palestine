import { Request, Response, NextFunction } from 'express';
import Content from '../models/Content.model';

// @desc    Get all content
// @route   GET /api/content
// @access  Public
export const getContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, category, status = 'published' } = req.query;
    
    const filter: any = { status };
    if (type) filter.type = type;
    if (category) filter.category = category;

    const content = await Content.find(filter)
      .populate('author', 'name email')
      .sort({ publishedAt: -1 });

    res.status(200).json({
      success: true,
      count: content.length,
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single content by ID
// @route   GET /api/content/:id
// @access  Public
export const getContentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.findById(req.params.id).populate('author', 'name email');

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.status(200).json({
      success: true,
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new content
// @route   POST /api/content
// @access  Private (Admin/Advisor)
export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user?._id,
    };

    const content = await Content.create(contentData);

    res.status(201).json({
      success: true,
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private (Admin/Advisor)
export const updateContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    // Check if user is author or admin
    if (content.author.toString() !== String(req.user?._id) && req.user?.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to update this content');
    }

    const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: { content: updatedContent },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private (Admin)
export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    await Content.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

