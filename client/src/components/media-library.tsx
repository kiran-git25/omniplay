import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MediaFile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  List, 
  Grid2x2X,
  Music,
  Camera,
  File,
  Crop,
  EllipsisVerticalIcon
} from "lucide-react";
import { formatFileSize, formatDuration } from "@/lib/file-utils";

interface MediaLibraryProps {
  onMediaSelect: (media: MediaFile) => void;
  currentMedia: MediaFile | null;
}

export default function MediaLibrary({ onMediaSelect, currentMedia }: MediaLibraryProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filter, setFilter] = useState<'all' | 'audio' | 'video' | 'document' | 'image'>('all');

  const { data: mediaFiles = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/media'],
  });

  const filteredFiles = mediaFiles.filter(file => 
    filter === 'all' || file.type === filter
  );

  const getFileIcon = (file: MediaFile) => {
    switch (file.type) {
      case 'audio':
        return <Music className="w-5 h-5 text-green-600" />;
      case 'video':
        return <Camera className="w-5 h-5 text-red-600" />;
      case 'document':
        return <File className="w-5 h-5 text-blue-600" />;
      case 'image':
        return <Crop className="w-5 h-5 text-purple-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getFileMetadata = (file: MediaFile) => {
    if (file.type === 'audio' || file.type === 'video') {
      return file.duration ? formatDuration(file.duration) + ' • ' + formatFileSize(file.size) : formatFileSize(file.size);
    }
    return formatFileSize(file.size);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Media Library</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid2x2X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-3">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'audio' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('audio')}
          >
            Audio
          </Button>
          <Button
            variant={filter === 'video' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('video')}
          >
            Video
          </Button>
          <Button
            variant={filter === 'document' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('document')}
          >
            Docs
          </Button>
          <Button
            variant={filter === 'image' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('image')}
          >
            Images
          </Button>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No files uploaded yet</p>
            <p className="text-xs">Upload some media to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                  currentMedia?.id === file.id ? 'bg-blue-50 border border-blue-200' : ''
                }`}
                onClick={() => onMediaSelect(file)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  file.type === 'audio' ? 'bg-green-100' :
                  file.type === 'video' ? 'bg-red-100' :
                  file.type === 'document' ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  {getFileIcon(file)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getFileMetadata(file)}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <EllipsisVerticalIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
