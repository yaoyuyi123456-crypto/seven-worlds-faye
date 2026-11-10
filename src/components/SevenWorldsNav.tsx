import React, { useState } from 'react';
import { Compass, Sparkles, X, ChevronRight, Globe } from 'lucide-react';
import { SEVEN_WORLDS } from '../data/sevenWorlds';

interface SevenWorldsNavProps {
  currentWorldId: string | null;
  onSelectWorld: (worldId: string) => void;
  onReturnCosmos: () => void;
}

export const SevenWorldsNav: React.FC<SevenWorldsNavProps> = ({
  currentWorldId,
  onSelectWorld,
  onReturnCosmos
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Orb */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-black/90 hover:bg-black text-white border-2 border-white/20 hover:border-[#d4f43b] shadow-2xl rounded-full font-mono-code text-xs font-bold transition-all cursor-pointer backdrop-blur-md"
      >
        <Globe className="w-4 h-4 text-[#d4f43b]" />
        <span>EIGHT WORLDS // 空间星图</span>
      </button>

      {/* Expanded Modal Teleportation Sheet */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-[#0a0c10]/95 border-2 border-white/20 p-5 rounded-2xl shadow-2xl backdrop-blur-xl space-y-4 animate-fade-in text-white">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="font-mono-code text-[10px] text-[#d4f43b] uppercase tracking-widest block">
                SPACE TELEPORTATION // 八重宇宙传动
              </span>
              <h4 className="font-editorial text-lg font-bold">
                选择进入独立音乐宇宙
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Return to Cosmos */}
          <button
            onClick={() => {
              onReturnCosmos();
              setIsOpen(false);
            }}
            className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-left flex items-center justify-between font-mono-code text-xs cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#d4f43b]" />
              <span className="font-bold">返回 HOME</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {/* 7 Worlds List */}
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {[...SEVEN_WORLDS.map(w => ({ id: w.id, number: w.number, chineseTitle: w.chineseTitle, year: w.year, title: w.title, visualDirection: w.visualDirection })), {
              id: 'jiangai', number: '08', chineseTitle: '将爱', year: 2003, title: 'To Love', visualDirection: { colorPalette: { primary: '#9aac8c' } }
            }].map((w) => {
              const isActive = currentWorldId === w.id;

              return (
                <button
                  key={w.id}
                  onClick={() => {
                    onSelectWorld(w.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border-[#d4f43b] text-[#d4f43b]'
                      : 'bg-zinc-950/40 hover:bg-zinc-900 border-white/5 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: w.visualDirection.colorPalette.primary }}
                    />
                    <div className="truncate">
                      <span className="font-editorial text-sm font-bold block truncate">
                        《{w.chineseTitle}》
                      </span>
                      <span className="font-mono-code text-[10px] text-zinc-500">
                        {w.year} · {w.title}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-code text-zinc-500 shrink-0">
                    W{w.number}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
