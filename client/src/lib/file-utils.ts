export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getFileTypeFromMime(mimeType: string): 'audio' | 'video' | 'image' | 'document' | 'archive' {
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/zip' || 
      mimeType === 'application/x-rar-compressed' ||
      mimeType === 'application/x-7z-compressed' ||
      mimeType === 'application/x-tar' ||
      mimeType === 'application/gzip' ||
      mimeType === 'application/x-bzip2') return 'archive';
  return 'document';
}

export function isMediaSupported(mimeType: string): boolean {
  const supportedTypes = [
    // Audio formats (like VLC support)
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/aac', 
    'audio/flac', 'audio/wma', 'audio/m4a', 'audio/opus', 'audio/webm',
    // Video formats (like VLC support)
    'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mkv', 
    'video/mov', 'video/wmv', 'video/flv', 'video/3gp', 'video/m4v',
    // Images
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 
    'image/webp', 'image/bmp', 'image/tiff', 'image/ico',
    // Documents
    'application/pdf', 'text/plain', 'text/markdown', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf', 'application/vnd.oasis.opendocument.text',
    // Archives (like 7zip support)
    'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
    'application/x-tar', 'application/gzip', 'application/x-bzip2', 'application/x-xz'
  ];
  
  return supportedTypes.includes(mimeType);
}
