import { type MediaFile, type InsertMediaFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMediaFile(id: string): Promise<MediaFile | undefined>;
  getAllMediaFiles(): Promise<MediaFile[]>;
  createMediaFile(file: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: string): Promise<boolean>;
  getMediaFilesByType(type: string): Promise<MediaFile[]>;
}

export class MemStorage implements IStorage {
  private mediaFiles: Map<string, MediaFile>;

  constructor() {
    this.mediaFiles = new Map();
  }

  async getMediaFile(id: string): Promise<MediaFile | undefined> {
    return this.mediaFiles.get(id);
  }

  async getAllMediaFiles(): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createMediaFile(insertFile: InsertMediaFile): Promise<MediaFile> {
    const id = randomUUID();
    const file: MediaFile = { 
      ...insertFile, 
      id,
      duration: insertFile.duration ?? null,
      createdAt: new Date()
    };
    this.mediaFiles.set(id, file);
    return file;
  }

  async deleteMediaFile(id: string): Promise<boolean> {
    return this.mediaFiles.delete(id);
  }

  async getMediaFilesByType(type: string): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values())
      .filter(file => file.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const storage = new MemStorage();
