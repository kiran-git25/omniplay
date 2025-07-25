import { useState, useRef, useEffect } from "react";
import { MediaFile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  PlayIcon, 
  PauseIcon, 
  AudioWaveform,
  ForwardIcon,
  SkipBack
} from "lucide-react";
import { formatDuration } from "@/lib/file-utils";

interface AudioPlayerProps {
  file: MediaFile;
}

export default function AudioPlayer({ file }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [file.url]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
      <audio ref={audioRef} src={file.url} preload="metadata" />
      
      {/* Album Art Placeholder */}
      <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <PlayIcon className="w-8 h-8 fill-current" />
          </div>
          <p className="text-xs opacity-75">Audio</p>
        </div>
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-1">{file.originalName}</h3>
        <p className="text-sm opacity-75">{file.mimeType}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-4">
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs mt-2 opacity-75">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 mb-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <SkipBack className="w-5 h-5 fill-current" />
        </Button>
        
        <Button 
          onClick={togglePlayPause}
          className="w-12 h-12 bg-primary hover:bg-blue-700 text-white rounded-full"
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 fill-current" />
          ) : (
            <PlayIcon className="w-6 h-6 fill-current" />
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <ForwardIcon className="w-5 h-5 fill-current" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <AudioWaveform className="w-4 h-4" />
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-20"
        />
      </div>
    </div>
  );
}
