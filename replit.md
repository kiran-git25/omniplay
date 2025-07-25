# replit.md

## Overview

This is a universal open source media player web application built with React, Express.js, and TypeScript. The application functions like a combination of VLC Media Player and 7-Zip, supporting comprehensive file format playback and archive management. It provides cross-device compatibility with PWA capabilities and supports audio, video, images, documents, and archive files with specialized viewers for each content type.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Handling**: Multer for multipart file uploads
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Storage Strategy
The application implements a dual storage approach:
- **Development**: In-memory storage using MemStorage class for rapid prototyping
- **Production**: Database-backed storage with PostgreSQL and Drizzle ORM
- Files are uploaded to local filesystem (`uploads/` directory) with metadata stored in database

## Key Components

### Media Management
- **File Upload**: Universal drag-and-drop interface supporting 50+ file formats with progress tracking and error handling
- **Media Library**: Organized view with filtering by media type (audio, video, image, document, archive)
- **Archive Support**: Full ZIP, RAR, 7Z, TAR, GZIP archive viewing and extraction capabilities like 7-Zip
- **File Metadata**: Comprehensive tracking including original name, MIME type, size, duration (for media files)

### Media Viewers
- **Audio Player**: Custom controls with play/pause, seek, volume, and duration display (supports MP3, WAV, OGG, AAC, FLAC, M4A like VLC)
- **Video Player**: Full-featured player with standard media controls (supports MP4, WebM, AVI, MKV, MOV, WMV like VLC)
- **Image Viewer**: Zoom controls and fullscreen viewing capabilities (supports JPG, PNG, GIF, SVG, WebP, BMP, TIFF)
- **PDF Viewer**: Page navigation and embedded PDF rendering
- **Text Viewer**: Plain text and Markdown rendering support
- **Archive Viewer**: Browse archive contents, extract files, directory navigation (supports ZIP, RAR, 7Z, TAR, GZIP like 7-Zip)

### UI Components
- **Design System**: shadcn/ui components with New York style variant
- **Cross-Device Support**: Full PWA capabilities with service worker, offline support, and installable on all devices
- **Responsive Design**: Mobile-first approach with enhanced touch targets (44px minimum) and optimized layouts
- **Platform Optimizations**: Touch-friendly controls for mobile, hover states for desktop, proper scaling for tablets
- **Dark Mode**: CSS variables-based theming support with automatic system preference detection
- **Accessibility**: ARIA-compliant components from Radix UI with screen reader support
- **Universal Compatibility**: Native-like experience on iOS, Android, Windows, macOS, and Linux devices
- **Performance**: Service worker caching, lazy loading, and optimized for 3G networks

## Data Flow

### File Upload Process
1. User drags files or selects through file input
2. Files are validated client-side for type and size
3. FormData is sent to `/api/media/upload` endpoint
4. Server processes files with Multer middleware
5. File metadata is extracted and stored in database
6. Success/error feedback provided through toast notifications
7. Media library refreshes to show new files

### Media Playback Flow
1. User selects media file from library
2. File metadata passed to appropriate viewer component
3. Media URL streamed from server file storage
4. Player controls manage playback state locally
5. Progress and settings maintained in component state

## External Dependencies

### Core Dependencies
- **Database**: Neon Database for serverless PostgreSQL hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Library**: Radix UI primitives for accessible components
- **Validation**: Zod for runtime type validation and schema definition

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Code Quality**: ESBuild for production bundling
- **Hot Reload**: Vite HMR with runtime error overlay
- **Replit Integration**: Cartographer plugin for Replit-specific features

### Media Handling
- **File Processing**: Multer for handling multipart uploads (100MB limit)
- **Date Utilities**: date-fns for consistent date formatting
- **File Type Detection**: MIME type-based categorization system

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` starts development server with tsx
- **Hot Reload**: Vite serves frontend with HMR enabled
- **Database**: Drizzle kit for schema management and migrations
- **Environment**: NODE_ENV=development enables development features

### Production Build
- **Frontend**: Vite builds optimized bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied with `npm run db:push`
- **Start**: `npm start` runs production server with NODE_ENV=production

### File Structure
```
├── client/           # React frontend application
├── server/           # Express.js backend
├── shared/           # Shared TypeScript types and schemas
├── uploads/          # File storage directory
├── migrations/       # Database migration files
└── dist/            # Production build output
```

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment flag (development/production)
- **REPL_ID**: Replit-specific identifier for development features

The application is designed for easy deployment on platforms like Replit, with automatic database provisioning and file storage handling.