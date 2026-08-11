import React from 'react';
import { ProvinceData } from '../types';
import { X, Building2, Store, Users, Mic, Award, MapPin } from 'lucide-react';

interface ProvinceDetailModalProps {
  province: ProvinceData | null;
  onClose: () => void;
}

export const ProvinceDetailModal: React.FC<ProvinceDetailModalProps> = ({ province, onClose }) => {
  if (!province) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              {province.name} · 智能工牌运营明细
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              区域编号: {province.code} | 覆盖全省主要汽车经销4S店与展厅
            </p>
          </div>
        </div>

        {/* Top 4 Key Numbers */}
        <div className="grid grid-cols-4 gap-3 mb-5 text-center">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">覆盖门店</div>
            <div className="text-xl font-black text-white mt-1">{province.stores} 家</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">部署工牌</div>
            <div className="text-xl font-black text-cyan-400 mt-1">{province.badges} 台</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">今日活跃顾问</div>
            <div className="text-xl font-black text-emerald-400 mt-1">{province.activeUsers} 人</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">今日采集会话</div>
            <div className="text-xl font-black text-amber-300 mt-1">{province.todaySessions.toLocaleString()}</div>
          </div>
        </div>

        {/* Major Cities Table */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-cyan-400" />
            省内主要城市及门店布局
          </h3>
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="p-2.5 pl-4">城市</th>
                  <th className="p-2.5">门店数量</th>
                  <th className="p-2.5">工牌部署</th>
                  <th className="p-2.5">今日活跃</th>
                  <th className="p-2.5 text-right pr-4">今日累计会话</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {province.cities.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-2.5 pl-4 font-bold text-white">{c.name}</td>
                    <td className="p-2.5">{c.stores} 家</td>
                    <td className="p-2.5 text-cyan-400 font-medium">{c.badges} 台</td>
                    <td className="p-2.5 text-emerald-400 font-medium">{c.activeUsers} 人</td>
                    <td className="p-2.5 text-right pr-4 text-amber-300 font-mono font-bold">
                      {c.todaySessions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brands in Province */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-cyan-400" />
            覆盖品牌: {province.brands.join('、')}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
          >
            返回指挥中心
          </button>
        </div>
      </div>
    </div>
  );
};
