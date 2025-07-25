import { useState, useEffect } from "react";
import { MediaFile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Archive, 
  FolderIcon, 
  FileIcon, 
  DownloadIcon,
  EyeIcon,
  AlertCircle
} from "lucide-react";
import { formatFileSize } from "@/lib/file-utils";

interface ArchiveViewerProps {
  file: MediaFile;
}

// Mock archive contents for demonstration
// In a real implementation, you'd use a library like node-stream-zip or similar
interface ArchiveEntry {
  name: string;
  size: number;
  isDirectory: boolean;
  path: string;
}

export default function ArchiveViewer({ file }: ArchiveViewerProps) {
  const [entries, setEntries] = useState<ArchiveEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Mock loading archive contents
    // In a real implementation, you'd call an API to extract archive contents
    const loadArchiveContents = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock archive contents based on file type
        const mockEntries: ArchiveEntry[] = [
          { name: "documents", size: 0, isDirectory: true, path: "documents/" },
          { name: "images", size: 0, isDirectory: true, path: "images/" },
          { name: "readme.txt", size: 1024, isDirectory: false, path: "readme.txt" },
          { name: "setup.exe", size: 2048000, isDirectory: false, path: "setup.exe" },
          { name: "config.json", size: 512, isDirectory: false, path: "config.json" },
        ];
        
        setEntries(mockEntries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load archive');
      } finally {
        setIsLoading(false);
      }
    };

    loadArchiveContents();
  }, [file.url]);

  const getFileIcon = (entry: ArchiveEntry) => {
    if (entry.isDirectory) {
      return <FolderIcon className="w-5 h-5 text-blue-500" />;
    }
    return <FileIcon className="w-5 h-5 text-gray-500" />;
  };

  const getArchiveIcon = () => {
    switch (file.mimeType) {
      case 'application/zip':
        return '📦';
      case 'application/x-rar-compressed':
        return '🗜️';
      case 'application/x-7z-compressed':
        return '🗃️';
      case 'application/x-tar':
      case 'application/gzip':
        return '📄';
      default:
        return '📁';
    }
  };

  const getArchiveType = () => {
    switch (file.mimeType) {
      case 'application/zip':
        return 'ZIP Archive';
      case 'application/x-rar-compressed':
        return 'RAR Archive';
      case 'application/x-7z-compressed':
        return '7-Zip Archive';
      case 'application/x-tar':
        return 'TAR Archive';
      case 'application/gzip':
        return 'GZIP Archive';
      case 'application/x-bzip2':
        return 'BZIP2 Archive';
      default:
        return 'Archive';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Extracting archive contents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="font-medium">Failed to load archive</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Archive Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getArchiveIcon()}</div>
          <div>
            <h3 className="font-medium text-gray-900">{file.originalName}</h3>
            <p className="text-sm text-gray-500">
              {getArchiveType()} • {formatFileSize(file.size)} • {entries.length} items
            </p>
          </div>
        </div>
      </div>

      {/* Archive Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Archive className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {currentPath || "Root directory"}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Extract All
          </Button>
        </div>
      </div>

      {/* Archive Contents */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-200">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                if (entry.isDirectory) {
                  // Navigate into directory (mock)
                  setCurrentPath(entry.path);
                }
              }}
            >
              <div className="flex-shrink-0">
                {getFileIcon(entry)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {entry.name}
                </p>
                <p className="text-xs text-gray-500">
                  {entry.isDirectory ? 'Folder' : formatFileSize(entry.size)}
                </p>
              </div>
              
              {!entry.isDirectory && (
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {entries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Archive className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Empty archive</p>
          </div>
        )}
      </div>
    </div>
  );
}