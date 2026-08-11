import React, { useState, useEffect, useMemo } from 'react';
import * as d3Geo from 'd3-geo';
import chinaGeoJsonRaw from '../data/chinaGeoJson.json';
import { CITY_NODES, PROVINCES_DATA } from '../data/mockData';
import { ProvinceData, Brand } from '../types';
import { Activity, Mic, Cpu, Radio, Building2, Users, Layers, Sparkles } from 'lucide-react';

interface ChinaMapProps {
  selectedBrand: Brand;
  onSelectProvince: (prov: ProvinceData) => void;
  onlineBadges: number;
  activeConversations: number;
  todaySessions: number;
  totalAudioHours: number;
}

const geoData = chinaGeoJsonRaw as any;

// Helper to calculate exact visual centroid of a feature geometry
function calculateCentroid(feature: any, proj: d3Geo.GeoProjection): [number, number] {
  let totalLng = 0, totalLat = 0, count = 0;
  function traverse(coords: any) {
    if (typeof coords[0] === 'number') {
      totalLng += coords[0];
      totalLat += coords[1];
      count++;
    } else if (Array.isArray(coords)) {
      coords.forEach(traverse);
    }
  }
  traverse(feature.geometry.coordinates);
  if (count === 0) return [500, 400];
  const projected = proj([totalLng / count, totalLat / count]);
  return projected || [500, 400];
}

// Shorten official full name to 2-3 characters
function getShortName(fullName: string): string {
  if (!fullName) return '';
  if (fullName.startsWith('内蒙古')) return '内蒙古';
  if (fullName.startsWith('黑龙江')) return '黑龙江';
  if (fullName.startsWith('香港')) return '香港';
  if (fullName.startsWith('澳门')) return '澳门';
  if (fullName.startsWith('新疆')) return '新疆';
  if (fullName.startsWith('西藏')) return '西藏';
  if (fullName.startsWith('广西')) return '广西';
  if (fullName.startsWith('宁夏')) return '宁夏';
  return fullName.substring(0, 2);
}

export const ChinaMap: React.FC<ChinaMapProps> = ({
  selectedBrand,
  onSelectProvince,
  onlineBadges,
  activeConversations,
  todaySessions,
  totalAudioHours,
}) => {
  const [mapTheme, setMapTheme] = useState<'cyber' | 'techNavy'>('cyber');
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeBubble, setActiveBubble] = useState<{ cityId: string; text: string } | null>({
    cityId: 'shanghai',
    text: '上海 · 当前在线 186台工牌',
  });

  // Cycle real-time usage speech bubbles across major cities
  useEffect(() => {
    const bubbleTexts = [
      '当前在线 186台工牌',
      '今日会话 1,286条',
      '正在进行AI语音转写',
      '提炼VOC热点：冬季续航',
      '识别到高意向增换购客户',
      '生成优秀谈判标杆案例',
      '实时音轨采集分析中',
      '置换补贴政策高频询问',
    ];

    const timer = setInterval(() => {
      const randomCity = CITY_NODES[Math.floor(Math.random() * CITY_NODES.length)];
      const randomText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
      setActiveBubble({ cityId: randomCity.id, text: `${randomCity.name} · ${randomText}` });
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  // Set up d3 Mercator projection specifically for China
  const { projection, pathGenerator } = useMemo(() => {
    const proj = d3Geo
      .geoMercator()
      .center([104.0, 36.5])
      .scale(880)
      .translate([500, 420]);

    const pathGen = d3Geo.geoPath().projection(proj);
    return { projection: proj, pathGenerator: pathGen };
  }, []);

  // Pre-calculate features with paths, centroids, and metadata (Excluding 100000_JD sea box)
  const { featureList, seaBoundaryFeature } = useMemo(() => {
    const validFeatures: any[] = [];
    let seaFeat: any = null;

    geoData.features.forEach((feature: any, idx: number) => {
      if (feature.properties.adcode === '100000_JD') {
        seaFeat = {
          id: 'sea-jd',
          path: pathGenerator(feature) || '',
        };
        return;
      }

      const name = feature.properties.name || '';
      const shortName = getShortName(name);
      const path = pathGenerator(feature) || '';
      const centroid = calculateCentroid(feature, projection);

      const provData = PROVINCES_DATA.find(
        (p) =>
          p.name === name ||
          p.name.startsWith(shortName) ||
          name.startsWith(p.name.slice(0, 2))
      );

      validFeatures.push({
        id: feature.id || `feat-${idx}`,
        fullName: name,
        shortName,
        path,
        centroid,
        provData,
      });
    });

    return { featureList: validFeatures, seaBoundaryFeature: seaFeat };
  }, [pathGenerator, projection]);

  const getProvinceDataByName = (name: string): ProvinceData | undefined => {
    return PROVINCES_DATA.find(
      (p) => p.name === name || p.name.startsWith(name.slice(0, 2))
    );
  };

  const handleProvinceMouseMove = (e: React.MouseEvent, provData?: ProvinceData, fullName?: string) => {
    const targetProv = provData || (fullName ? getProvinceDataByName(fullName) : undefined);
    if (targetProv) {
      setHoveredProvince(targetProv);
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

  // Province Fill Color Palette
  const getProvinceFill = (prov?: ProvinceData, isHovered?: boolean) => {
    if (isHovered) return mapTheme === 'cyber' ? '#06b6d4' : '#38bdf8';

    if (!prov) return mapTheme === 'cyber' ? '#0f172a' : '#1e293b';

    if (mapTheme === 'cyber') {
      switch (prov.densityLevel) {
        case 'high':
          return '#0284c7'; // Cyan 600
        case 'medium':
          return '#0369a1'; // Sky 700
        case 'low':
        default:
          return '#0f172a'; // Dark Slate 900
      }
    } else {
      // Tech Navy Mode
      switch (prov.densityLevel) {
        case 'high':
          return '#2563eb'; // Blue 600
        case 'medium':
          return '#1d4ed8'; // Blue 700
        case 'low':
        default:
          return '#1e293b'; // Slate 800
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-md p-4 transition-all duration-300 overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2 gap-2 flex-wrap">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-wide flex items-center gap-2 text-slate-100">
              全国工牌实时网络地图
              <span className="text-xs px-2.5 py-0.5 rounded-full border bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-medium">
                {selectedBrand.name} 视角
              </span>
            </h2>
            <p className="text-xs text-slate-400">100% 真实地理行政边界与分布式智能节点网格</p>
          </div>
        </div>

        {/* Theme Switcher Buttons */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg text-xs font-medium border border-slate-800">
            <button
              onClick={() => setMapTheme('cyber')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                mapTheme === 'cyber'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              赛博黑青
            </button>
            <button
              onClick={() => setMapTheme('techNavy')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                mapTheme === 'techNavy'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              科技深蓝
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative flex-1 w-full min-h-[480px] flex items-center justify-center bg-slate-950/60 rounded-xl overflow-hidden border border-slate-900">
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full max-h-[560px] drop-shadow-2xl transition-all duration-500 select-none"
        >
          <defs>
            {/* Tech Grid Pattern */}
            <pattern id="map-tech-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeOpacity="0.4" />
            </pattern>

            <filter id="city-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="province-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="800" fill="url(#map-tech-grid)" />

          {/* Optional Sea Boundary (Nine-dash Line Dashed Strokes) */}
          {seaBoundaryFeature && (
            <path
              d={seaBoundaryFeature.path}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          )}

          {/* Render Provinces with Clear Outlines & High-Tech Fills */}
          <g className="provinces-layer" filter="url(#province-glow)">
            {featureList.map((item) => {
              const isHovered = hoveredProvince?.name === item.provData?.name;
              const fill = getProvinceFill(item.provData, isHovered);

              return (
                <path
                  key={item.id}
                  d={item.path}
                  fill={fill}
                  stroke={
                    isHovered
                      ? '#ffffff'
                      : mapTheme === 'cyber'
                      ? '#38bdf8'
                      : '#60a5fa'
                  }
                  strokeWidth={isHovered ? '2' : '1.2'}
                  strokeLinejoin="round"
                  strokeOpacity={isHovered ? '1' : '0.85'}
                  className="cursor-pointer transition-all duration-150 hover:brightness-125"
                  onMouseMove={(e) => handleProvinceMouseMove(e, item.provData, item.fullName)}
                  onMouseLeave={handleProvinceMouseLeave}
                  onClick={() => item.provData && onSelectProvince(item.provData)}
                />
              );
            })}
          </g>

          {/* Render Province Text Labels */}
          <g className="province-labels-layer pointer-events-none">
            {featureList.map((item) => {
              if (!item.shortName || !item.centroid) return null;
              const [cx, cy] = item.centroid;

              // Fine-tuning offsets for tiny provinces so text doesn't overlap
              let labelX = cx;
              let labelY = cy;

              if (item.shortName === '北京') { labelX = cx - 2; labelY = cy - 2; }
              if (item.shortName === '天津') { labelX = cx + 8; labelY = cy + 8; }
              if (item.shortName === '上海') { labelX = cx + 12; labelY = cy + 4; }
              if (item.shortName === '香港') { labelX = cx + 10; labelY = cy + 12; }
              if (item.shortName === '澳门') { labelX = cx - 12; labelY = cy + 14; }

              return (
                <text
                  key={`label-${item.id}`}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#f8fafc"
                  fontSize={
                    ['新疆', '西藏', '内蒙古', '黑龙江', '青海', '四川'].includes(item.shortName)
                      ? '13'
                      : '11'
                  }
                  fontWeight="bold"
                  className="font-sans tracking-tight select-none"
                  style={{
                    textShadow: '0px 1px 4px rgba(0, 0, 0, 0.95), 0px 0px 2px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {item.shortName}
                </text>
              );
            })}
          </g>

          {/* Render City Nodes */}
          <g className="city-nodes-layer">
            {CITY_NODES.map((city) => {
              if (!city.lat || !city.lng) return null;
              const [px, py] = projection([city.lng, city.lat]) || [0, 0];
              if (px === 0 && py === 0) return null;

              const isHotspot = city.isHotspot;

              return (
                <g
                  key={city.id}
                  transform={`translate(${px}, ${py})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    const pData = getProvinceDataByName(city.provinceName);
                    if (pData) onSelectProvince(pData);
                  }}
                >
                  {/* Outer Pulsing Ring */}
                  {isHotspot && (
                    <circle
                      r="10"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.5"
                      className="animate-ping opacity-75 origin-center"
                    />
                  )}

                  {/* City Marker Point */}
                  <circle
                    r={isHotspot ? '5' : '3.5'}
                    fill={isHotspot ? '#ef4444' : '#06b6d4'}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    filter="url(#city-glow)"
                    className="transition-transform group-hover:scale-150"
                  />

                  {/* Active Speech Bubble */}
                  {activeBubble?.cityId === city.id && (
                    <g transform="translate(-65, -34)" className="animate-bounce">
                      <rect
                        x="0"
                        y="0"
                        width="130"
                        height="22"
                        rx="11"
                        fill="#030712"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        className="shadow-2xl"
                      />
                      <text
                        x="65"
                        y="14"
                        textAnchor="middle"
                        fill="#22d3ee"
                        fontSize="9.5"
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

          {/* Inset Box: South China Sea Islands (南海诸岛) */}
          <g transform="translate(840, 580)" className="south-china-sea-inset">
            <rect
              x="0"
              y="0"
              width="135"
              height="180"
              fill="#090d16"
              fillOpacity="0.9"
              stroke="#334155"
              strokeWidth="1"
              rx="8"
            />
            <text
              x="67.5"
              y="18"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10.5"
              fontWeight="bold"
            >
              南海诸岛
            </text>

            {/* Nine-Dash Line graphic */}
            <g stroke="#0284c7" strokeWidth="1.5" fill="none">
              <path d="M 30 35 Q 40 45 35 55" strokeDasharray="3 2" />
              <path d="M 60 50 Q 75 60 70 85" strokeDasharray="3 2" />
              <path d="M 90 60 Q 105 80 100 120" strokeDasharray="3 2" />
              <path d="M 45 100 Q 55 125 50 145" strokeDasharray="3 2" />
            </g>

            <circle cx="50" cy="70" r="2" fill="#ef4444" />
            <circle cx="80" cy="95" r="2" fill="#ef4444" />
            <circle cx="65" cy="130" r="2" fill="#ef4444" />
          </g>
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredProvince && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-75 text-xs rounded-xl p-3 shadow-2xl backdrop-blur-md min-w-[210px] bg-slate-900/95 text-white border border-cyan-500/50"
            style={{
              left: Math.min(hoverPos.x + 15, 620),
              top: Math.min(hoverPos.y + 15, 420),
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
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

            <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>主要品牌: {hoveredProvince.brands.slice(0, 3).join(', ')}</span>
              <span className="text-cyan-400 font-semibold underline">点击明细</span>
            </div>
          </div>
        )}
      </div>

      {/* Realtime Live Status Floating Overlay Widget (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-20 border border-slate-800/80 rounded-xl p-3 backdrop-blur-md max-w-xs shadow-xl hidden sm:block bg-slate-900/90 text-white">
        <div className="flex items-center justify-between border-b pb-2 mb-2 border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-200">智能工牌实时数据流</span>
          </div>

          <div className="flex items-end space-x-1 h-3.5 px-1 bg-slate-950 rounded border border-slate-800">
            <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-1" />
            <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-2" />
            <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-3" />
            <span className="w-1 bg-cyan-400 rounded-full animate-audio-bar-4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-1.5 rounded-lg border bg-slate-950/60 border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" /> 在线工牌
            </div>
            <div className="text-xs font-black text-cyan-300 mt-0.5">
              {Math.round(onlineBadges * brandScale).toLocaleString()}
            </div>
          </div>

          <div className="p-1.5 rounded-lg border bg-slate-950/60 border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" /> 实时会话
            </div>
            <div className="text-xs font-black text-emerald-400 mt-0.5">
              {Math.round(activeConversations * brandScale).toLocaleString()}
            </div>
          </div>

          <div className="p-1.5 rounded-lg border bg-slate-950/60 border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Mic className="w-3 h-3 text-amber-400" /> 今日会话
            </div>
            <div className="text-xs font-black text-amber-300 mt-0.5">
              {Math.round(todaySessions * brandScale).toLocaleString()}
            </div>
          </div>

          <div className="p-1.5 rounded-lg border bg-slate-950/60 border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" /> 录音时长
            </div>
            <div className="text-xs font-black text-purple-300 mt-0.5">
              {Math.round(totalAudioHours * brandScale).toLocaleString()}h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
