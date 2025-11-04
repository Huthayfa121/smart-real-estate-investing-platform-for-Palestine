import { Request, Response, NextFunction } from 'express';
import Conversation from '../models/Conversation.model';

// @desc    Get all conversations for user
// @route   GET /api/conversations
// @access  Private
export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user?._id,
      status: 'active',
    })
      .populate('participants', 'name email')
      .sort({ lastMessageAt: -1 });

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: { conversations },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation
// @route   GET /api/conversations/:id
// @access  Private
export const getConversationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate('participants', 'name email');

    if (!conversation) {
      res.status(404);
      throw new Error('Conversation not found');
    }

    // Check if user is participant
    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === String(req.user?._id)
    );

    if (!isParticipant) {
      res.status(403);
      throw new Error('Not authorized to view this conversation');
    }

    // Mark messages as read
    conversation.messages.forEach((msg) => {
      if (msg.sender.toString() !== String(req.user?._id)) {
        msg.isRead = true;
      }
    });
    await conversation.save();

    res.status(200).json({
      success: true,
      data: { conversation },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or get conversation
// @route   POST /api/conversations
// @access  Private
export const createConversation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { participantId } = req.body;

    if (!participantId) {
      res.status(400);
      throw new Error('Participant ID is required');
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user?._id, participantId] },
    }).populate('participants', 'name email');

    if (!conversation) {
      // Create new conversation
      conversation = await Conversation.create({
        participants: [req.user?._id, participantId],
        messages: [],
      });
      await conversation.populate('participants', 'name email');
    }

    res.status(201).json({
      success: true,
      data: { conversation },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add message to conversation
// @route   POST /api/conversations/:id/messages
// @access  Private
export const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      res.status(404);
      throw new Error('Conversation not found');
    }

    // Check if user is participant
    const isParticipant = conversation.participants.some(
      (p) => p.toString() === String(req.user?._id)
    );

    if (!isParticipant) {
      res.status(403);
      throw new Error('Not authorized to add message to this conversation');
    }

    // Add message
    conversation.messages.push({
      sender: req.user!._id as any,
      content,
      timestamp: new Date(),
      isRead: false,
    });

    conversation.lastMessage = content;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    // Emit socket event (handled by socket.io)
    const io = req.app.get('io');
    io.to(req.params.id).emit('new-message', {
      conversationId: req.params.id,
      message: conversation.messages[conversation.messages.length - 1],
    });

    res.status(201).json({
      success: true,
      data: { conversation },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive conversation
// @route   PUT /api/conversations/:id/archive
// @access  Private
export const archiveConversation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      res.status(404);
      throw new Error('Conversation not found');
    }

    // Check if user is participant
    const isParticipant = conversation.participants.some(
      (p) => p.toString() === String(req.user?._id)
    );

    if (!isParticipant) {
      res.status(403);
      throw new Error('Not authorized to archive this conversation');
    }

    conversation.status = 'archived';
    await conversation.save();

    res.status(200).json({
      success: true,
      message: 'Conversation archived successfully',
    });
  } catch (error) {
    next(error);
  }
};

