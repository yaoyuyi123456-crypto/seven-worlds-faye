import React from 'react';
import { Disc3, Volume2, VolumeX } from 'lucide-react';
import { fayeAudio } from '../utils/audioSynthesizer';

interface NavbarProps {
  activeTab: string;
  transparent?: boolean;
  setActiveTab: (tab: string) => void;
  currentTrack: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  transparent = false,
  setActiveTab,
  currentTrack,
  isPlaying,
  onTogglePlay
}) => {
  const [vinylNoise, setVinylNoise] = React.useState(true);

  const navItems = [
    { id: 'home', label: 'HOME', title: '音乐展览' },
    { id: 'lyrics', label: 'LYRICS LAB', title: '意象实验' },
    { id: 'ai', label: 'FAYE AI', title: '文化导览' },
  ];

  const handleToggleVinyl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !vinylNoise;
    setVinylNoise(next);
    fayeAudio.toggleVinyl(next);
  };

  return (
    <header className={`sticky top-0 z-50 ${transparent ? 'bg-transparent border-white/25' : 'bg-[#0b0c0e]/90 backdrop-blur-md border-zinc-800/80'} border-b px-6 py-3.5 transition-colors`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand mark */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-editorial text-lg md:text-xl font-bold tracking-widest text-zinc-100 group-hover:text-[#d4f43b] transition-colors whitespace-nowrap">
            FAYE / 王菲
          </span>
          <span className="ml-2.5 font-mono-code text-[10px] tracking-wider text-zinc-400 uppercase hidden sm:inline">
            ARCHIVE 1990—2026
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-code">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b ${
                  isActive
                    ? 'text-[#d4f43b] border-[#d4f43b] font-medium'
                    : 'text-zinc-400 hover:text-zinc-100 border-transparent'
                }`}
              >
                <span>{item.label}</span>
                <span className="ml-1.5 text-[10px] text-zinc-500 font-sans">({item.title})</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile dropdown / button menu */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-[11px] font-mono-code whitespace-nowrap transition-colors rounded-sm ${
                activeTab === item.id
                  ? 'bg-zinc-800 text-[#d4f43b] font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Zone 3: 1 primary action - Audio Console */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Vinyl crackle toggle */}
          <button
            onClick={handleToggleVinyl}
            title={vinylNoise ? '黑胶胶片噪点：已开启' : '黑胶胶片噪点：已静音'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-code border transition-colors ${
              vinylNoise 
                ? 'border-zinc-700 text-zinc-300 hover:border-[#d4f43b] hover:text-[#d4f43b]' 
                : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
            <span>VINYL NOISE</span>
          </button>

          {/* Master Sound Button */}
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono-code font-medium rounded-sm border transition-all ${
              isPlaying
                ? 'bg-[#d4f43b] text-black border-[#d4f43b] shadow-[0_0_15px_rgba(212,244,59,0.3)]'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="truncate max-w-[110px]">{currentTrack || 'AMBIENT PLAY'}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span>背景音乐 ♫</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
