import React, { useState, useEffect } from 'react';
import { Brand, VOCItem, AIInsight } from '../types';
import { INITIAL_VOC_ITEMS, AI_INSIGHT_TICKER } from '../data/mockData';
import { BrainCircuit, MessageSquareText, Lightbulb, Sparkles, TrendingUp, Cpu, Flame } from 'lucide-react';

interface RightSectionProps {
  selectedBrand: Brand;
}

export const RightSection: React.FC<RightSectionProps> = ({ selectedBrand }) => {
  const isFiltered = selectedBrand.id !== 'all';
  const scale = isFiltered ? selectedBrand.todaySessions / 32685 : 1;

  // Today AI Metrics
  const aiStats = {
    totalSessions: Math.round(32685 * scale),
    analyzedSessions: Math.round(30926 * scale),
    customerNeeds: Math.round(18562 * scale),
    salesEvents: Math.round(126836 * scale),
    vocIssues: Math.round(3286 * scale),
    excellentCases: Math.round(186 * scale),
  };

  // AI Insight Auto Rotation
  const [currentInsightIdx, setCurrentInsightIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsightIdx((prev) => (prev + 1) % AI_INSIGHT_TICKER.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentInsight = AI_INSIGHT_TICKER[currentInsightIdx];

  return (
    <div className="flex flex-col space-y-3 h-full">
      {/* Module 1: 今日AI分析 */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BrainCircuit className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">今日AI分析</h3>
              <p className="text-[10px] text-slate-400">AI智能语音转写与沟通事件结构化提炼</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30">
            分析率 94.6%
          </span>
        </div>

        {/* 6 Key AI Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">今日采集会话</div>
            <div className="text-base font-black text-white mt-0.5 font-mono">
              {aiStats.totalSessions.toLocaleString()}
            </div>
            <div className="text-[9px] text-cyan-400/80 mt-1 flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5" /> 100% 算法处理
            </div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">AI深度分析会话</div>
            <div className="text-base font-black text-cyan-300 mt-0.5 font-mono">
              {aiStats.analyzedSessions.toLocaleString()}
            </div>
            <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5" /> 语义转化完成
            </div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">提取客户需求</div>
            <div className="text-base font-black text-emerald-400 mt-0.5 font-mono">
              {aiStats.customerNeeds.toLocaleString()}
            </div>
            <div className="text-[9px] text-slate-400 mt-1">购车/试驾/金融</div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">识别销售关键事件</div>
            <div className="text-base font-black text-purple-300 mt-0.5 font-mono">
              {aiStats.salesEvents.toLocaleString()}
            </div>
            <div className="text-[9px] text-purple-400 mt-1">报价/竞品/试驾/异议</div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">发现VOC声量点</div>
            <div className="text-base font-black text-amber-300 mt-0.5 font-mono">
              {aiStats.vocIssues.toLocaleString()}
            </div>
            <div className="text-[9px] text-amber-400 mt-1">续航/降价/服务反馈</div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-slate-400">生成优秀案例</div>
            <div className="text-base font-black text-indigo-300 mt-0.5 font-mono">
              {aiStats.excellentCases.toLocaleString()}
            </div>
            <div className="text-[9px] text-indigo-400 mt-1">全国销冠技巧萃取</div>
          </div>
        </div>
      </div>

      {/* Module 2: 实时 VOC 客户之声 */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md shadow-xl flex-1 min-h-[220px]">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">实时 VOC</h3>
              <p className="text-[10px] text-slate-400">客户之声热点分布与关注焦点</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-amber-300 font-mono">
              今日VOC {Math.round(8626 * scale).toLocaleString()} 条
            </span>
            <div className="text-[9px] text-emerald-400 flex items-center justify-end gap-1">
              <Flame className="w-2.5 h-2.5" /> 新增 12 个热点
            </div>
          </div>
        </div>

        {/* VOC Word Cloud & Tag Heat ranking */}
        <div className="flex flex-wrap gap-1.5">
          {INITIAL_VOC_ITEMS.map((item, idx) => {
            const adjustedCount = Math.round(item.count * scale);

            return (
              <div
                key={item.id}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  idx === 0
                    ? 'bg-gradient-to-r from-amber-500/20 to-red-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : idx < 3
                    ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <span>#{item.tag}</span>
                <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-slate-950/60 font-bold">
                  {adjustedCount}
                </span>
                {item.isNewHotspot && (
                  <span className="text-[9px] px-1 rounded bg-red-500/30 text-red-300 font-bold animate-pulse">
                    HOT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module 3: AI实时洞察 */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
              <Lightbulb className="w-4 h-4 animate-bounce" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              AI 实时洞察
              <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                全国自动推送
              </span>
            </h3>
          </div>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>

        {/* Dynamic Insight Card */}
        <div className="relative min-h-[58px] flex items-center p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 shadow-inner">
          <div className="flex items-start space-x-2.5 w-full">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 whitespace-nowrap mt-0.5">
              {currentInsight.tag}
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-100 leading-relaxed">
                {currentInsight.text}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span>区域: {currentInsight.region || '全国'}</span>
                <span className="text-cyan-400 font-mono">{currentInsight.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
