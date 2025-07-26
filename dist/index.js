// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  mediaFiles;
  constructor() {
    this.mediaFiles = /* @__PURE__ */ new Map();
  }
  async getMediaFile(id) {
    return this.mediaFiles.get(id);
  }
  async getAllMediaFiles() {
    return Array.from(this.mediaFiles.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createMediaFile(insertFile) {
    const id = randomUUID();
    const file = {
      ...insertFile,
      id,
      duration: insertFile.duration ?? null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.mediaFiles.set(id, file);
    return file;
  }
  async deleteMediaFile(id) {
    return this.mediaFiles.delete(id);
  }
  async getMediaFilesByType(type) {
    return Array.from(this.mediaFiles.values()).filter((file) => file.type === type).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};
var storage = new MemStorage();

// server/routes.ts
import multer from "multer";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var mediaFiles = pgTable("media_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(),
  // 'audio', 'video', 'image', 'document', 'archive'
  duration: integer("duration"),
  // for audio/video in seconds
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
var upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 100 * 1024 * 1024
    // 100MB limit
  }
});
function getFileType(mimeType) {
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf" || mimeType === "text/plain" || mimeType === "text/markdown" || mimeType === "application/msword" || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || mimeType === "application/rtf") return "document";
  if (mimeType === "application/zip" || mimeType === "application/x-rar-compressed" || mimeType === "application/x-7z-compressed" || mimeType === "application/x-tar" || mimeType === "application/gzip" || mimeType === "application/x-bzip2") return "archive";
  return "document";
}
async function getMediaDuration(filePath, mimeType) {
  return void 0;
}
async function registerRoutes(app2) {
  app2.get("/api/media", async (req, res) => {
    try {
      const files = await storage.getAllMediaFiles();
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve media files" });
    }
  });
  app2.get("/api/media/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (!["audio", "video", "image", "document", "archive"].includes(type)) {
        return res.status(400).json({ message: "Invalid media type" });
      }
      const files = await storage.getMediaFilesByType(type);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve media files" });
    }
  });
  app2.post("/api/media/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const file = req.file;
      const fileType = getFileType(file.mimetype);
      const duration = await getMediaDuration(file.path, file.mimetype);
      const mediaFileData = {
        name: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
        type: fileType,
        duration
      };
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
  app2.get("/api/media/:id", async (req, res) => {
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
  app2.delete("/api/media/:id", async (req, res) => {
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
  app2.use("/uploads", express.static("uploads"));
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
