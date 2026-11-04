'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, Sparkles, Play, Pause, RotateCcw, Volume2, Music } from 'lucide-react';
import { AudioMetadata } from '@/types/music';
import { soundEngine } from '@/lib/audio/soundEngine';

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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setAudioUrl(url);
      onAudioUploaded({
        fileName: file.name,
        fileSize: file.size,
        format: file.name.split('.').pop()?.toUpperCase() || 'AUDIO',
        duration: 194,
        bpm: 124,
        keySignature: 'C Minor',
        timeSignature: [4, 4],
        url,
      });
    }
  };

  const handleLoadDemo = () => {
    const demoMeta: AudioMetadata = {
      fileName: 'khmer_romantic_ballad_demo.mp3',
      fileSize: 4210000,
      format: 'MP3',
      duration: 180,
      bpm: 124,
      keySignature: 'C Minor',
      timeSignature: [4, 4],
    };
    setSelectedFile(new File([''], 'khmer_romantic_ballad_demo.mp3'));
    onAudioUploaded(demoMeta);
  };

  const toggleAudioPlay = () => {
    if (audioRef.current && audioUrl) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    } else {
      // Demo synth play
      setIsPlayingAudio(!isPlayingAudio);
      if (!isPlayingAudio) {
        soundEngine.playNote('C4', 'piano', 0.8, 0.9);
        setTimeout(() => soundEngine.playNote('E4', 'piano', 0.8, 0.9), 300);
        setTimeout(() => soundEngine.playNote('G4', 'piano', 0.8, 0.9), 600);
      }
    }
  };

  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-5 md:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-purple-400" />
            Audio to MIDI Converter & Stem Separator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload MP3, WAV, FLAC, or OGG to isolate accompaniment tracks for Yamaha PSR-S970.
          </p>
        </div>

        <button
          onClick={handleLoadDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#151a28] hover:bg-[#1d2538] text-purple-300 border border-purple-500/30 transition-all shadow"
        >
          <Music className="w-3.5 h-3.5" />
          <span>Load Demo Song</span>
        </button>
      </div>

      {/* Hidden audio element if real audio uploaded */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlayingAudio(false)}
          className="hidden"
        />
      )}

      {/* Drop Zone */}
      <div className="border-2 border-dashed border-[#242d44] hover:border-purple-500/50 transition-colors rounded-xl p-6 md:p-8 flex flex-col items-center justify-center bg-[#090b12]/60 cursor-pointer relative group text-center">
        <input
          type="file"
          accept="audio/mp3,audio/wav,audio/flac,audio/ogg"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          <FileAudio className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
        </div>
        <p className="text-xs md:text-sm font-medium text-slate-200">
          {selectedFile ? selectedFile.name : 'Drag & drop song file here, or click to browse'}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          Supports MP3, WAV, FLAC, OGG (Stereo 44.1kHz / 48kHz)
        </p>
      </div>

      {/* Audio Waveform & Player Controls */}
      {selectedFile && (
        <div className="p-4 rounded-xl bg-[#121624] border border-[#20293f] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudioPlay}
                className={`p-2 rounded-lg font-bold text-white transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-950'
                    : 'bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-950'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div>
                <span className="font-semibold text-slate-200 block truncate max-w-xs">
                  {selectedFile.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isPlayingAudio ? 'Playing preview...' : 'Ready to playback'} • 124 BPM • C Minor
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-purple-400 font-semibold block">
                {isAnalyzing ? `Analyzing: ${analysisProgress}%` : 'Separation Ready'}
              </span>
            </div>
          </div>

          {/* Animated Waveform Visualization */}
          <div className="h-12 bg-[#090b12] rounded-lg p-2 flex items-center justify-between gap-1 border border-[#1a2134] overflow-hidden">
            {[40, 65, 30, 85, 95, 45, 60, 75, 90, 50, 70, 80, 45, 90, 60, 35, 75, 85, 40, 60, 95, 80, 55, 70, 85, 40, 65, 90, 50, 75, 60, 40].map(
              (height, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlayingAudio
                      ? 'bg-gradient-to-t from-purple-500 to-blue-400 animate-pulse'
                      : 'bg-slate-700/60'
                  }`}
                  style={{ height: isPlayingAudio ? `${height}%` : '25%' }}
                />
              )
            )}
          </div>

          {/* Progress bar during analysis */}
          {isAnalyzing && (
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button
              disabled={isAnalyzing}
              onClick={onStartAnalysis}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-950 disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Extracting 8 MIDI Tracks...' : 'Start AI Analysis & Separation'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
