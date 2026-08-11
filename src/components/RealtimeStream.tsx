import React, { useState, useEffect } from 'react';
import { RealtimeEvent } from '../types';
import { STREAM_EVENTS_POOL } from '../data/mockData';
import { Radio, Activity, CheckCircle, Sparkles } from 'lucide-react';

export const RealtimeStream: React.FC = () => {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);

  // Initialize initial event list
  useEffect(() => {
    const initialList: RealtimeEvent[] = Array.from({ length: 6 }).map((_, i) => {
      const template = STREAM_EVENTS_POOL[i % STREAM_EVENTS_POOL.length];
      const time = new Date(Date.now() - i * 12000);
      const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(
        time.getMinutes()
      ).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;

      return {
        id: `init-${i}`,
        timestamp: timeStr,
        ...template,
      };
    });

    setEvents(initialList);
  }, []);

  // Dynamically push a new event every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const template =
        STREAM_EVENTS_POOL[Math.floor(Math.random() * STREAM_EVENTS_POOL.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newEvent: RealtimeEvent = {
        id: `ev-${Date.now()}`,
        timestamp: timeStr,
        ...template,
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-slate-950/80 border border-cyan-500/20 p-3 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
            全国实时动态
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Stream
            </span>
          </span>
        </div>

        <span className="text-[10px] text-slate-400">
          智能工牌实时会话采集 & AI流式识别
        </span>
      </div>

      {/* Horizontal / Grid Live Stream Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {events.slice(0, 6).map((ev, idx) => (
          <div
            key={ev.id}
            className={`p-2 rounded-xl border text-xs transition-all duration-500 flex items-center justify-between ${
              idx === 0
                ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)] animate-pulse'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2 truncate mr-2">
              <span className="font-mono text-cyan-400 font-bold text-[11px] whitespace-nowrap">
                {ev.timestamp}
              </span>
              <span className="font-bold text-slate-200 whitespace-nowrap">
                {ev.city} · {ev.storeName}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
                {ev.actionType}
              </span>
            </div>

            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <span className="text-[11px] text-slate-300 truncate max-w-[150px]">
                {ev.aiRecognition}
              </span>
              {ev.highlightTag && (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                  {ev.highlightTag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
