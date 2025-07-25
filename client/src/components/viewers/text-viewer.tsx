import { useState, useEffect } from "react";
import { MediaFile } from "@shared/schema";
import { Underline } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface TextViewerProps {
  file: MediaFile;
}

export default function TextViewer({ file }: TextViewerProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(file.url);
        if (!response.ok) {
          throw new Error('Failed to fetch file content');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [file.url]);

  const isMarkdown = file.mimeType === 'text/markdown' || file.originalName.endsWith('.md');

  if (isLoading) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center text-red-600">
          <Underline className="w-12 h-12 mx-auto mb-4" />
          <p className="font-medium">Failed to load document</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      {/* Document Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Underline className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">{file.originalName}</span>
          <span className="text-sm text-gray-500">
            ({isMarkdown ? 'Markdown' : 'Text'})
          </span>
        </div>
      </div>

      {/* Document Content */}
      <div className="p-6 h-full overflow-auto">
        {isMarkdown ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
