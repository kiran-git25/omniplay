import { useState } from "react";
import { MediaFile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon, SquareArrowOutUpLeft } from "lucide-react";

interface ImageViewerProps {
  file: MediaFile;
}

export default function ImageViewer({ file }: ImageViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleFitToScreen = () => {
    setZoom(100);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <img
        src={file.url}
        alt={file.originalName}
        className="max-w-full max-h-full object-contain transition-transform duration-200"
        style={{ transform: `scale(${zoom / 100})` }}
      />

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Button
          onClick={handleZoomOut}
          variant="secondary"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ZoomOutIcon className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={handleFitToScreen}
          variant="secondary"
          size="sm"
          className="bg-black/50 text-white hover:bg-black/70"
        >
          {zoom}%
        </Button>
        
        <Button
          onClick={handleZoomIn}
          variant="secondary"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ZoomInIcon className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={() => setIsFullscreen(!isFullscreen)}
          variant="secondary"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <SquareArrowOutUpLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm font-medium">{file.originalName}</p>
        <p className="text-xs opacity-75">{file.mimeType}</p>
      </div>
    </div>
  );
}
