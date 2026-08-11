import React from 'react';
import { Brand, RegionalRank } from '../types';
import { AUTO_BRANDS, REGIONAL_RANKS } from '../data/mockData';
import { Building, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface LeftSectionProps {
  selectedBrand: Brand;
  onSelectBrand: (brand: Brand) => void;
}

export const LeftSection: React.FC<LeftSectionProps> = ({ selectedBrand, onSelectBrand }) => {
  const isBrandFiltered = selectedBrand.id !== 'all';

  return (
    <div className="flex flex-col space-y-3 h-full">
      {/* Module 1: Brand Coverage */}
      <div className="flex-1 min-h-[300px] p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md flex flex-col justify-between shadow-xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">品牌覆盖</h3>
                <p className="text-[10px] text-slate-400">覆盖18大知名主机厂与经销商集团</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-300 font-bold">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>18 个合作汽车品牌</span>
            </div>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[260px] overflow-y-auto pr-1">
            {AUTO_BRANDS.filter((b) => b.id !== 'all').map((b) => {
              const isSelected = selectedBrand.id === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBrand(b)}
                  className={`p-2 rounded-xl text-left border transition-all duration-200 group relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold truncate group-hover:text-cyan-300">
                      {b.name}
                    </span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded ${
                        b.category === '新能源'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : b.category === '豪华'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {b.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{b.totalStores}家门店</span>
                    <span className="text-cyan-400 font-medium">{b.totalBadges}台</span>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Future Vertical Industry Expansion Indicator */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            跨行业赋能平台
          </span>
          <span className="text-slate-500">规划拓展：零售 | 金融 | 地产</span>
        </div>
      </div>

      {/* Module 2: Regional TOP 5 */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">全国区域 TOP5</h3>
              <p className="text-[10px] text-slate-400">按工牌及门店部署密度分布</p>
            </div>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">华东居首 (30%)</span>
        </div>

        <div className="space-y-2.5">
          {REGIONAL_RANKS.map((item, idx) => {
            const scaleFactor = isBrandFiltered ? selectedBrand.totalStores / 1286 : 1;
            const adjustedStores = Math.round(item.stores * scaleFactor);
            const adjustedBadges = Math.round(item.badges * scaleFactor);

            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx === 0
                          ? 'bg-amber-400 text-slate-950'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-950'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-200">{item.region}</span>
                  </div>

                  <div className="text-[11px] space-x-2">
                    <span className="text-slate-400">{adjustedStores}家门店</span>
                    <span className="font-bold text-cyan-300">{adjustedBadges}台工牌</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                        : idx === 1
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${item.percentage * 2.8}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
