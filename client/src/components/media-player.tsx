import { MediaFile } from "@shared/schema";
import AudioPlayer from "./viewers/audio-player";
import VideoPlayer from "./viewers/video-player";
import ImageViewer from "./viewers/image-viewer";
import PdfViewer from "./viewers/pdf-viewer";
import TextViewer from "./viewers/text-viewer";
import ArchiveViewer from "./viewers/archive-viewer";
import { PlayIcon } from "lucide-react";

interface MediaPlayerProps {
  currentMedia: MediaFile | null;
}

export default function MediaPlayer({ currentMedia }: MediaPlayerProps) {
  const renderMediaViewer = () => {
    if (!currentMedia) {
      return (
        <div className="text-center text-gray-400">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayIcon className="w-12 h-12 fill-current" />
          </div>
          <p className="text-lg font-medium">No media selected</p>
          <p className="text-sm opacity-75">Upload or select a file to start playing</p>
        </div>
      );
    }

    switch (currentMedia.type) {
      case 'audio':
        return <AudioPlayer file={currentMedia} />;
      case 'video':
        return <VideoPlayer file={currentMedia} />;
      case 'image':
        return <ImageViewer file={currentMedia} />;
      case 'document':
        if (currentMedia.mimeType === 'application/pdf') {
          return <PdfViewer file={currentMedia} />;
        } else {
          return <TextViewer file={currentMedia} />;
        }
      case 'archive':
        return <ArchiveViewer file={currentMedia} />;
      default:
        return (
          <div className="text-center text-gray-400">
            <p className="text-lg font-medium">Unsupported file type</p>
            <p className="text-sm opacity-75">{currentMedia.mimeType}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
        {renderMediaViewer()}
      </div>
    </div>
  );
}
