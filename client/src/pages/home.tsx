import { useState } from "react";
import Header from "@/components/header";
import FileUpload from "@/components/file-upload";
import MediaPlayer from "@/components/media-player";
import MediaLibrary from "@/components/media-library";
import { MediaFile } from "@shared/schema";

export default function Home() {
  const [currentMedia, setCurrentMedia] = useState<MediaFile | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFileUploaded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleMediaSelect = (media: MediaFile) => {
    setCurrentMedia(media);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            <FileUpload onFileUploaded={handleFileUploaded} />
            <MediaPlayer currentMedia={currentMedia} />
          </div>

          <div className="xl:col-span-1 order-first xl:order-last">
            <MediaLibrary 
              key={refreshKey} 
              onMediaSelect={handleMediaSelect}
              currentMedia={currentMedia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
