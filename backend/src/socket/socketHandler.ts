import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/jwt';
import logger from '../utils/logger';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const initializeSocketHandlers = (io: Server) => {
  // Authentication middleware for socket connections
  io.use((socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`User connected: ${socket.userId}`);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Join conversation room
    socket.on('join-conversation', (conversationId: string) => {
      socket.join(conversationId);
      logger.info(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Leave conversation room
    socket.on('leave-conversation', (conversationId: string) => {
      socket.leave(conversationId);
      logger.info(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle typing indicator
    socket.on('typing-start', (data: { conversationId: string }) => {
      socket.to(data.conversationId).emit('user-typing', {
        userId: socket.userId,
        conversationId: data.conversationId,
      });
    });

    socket.on('typing-stop', (data: { conversationId: string }) => {
      socket.to(data.conversationId).emit('user-stopped-typing', {
        userId: socket.userId,
        conversationId: data.conversationId,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.userId}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for user ${socket.userId}: ${error}`);
    });
  });

  return io;
};

