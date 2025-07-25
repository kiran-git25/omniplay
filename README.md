# OmniPlay - Universal Media Player

<div align="center">

![OmniPlay Logo](client/public/icon-192.png)

**The ultimate open source universal media player that combines the power of VLC and 7-Zip in one cross-platform application.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

[Live Demo](https://omniplay.replit.app) • [Report Bug](https://github.com/omniplay/omniplay/issues) • [Request Feature](https://github.com/omniplay/omniplay/issues)

</div>

## ✨ Features

### 🎯 Universal Media Support
- **Audio**: MP3, WAV, FLAC, AAC, OGG, M4A, OPUS, WMA, AIFF, AU
- **Video**: MP4, AVI, MKV, MOV, WMV, FLV, WEBM, 3GP, M4V, VOB
- **Images**: JPG, PNG, GIF, WEBP, SVG, BMP, TIFF, ICO, AVIF, HEIC
- **Documents**: PDF, TXT, MD (Markdown), DOC, DOCX, RTF, HTML
- **Archives**: ZIP, RAR, 7Z, TAR, GZIP, BZIP2, XZ with extraction and browsing

### 🌐 Cross-Platform Compatibility
- **Web**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS Safari, Android Chrome, Samsung Internet
- **Desktop**: Windows, macOS, Linux
- **PWA**: Install as native app on any platform
- **Offline**: Service worker caching for offline usage

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for phones, tablets, and desktops
- **Touch Friendly**: 44px minimum touch targets for mobile devices
- **Dark/Light Theme**: Automatic system preference detection + manual toggle
- **Drag & Drop**: Intuitive file upload from desktop or mobile
- **Archive Browsing**: Navigate through compressed files like a file explorer

### ⚡ Performance & Accessibility
- **Fast Loading**: Service worker caching and optimized bundles
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Mobile Optimized**: Touch gestures and mobile-specific interactions

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit [omniplay.replit.app](https://omniplay.replit.app) and start using immediately!

### Option 2: Install as PWA
1. Visit the web app in your browser
2. Click "Install App" or "Add to Home Screen"
3. Use like a native application

### Option 3: Run Locally
```bash
# Clone the repository
git clone https://github.com/omniplay/omniplay.git
cd omniplay

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express.js + TypeScript
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Archive Handling**: Native browser APIs + custom extraction
- **PWA**: Service Worker + Web App Manifest

## 📱 Platform Support

| Platform | Browser | Status | Installation |
|----------|---------|--------|--------------|
| **iOS** | Safari | ✅ Full Support | Add to Home Screen |
| **Android** | Chrome | ✅ Full Support | Install App |
| **Windows** | Chrome/Edge | ✅ Full Support | Install App |
| **macOS** | Safari/Chrome | ✅ Full Support | Install App |
| **Linux** | Firefox/Chrome | ✅ Full Support | Install App |

## 🎯 Use Cases

- **Media Library Management**: Organize and play your media collection
- **Archive Exploration**: Browse ZIP/RAR files without extraction
- **Document Viewing**: Read PDFs and text files on any device
- **Cross-Device Sync**: Access files from phone, tablet, or computer
- **Offline Media**: Watch/listen when internet is unavailable
- **Developer Tool**: Test media files during development

## 🤝 Contributing

We love contributions! OmniPlay is designed to be community-driven and continuously maintained.

### Ways to Contribute
- 🐛 **Report Bugs**: Open an issue with details
- ✨ **Request Features**: Suggest new functionality
- 🔧 **Submit PRs**: Fix bugs or add features
- 📚 **Improve Docs**: Help others understand the project
- 🌍 **Translate**: Add support for more languages

### Development Setup
```bash
# Fork and clone the repo
git clone https://github.com/yourusername/omniplay.git
cd omniplay

# Install dependencies
npm install

# Start development environment
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Add tests for new features
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [VLC Media Player](https://www.videolan.org/vlc/) for universal media support
- Archive handling inspired by [7-Zip](https://www.7-zip.org/)
- Built with amazing open source tools and libraries
- Thanks to all contributors and users

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=omniplay/omniplay&type=Date)](https://star-history.com/#omniplay/omniplay&Date)

---

<div align="center">

**Made with ❤️ by the OmniPlay community**

[Website](https://omniplay.replit.app) • [GitHub](https://github.com/omniplay/omniplay) • [Issues](https://github.com/omniplay/omniplay/issues) • [Discussions](https://github.com/omniplay/omniplay/discussions)

</div>