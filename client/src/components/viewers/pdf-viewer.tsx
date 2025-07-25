import { useState } from "react";
import { MediaFile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, File } from "lucide-react";

interface PdfViewerProps {
  file: MediaFile;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      {/* PDF Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <File className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">{file.originalName}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          
          <span className="text-sm px-2">
            Page {currentPage}
          </span>
          
          <Button
            onClick={() => setCurrentPage(prev => prev + 1)}
            variant="outline"
            size="sm"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <iframe
          src={`${file.url}#page=${currentPage}`}
          className="w-full h-full border border-gray-300 rounded-lg"
          title={file.originalName}
        />
      </div>
    </div>
  );
}
