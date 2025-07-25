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

export function getFileTypeFromMime(mimeType: string): 'audio' | 'video' | 'image' | 'document' {
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  return 'document';
}

export function isMediaSupported(mimeType: string): boolean {
  const supportedTypes = [
    // Audio
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4',
    // Video
    'video/mp4', 'video/webm', 'video/ogg',
    // Images
    'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp',
    // Documents
    'application/pdf', 'text/plain', 'text/markdown'
  ];
  
  return supportedTypes.includes(mimeType);
}
