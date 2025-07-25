# Contributing to OmniPlay

Thank you for your interest in contributing to OmniPlay! This document provides guidelines and information for contributors.

## 🌟 Welcome

OmniPlay is an open source universal media player that aims to combine the best of VLC Media Player and 7-Zip in a modern, cross-platform web application. We welcome contributions of all kinds, from bug reports to feature implementations.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them get started
- **Be constructive**: Provide helpful feedback and suggestions
- **Be collaborative**: Work together to improve the project

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Clear title**: Summarize the issue briefly
- **Description**: Detailed explanation of what went wrong
- **Steps to reproduce**: How can we recreate the issue?
- **Expected behavior**: What should have happened?
- **Environment**: Browser, OS, device type
- **Screenshots**: If applicable, add visual context

### Feature Requests
For new features, please provide:
- **Use case**: Why is this feature needed?
- **Description**: What should the feature do?
- **Implementation ideas**: Any thoughts on how it could work?
- **Priority**: How important is this feature?

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Modern web browser for testing

### Local Development
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork locally
git clone https://github.com/yourusername/omniplay.git
cd omniplay

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open http://localhost:5000
```

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and helpers
│   │   └── hooks/        # Custom React hooks
│   └── public/       # Static assets
├── server/           # Express.js backend
├── shared/           # Shared TypeScript types
└── uploads/          # File storage (development)
```

## 📝 Development Guidelines

### Code Style
- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS with shadcn/ui components
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add comments for complex logic

### Component Guidelines
```typescript
// ✅ Good: Functional component with proper typing
interface MediaPlayerProps {
  file: MediaFile;
  onPlay?: () => void;
}

export function MediaPlayer({ file, onPlay }: MediaPlayerProps) {
  // Component logic here
}

// ❌ Bad: Class component without types
class MediaPlayer extends Component {
  render() {
    // Component logic here
  }
}
```

### API Development
- **REST**: Follow RESTful conventions
- **Validation**: Use Zod for request validation
- **Error Handling**: Provide clear error messages
- **Types**: Share types between frontend and backend

### Testing
- Write tests for new features
- Test across different browsers and devices
- Verify mobile responsiveness
- Test PWA functionality

## 🚀 Contributing Process

### 1. Choose an Issue
- Check [existing issues](https://github.com/omniplay/omniplay/issues)
- Comment on the issue you want to work on
- Wait for maintainer assignment (helps avoid duplicates)

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes
- Write clean, well-documented code
- Follow the existing code style
- Add tests if applicable
- Update documentation if needed

### 4. Test Your Changes
```bash
# Run the development server
npm run dev

# Test on different browsers
# Test mobile responsiveness
# Test PWA installation
# Verify file upload/playback works
```

### 5. Commit Your Changes
Use conventional commits:
```bash
git commit -m "feat: add support for FLAC audio files"
git commit -m "fix: resolve video playback issue on iOS"
git commit -m "docs: update installation instructions"
```

### 6. Push and Create PR
```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots for UI changes
- Testing notes

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### High Priority
- **Mobile optimization**: Touch gestures, better mobile UI
- **Performance**: Loading speed, memory usage optimization
- **Accessibility**: Screen reader support, keyboard navigation
- **File format support**: Additional audio/video formats

### Medium Priority
- **Internationalization**: Multi-language support
- **Themes**: Additional color schemes and customization
- **Search functionality**: File search and filtering
- **Playlist features**: Creating and managing playlists

### Future Ideas
- **Cloud storage**: Integration with Google Drive, Dropbox
- **Streaming**: Support for streaming protocols
- **Plugins**: Extensible plugin system
- **Desktop apps**: Electron or Tauri wrappers

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Tools
- [MDN Web Docs](https://developer.mozilla.org/) - Web API reference
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [PWA Builder](https://www.pwabuilder.com/) - PWA development

## 🏆 Recognition

Contributors are recognized in several ways:
- Listed in README.md contributors section
- Mentioned in release notes for significant contributions
- GitHub contributor badge
- Potential maintainer invitation for consistent contributors

## ❓ Questions

- **General questions**: Use [GitHub Discussions](https://github.com/omniplay/omniplay/discussions)
- **Bug reports**: Open an [issue](https://github.com/omniplay/omniplay/issues)
- **Security issues**: Email the maintainers privately

## 📄 License

By contributing to OmniPlay, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to OmniPlay! Together we can build the best universal media player for everyone. 🎉