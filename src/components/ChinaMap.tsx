import React, { useState, useEffect } from 'react';
import { CHINA_MAP_PATHS } from '../data/chinaMapSvgPaths';
import { CITY_NODES, PROVINCES_DATA } from '../data/mockData';
import { ProvinceData, CityNode, Brand } from '../types';
import { Activity, Mic, Cpu, Radio, Sparkles, Building2, Users } from 'lucide-react';

interface ChinaMapProps {
  selectedBrand: Brand;
  onSelectProvince: (prov: ProvinceData) => void;
  onlineBadges: number;
  activeConversations: number;
  todaySessions: number;
  totalAudioHours: number;
}

export const ChinaMap: React.FC<ChinaMapProps> = ({
  selectedBrand,
  onSelectProvince,
  onlineBadges,
  activeConversations,
  todaySessions,
  totalAudioHours,
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeBubble, setActiveBubble] = useState<{ cityId: string; text: string } | null>({
    cityId: 'shanghai',
    text: '当前使用 186人',
  });

  // Cycle real-time usage bubbles across major cities
  useEffect(() => {
    const bubbleTexts = [
      '当前使用 126人',
      '今日会话 1,286条',
      '正在进行AI语音转写',
      '提炼VOC热点：冬季续航',
      '识别到高意向增换购客户',
      '生成优秀谈判标杆案例',
      '当前在线工牌 86台',
      '实时音轨采集分析中',
    ];

    const timer = setInterval(() => {
      const randomCity = CITY_NODES[Math.floor(Math.random() * CITY_NODES.length)];
      const randomText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
      setActiveBubble({ cityId: randomCity.id, text: `${randomCity.name} · ${randomText}` });
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const getProvinceDataByName = (name: string): ProvinceData | undefined => {
    return PROVINCES_DATA.find(
      (p) => p.name === name || p.name.startsWith(name.slice(0, 2))
    );
  };

  const handleProvinceMouseMove = (e: React.MouseEvent, provName: string) => {
    const pData = getProvinceDataByName(provName);
    if (pData) {
      setHoveredProvince(pData);
      const bounds = e.currentTarget.getBoundingClientRect();
      setHoverPos({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });
    }
  };

  const handleProvinceMouseLeave = () => {
    setHoveredProvince(null);
  };

  // Adjust statistics scaling when a specific brand is selected
  const isBrandFiltered = selectedBrand.id !== 'all';
  const brandScale = isBrandFiltered ? selectedBrand.totalStores / 1286 : 1;

  return (
    <div className="relative w-full h-full min-h-[520px] flex flex-col justify-between rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Background Tech Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Map Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              全国工牌实时网络地图
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-normal">
                {selectedBrand.name} 覆盖视界
              </span>
            </h2>
            <p className="text-xs text-slate-400">点击省份查看该区域城市与门店实时分布</p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center space-x-4 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            高覆盖区域
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500/80" />
            中度覆盖
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-700" />
            标准覆盖
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            实时使用热点
          </span>
        </div>
      </div>

      {/* Main Map SVG Area */}
      <div className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[400px]">
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full max-h-[580px] drop-shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500 select-none"
        >
          {/* Defs for Glow Filters and Gradients */}
          <defs>
            <filter id="glow-high" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="highGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.65" />
            </linearGradient>

            <linearGradient id="lowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Render Provinces */}
          <g className="provinces-group">
            {CHINA_MAP_PATHS.map((p) => {
              const pData = getProvinceDataByName(p.name);
              const isHigh = pData?.densityLevel === 'high';
              const isMed = pData?.densityLevel === 'medium';
              const isHovered = hoveredProvince?.name === pData?.name;

              let fillStyle = 'url(#lowGrad)';
              let strokeStyle = '#334155';
              let strokeWidth = '1';

              if (pData) {
                if (isHigh) {
                  fillStyle = 'url(#highGrad)';
                  strokeStyle = '#38bdf8';
                  strokeWidth = isHovered ? '2.5' : '1.5';
                } else if (isMed) {
                  fillStyle = 'url(#medGrad)';
                  strokeStyle = '#0284c7';
                  strokeWidth = isHovered ? '2.2' : '1.2';
                } else {
                  fillStyle = 'url(#lowGrad)';
                  strokeStyle = '#3b82f6';
                  strokeWidth = isHovered ? '2' : '1';
                }
              }

              return (
                <path
                  key={p.id}
                  d={p.path}
                  fill={isHovered ? '#0ea5e9' : fillStyle}
                  stroke={isHovered ? '#38bdf8' : strokeStyle}
                  strokeWidth={strokeWidth}
                  filter={isHigh || isHovered ? 'url(#glow-high)' : undefined}
                  className="cursor-pointer transition-all duration-200 hover:brightness-125"
                  onMouseMove={(e) => handleProvinceMouseMove(e, p.name)}
                  onMouseLeave={handleProvinceMouseLeave}
                  onClick={() => pData && onSelectProvince(pData)}
                />
              );
            })}
          </g>

          {/* City Nodes */}
          <g className="cities-group">
            {CITY_NODES.map((city) => {
              const adjustedStores = Math.max(1, Math.round(city.stores * brandScale));
              const isHotspot = city.isHotspot;

              return (
                <g
                  key={city.id}
                  transform={`translate(${city.x}, ${city.y})`}
                  className="cursor-pointer group"
                >
                  {/* Radar Ripple Animation */}
                  {isHotspot && (
                    <circle
                      r="16"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      className="animate-map-pulse origin-center"
                    />
                  )}
                  <circle
                    r="10"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1"
                    className="animate-map-pulse-slow origin-center opacity-60"
                  />

                  {/* Node Dot */}
                  <circle
                    r={isHotspot ? '5' : '3.5'}
                    fill={isHotspot ? '#38bdf8' : '#0284c7'}
                    filter="url(#node-glow)"
                    className="transition-transform group-hover:scale-150"
                  />

                  {/* City Label Badge */}
                  <g transform="translate(10, -8)">
                    <rect
                      x="0"
                      y="0"
                      width={city.name.length * 12 + (adjustedStores > 9 ? 38 : 32)}
                      height="18"
                      rx="4"
                      fill="#020617"
                      fillOpacity="0.85"
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                    <text
                      x="6"
                      y="13"
                      fill="#f8fafc"
                      fontSize="11"
                      fontWeight="600"
                      className="font-sans tracking-wide"
                    >
                      {city.name}
                    </text>
                    <text
                      x={city.name.length * 12 + 10}
                      y="13"
                      fill="#38bdf8"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {adjustedStores}店
                    </text>
                  </g>

                  {/* Dynamic Floating Live Bubble over city */}
                  {activeBubble?.cityId === city.id && (
                    <g
                      transform="translate(-50, -42)"
                      className="animate-bounce transition-all duration-300"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="140"
                        height="26"
                        rx="13"
                        fill="#030712"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        className="shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                      />
                      <text
                        x="70"
                        y="17"
                        textAnchor="middle"
                        fill="#22d3ee"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {activeBubble.text}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredProvince && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-75 text-xs bg-slate-900/95 border border-cyan-500/50 rounded-xl p-3 shadow-2xl backdrop-blur-md min-w-[200px]"
            style={{
              left: Math.min(hoverPos.x + 15, 600),
              top: Math.min(hoverPos.y + 15, 400),
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                {hoveredProvince.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {isBrandFiltered ? selectedBrand.name : '全品牌'}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">覆盖门店:</span>
                <span className="font-bold text-white">
                  {Math.round(hoveredProvince.stores * brandScale)} 家
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">部署工牌:</span>
                <span className="font-bold text-cyan-400">
                  {Math.round(hoveredProvince.badges * brandScale)} 台
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">今日活跃顾问:</span>
                <span className="font-bold text-emerald-400">
                  {Math.round(hoveredProvince.activeUsers * brandScale)} 人
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">今日采集会话:</span>
                <span className="font-bold text-amber-300">
                  {Math.round(hoveredProvince.todaySessions * brandScale).toLocaleString()} 条
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
              <span>主要品牌: {hoveredProvince.brands.slice(0, 3).join(', ')}</span>
              <span className="text-cyan-400 underline">点击查看详情</span>
            </div>
          </div>
        )}

        {/* Realtime Live Status Overlay Widget (Bottom Left of Map) */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 border border-cyan-500/30 rounded-xl p-3.5 backdrop-blur-md max-w-xs shadow-xl hidden lg:block">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-slate-200 tracking-wider">
                今日智能工牌实时状态
              </span>
            </div>

            {/* Audio Wave Bar Animation */}
            <div className="flex items-end space-x-1 h-5 px-1 bg-slate-950/60 rounded border border-slate-800">
              <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-1" />
              <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-2" />
              <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-3" />
              <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-4" />
              <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-cyan-400" /> 当前在线工牌
              </div>
              <div className="text-sm font-black text-cyan-300 mt-0.5">
                {Math.round(onlineBadges * brandScale).toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" /> 实时会话中
              </div>
              <div className="text-sm font-black text-emerald-400 mt-0.5">
                {Math.round(activeConversations * brandScale).toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Mic className="w-3 h-3 text-amber-400" /> 今日累计会话
              </div>
              <div className="text-sm font-black text-amber-300 mt-0.5">
                {Math.round(todaySessions * brandScale).toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-purple-400" /> 今日录音时长
              </div>
              <div className="text-sm font-black text-purple-300 mt-0.5">
                {Math.round(totalAudioHours * brandScale).toLocaleString()} 小时
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
