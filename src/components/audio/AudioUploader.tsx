'use client';

import React, { useState } from 'react';
import { UploadCloud, FileAudio, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { AudioMetadata } from '@/types/music';

interface AudioUploaderProps {
  onAudioUploaded: (metadata: AudioMetadata) => void;
  isAnalyzing: boolean;
  analysisProgress: number;
  onStartAnalysis: () => void;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({
  onAudioUploaded,
  isAnalyzing,
  analysisProgress,
  onStartAnalysis,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onAudioUploaded({
        fileName: file.name,
        fileSize: file.size,
        format: file.name.split('.').pop()?.toUpperCase() || 'AUDIO',
        duration: 194, // demo audio seconds
        bpm: 124,
        keySignature: 'C Minor',
        timeSignature: [4, 4],
      });
    }
  };

  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-purple-400" />
            Audio to MIDI Converter
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload MP3, WAV, FLAC, or OGG to isolate stems and extract polyphonic MIDI notes.
          </p>
        </div>
      </div>

      {/* Drop Zone */}
      <div className="border-2 border-dashed border-[#242d44] hover:border-purple-500/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center bg-[#090b12]/60 cursor-pointer relative group">
        <input
          type="file"
          accept="audio/mp3,audio/wav,audio/flac,audio/ogg"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          <FileAudio className="w-7 h-7 text-purple-400" />
        </div>
        <p className="text-sm font-medium text-slate-200">
          {selectedFile ? selectedFile.name : 'Drag & drop your song audio file here'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Supports MP3, WAV, FLAC, OGG up to 50MB
        </p>
      </div>

      {/* Analysis action and progress */}
      {selectedFile && (
        <div className="mt-5 p-4 rounded-xl bg-[#121624] border border-[#20293f] flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">AI Separation Engine (Demucs + MT3)</span>
            <span className="text-purple-400 font-semibold">{isAnalyzing ? `${analysisProgress}%` : 'Ready to Analyze'}</span>
          </div>

          {isAnalyzing && (
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-1">
            <button
              disabled={isAnalyzing}
              onClick={onStartAnalysis}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-950 disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Extracting MIDI Tracks...' : 'Start AI Analysis & Separation'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
