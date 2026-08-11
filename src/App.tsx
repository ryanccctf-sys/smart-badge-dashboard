import React, { useState, useEffect } from 'react';
import { Brand, ProvinceData, DashboardStats } from './types';
import { AUTO_BRANDS, INITIAL_STATS } from './data/mockData';
import { Header } from './components/Header';
import { TopKpiCards } from './components/TopKpiCards';
import { LeftSection } from './components/LeftSection';
import { ChinaMap } from './components/ChinaMap';
import { RightSection } from './components/RightSection';
import { RealtimeStream } from './components/RealtimeStream';
import { ProvinceDetailModal } from './components/ProvinceDetailModal';

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(AUTO_BRANDS[0]);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Dynamic real-time numeric incremental tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        todayTotalSessions: prev.todayTotalSessions + Math.floor(Math.random() * 3) + 1,
        activeConversations: Math.max(
          1800,
          Math.min(3000, prev.activeConversations + (Math.random() > 0.5 ? 2 : -2))
        ),
        totalAudioHours: prev.totalAudioHours + 1,
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen w-full tech-bg text-slate-100 p-3 md:p-5 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Background Subtle Tech Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/80 to-slate-950 pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-[1920px] mx-auto flex flex-col flex-1 space-y-3">
        {/* Header Bar */}
        <Header
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />

        {/* Top 5 Primary KPI Cards */}
        <TopKpiCards stats={stats} selectedBrand={selectedBrand} />

        {/* Core 3-Column Visual Layout (Left Scale + Center China Map + Right AI & VOC) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[560px]">
          {/* Left Column: Scale & Coverage (3 cols / 25%) */}
          <div className="lg:col-span-3 h-full">
            <LeftSection
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
            />
          </div>

          {/* Center Column: China Map (6 cols / 50% - Visual Core) */}
          <div className="lg:col-span-6 h-full min-h-[500px]">
            <ChinaMap
              selectedBrand={selectedBrand}
              onSelectProvince={setSelectedProvince}
              onlineBadges={stats.onlineBadges}
              activeConversations={stats.activeConversations}
              todaySessions={stats.todayTotalSessions}
              totalAudioHours={stats.totalAudioHours}
            />
          </div>

          {/* Right Column: AI & VOC Value Showcase (3 cols / 25%) */}
          <div className="lg:col-span-3 h-full">
            <RightSection selectedBrand={selectedBrand} />
          </div>
        </div>

        {/* Bottom Full-Width Section: Realtime Stream */}
        <RealtimeStream />
      </div>

      {/* Province Detail Modal */}
      <ProvinceDetailModal
        province={selectedProvince}
        onClose={() => setSelectedProvince(null)}
      />
    </div>
  );
}
