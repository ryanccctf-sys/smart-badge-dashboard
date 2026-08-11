import React, { useState, useEffect } from 'react';
import { Brand, DashboardStats } from '../types';
import { Award, MapPin, Store, BadgeCheck, Users, TrendingUp } from 'lucide-react';

interface TopKpiCardsProps {
  stats: DashboardStats;
  selectedBrand: Brand;
}

export const TopKpiCards: React.FC<TopKpiCardsProps> = ({ stats, selectedBrand }) => {
  const isFiltered = selectedBrand.id !== 'all';

  // Calculate numbers scaled by brand selection
  const brandsCount = isFiltered ? 1 : stats.cooperativeBrands;
  const provincesCount = isFiltered ? selectedBrand.coveredProvincesCount : stats.coveredProvinces;
  const storesCount = isFiltered ? selectedBrand.totalStores : stats.coveredStores;
  const badgesCount = isFiltered ? selectedBrand.totalBadges : stats.deployedBadges;
  const activeUsersCount = isFiltered ? selectedBrand.activeUsers : stats.todayActiveUsers;

  // Animated rolling state simulation
  const [animatedStores, setAnimatedStores] = useState(storesCount);
  const [animatedBadges, setAnimatedBadges] = useState(badgesCount);
  const [animatedUsers, setAnimatedUsers] = useState(activeUsersCount);

  useEffect(() => {
    setAnimatedStores(storesCount);
    setAnimatedBadges(badgesCount);
    setAnimatedUsers(activeUsersCount);
  }, [selectedBrand, storesCount, badgesCount, activeUsersCount]);

  const cards = [
    {
      title: '合作品牌',
      value: brandsCount,
      unit: '个',
      subtext: isFiltered ? `当前选定：${selectedBrand.name}` : '涵盖豪华/自主/新能源',
      icon: Award,
      color: 'from-amber-500/20 to-orange-600/30 text-amber-400 border-amber-500/30',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    },
    {
      title: '覆盖省份',
      value: provincesCount,
      unit: '省/市',
      subtext: '全国28省自治区直辖市覆盖',
      icon: MapPin,
      color: 'from-blue-500/20 to-indigo-600/30 text-blue-400 border-blue-500/30',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    },
    {
      title: '覆盖门店',
      value: animatedStores.toLocaleString(),
      unit: '家',
      subtext: '全国汽车4S店及品牌体验中心',
      icon: Store,
      color: 'from-cyan-500/20 to-teal-600/30 text-cyan-400 border-cyan-500/30',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    },
    {
      title: '部署工牌',
      value: animatedBadges.toLocaleString(),
      unit: '台',
      subtext: '一线销售顾问全天候佩戴',
      icon: BadgeCheck,
      color: 'from-purple-500/20 to-indigo-600/30 text-purple-400 border-purple-500/30',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    },
    {
      title: '今日活跃用户',
      value: animatedUsers.toLocaleString(),
      unit: '人',
      subtext: '实时沟通在线顾问',
      icon: Users,
      color: 'from-emerald-500/20 to-teal-600/30 text-emerald-400 border-emerald-500/30',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
      {cards.map((c, idx) => {
        const IconComponent = c.icon;
        return (
          <div
            key={idx}
            className={`relative p-3.5 rounded-2xl bg-slate-950/70 border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${c.color} ${c.glow}`}
          >
            {/* Header Line */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-medium text-slate-300">{c.title}</span>
              <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Main Numeric Display */}
            <div className="flex items-baseline space-x-1.5 my-1">
              <span className="text-2xl lg:text-3xl font-black text-white tracking-tight font-mono glow-text-cyan">
                {c.value}
              </span>
              <span className="text-xs font-bold text-slate-400">{c.unit}</span>
            </div>

            {/* Subtext */}
            <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800/60 pt-1.5 mt-1.5">
              <span className="truncate">{c.subtext}</span>
              <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0 ml-1" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
