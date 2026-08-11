import React, { useState, useEffect } from 'react';
import { Brand } from '../types';
import { AUTO_BRANDS } from '../data/mockData';
import { Maximize2, Minimize2, Cpu, Sparkles, ShieldCheck, Car, ShoppingBag, Landmark, GraduationCap, Stethoscope, Home } from 'lucide-react';

interface HeaderProps {
  selectedBrand: Brand;
  onSelectBrand: (brand: Brand) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedBrand,
  onSelectBrand,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('auto');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const industries = [
    { id: 'auto', name: '汽车零售', icon: Car, active: true },
    { id: 'retail', name: '消费零售', icon: ShoppingBag, active: false, label: '规划中' },
    { id: 'finance', name: '金融保险', icon: Landmark, active: false, label: '规划中' },
    { id: 'edu', name: '教育培训', icon: GraduationCap, active: false, label: '规划中' },
    { id: 'health', name: '医疗大健康', icon: Stethoscope, active: false, label: '规划中' },
    { id: 'realestate', name: '地产汽车', icon: Home, active: false, label: '规划中' },
  ];

  return (
    <header className="relative w-full z-30 mb-3">
      {/* Top Main Banner Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Animated Background Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-line" />

        {/* Left Title Section */}
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 text-cyan-300 shadow-inner">
            <Cpu className="w-6 h-6 animate-pulse text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-wider font-sans">
                智能工牌 · 全国实时运营态势
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <ShieldCheck className="w-3 h-3 mr-1 text-cyan-400" />
                三代AI架构
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide font-medium flex items-center gap-2 mt-0.5">
              <span>AI驱动销售现场数字化</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400/90 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 全国线下语音资产数据中台
              </span>
            </p>
          </div>
        </div>

        {/* Middle Industry Switcher Bar */}
        <div className="hidden xl:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 space-x-1">
          {industries.map((ind) => {
            const IconComponent = ind.icon;
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => ind.active && setSelectedIndustry(ind.id)}
                disabled={!ind.active}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : ind.active
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{ind.name}</span>
                {ind.label && (
                  <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-400">
                    {ind.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Info & Controls Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
              {timeString || '2026-08-11 11:26:35'}
            </div>
            <div className="flex items-center justify-end space-x-1.5 text-[11px] text-emerald-400 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>实时数据更新中</span>
            </div>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500 transition-colors shadow-lg"
            title={isFullscreen ? '退出全屏' : '全屏展示'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Brand Selection Bar */}
      <div className="mt-2.5 flex items-center space-x-2 overflow-x-auto py-1.5 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 no-scrollbar">
        <span className="text-xs text-slate-400 font-bold whitespace-nowrap flex items-center gap-1 mr-1">
          品牌筛选:
        </span>
        {AUTO_BRANDS.map((b) => {
          const isSelected = selectedBrand.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBrand(b)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {b.name}
              {b.id !== 'all' && (
                <span className={`ml-1 text-[10px] ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                  ({b.totalStores}店)
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
