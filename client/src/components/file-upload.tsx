import { useCallback, useState } from "react";
import { CloudUpload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FileUploadProps {
  onFileUploaded: () => void;
}

export default function FileUpload({ onFileUploaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        await apiRequest('POST', '/api/media/upload', formData);
      }

      toast({
        title: "Success",
        description: `${files.length} file(s) uploaded successfully!`,
      });
      
      onFileUploaded();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast, onFileUploaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  }, [handleFileUpload]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Media Files</h2>
      
      <div
        className={`universal-dropzone p-6 sm:p-8 text-center cursor-pointer mobile-touch ${
          isDragging 
            ? 'drag-over border-primary bg-blue-50 dark:bg-blue-950' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-950'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && document.getElementById('fileInput')?.click()}
        onTouchStart={() => !isUploading && document.getElementById('fileInput')?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <CloudUpload className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {isUploading ? 'Uploading...' : 'Drop files here or tap to browse'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Universal support: Audio, Video, Documents, Images, Archives
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Works on all devices: Phone, Tablet, Desktop
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">MP3</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">MP4</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">PDF</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ZIP</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">JPG</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">+50 more</span>
          </div>
        </div>
      </div>

      <input
        type="file"
        id="fileInput"
        multiple
        className="hidden"
        accept=".mp3,.mp4,.avi,.mov,.mkv,.flv,.wmv,.m4v,.3gp,.pdf,.txt,.md,.doc,.docx,.epub,.rtf,.odt,.jpg,.jpeg,.png,.gif,.svg,.bmp,.webp,.tiff,.wav,.ogg,.webm,.aac,.flac,.m4a,.zip,.rar,.7z,.tar,.gz,.bz2,.xz"
        onChange={handleFileSelect}
        disabled={isUploading}
      />
    </div>
  );
}
