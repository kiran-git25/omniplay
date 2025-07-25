import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { insertMediaFileSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

// Helper function to determine file type from mime type
function getFileType(mimeType: string): string {
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf' || 
      mimeType === 'text/plain' || 
      mimeType === 'text/markdown' ||
      mimeType === 'application/msword' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/rtf') return 'document';
  if (mimeType === 'application/zip' || 
      mimeType === 'application/x-rar-compressed' ||
      mimeType === 'application/x-7z-compressed' ||
      mimeType === 'application/x-tar' ||
      mimeType === 'application/gzip' ||
      mimeType === 'application/x-bzip2') return 'archive';
  return 'document';
}

// Helper function to get audio/video duration (stub for now)
async function getMediaDuration(filePath: string, mimeType: string): Promise<number | undefined> {
  // In a real implementation, you'd use ffprobe or similar to get duration
  // For now, return undefined
  return undefined;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all media files
  app.get("/api/media", async (req, res) => {
    try {
      const files = await storage.getAllMediaFiles();
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve media files" });
    }
  });

  // Get media files by type
  app.get("/api/media/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (!['audio', 'video', 'image', 'document', 'archive'].includes(type)) {
        return res.status(400).json({ message: "Invalid media type" });
      }
      const files = await storage.getMediaFilesByType(type);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve media files" });
    }
  });

  // Upload media file
  app.post("/api/media/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.file;
      const fileType = getFileType(file.mimetype);
      
      // Get duration for audio/video files
      const duration = await getMediaDuration(file.path, file.mimetype);

      const mediaFileData = {
        name: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
        type: fileType,
        duration,
      };

      // Validate the data
      const validatedData = insertMediaFileSchema.parse(mediaFileData);
      
      const savedFile = await storage.createMediaFile(validatedData);
      res.json(savedFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid file data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Get specific media file
  app.get("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const file = await storage.getMediaFile(id);
      
      if (!file) {
        return res.status(404).json({ message: "Media file not found" });
      }
      
      res.json(file);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve media file" });
    }
  });

  // Delete media file
  app.delete("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMediaFile(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Media file not found" });
      }
      
      res.json({ message: "Media file deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // Serve uploaded files statically
  app.use('/uploads', express.static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}
