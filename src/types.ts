export interface Brand {
  id: string;
  name: string;
  category: string; // e.g., "豪华", "合资", "自主", "新能源"
  totalStores: number;
  totalBadges: number;
  coveredProvincesCount: number;
  activeUsers: number;
  todaySessions: number;
  featuredModel?: string;
  logoBg?: string;
}

export interface CityNode {
  id: string;
  name: string;
  provinceName: string;
  stores: number;
  activeUsers: number;
  todaySessions: number;
  x: number; // percentage in SVG viewport (0-1000)
  y: number; // percentage in SVG viewport (0-800)
  lat?: number;
  lng?: number;
  isHotspot?: boolean;
}

export interface ProvinceData {
  id: string;
  name: string;
  code: string;
  stores: number;
  badges: number;
  activeUsers: number;
  todaySessions: number;
  coveredBrandsCount: number;
  densityLevel: 'high' | 'medium' | 'low' | 'none'; // for color map scale
  brands: string[];
  lat?: number;
  lng?: number;
  cities: {
    name: string;
    stores: number;
    badges: number;
    activeUsers: number;
    todaySessions: number;
    lat?: number;
    lng?: number;
  }[];
  svgD?: string; // Geo SVG path string
}

export interface RegionalRank {
  region: string;
  stores: number;
  badges: number;
  percentage: number;
}

export interface VOCItem {
  id: string;
  tag: string;
  count: number;
  category: '价格' | '续航' | '智驾' | '空间' | '服务' | '体验';
  isNewHotspot?: boolean;
  trend: 'up' | 'stable' | 'down';
}

export interface AIInsight {
  id: string;
  text: string;
  tag: string;
  timestamp: string;
  region?: string;
}

export interface RealtimeEvent {
  id: string;
  timestamp: string;
  city: string;
  brandName: string;
  storeName: string;
  actionType: '客户接待' | '试乘试驾' | 'VOC产生' | '意向识别' | '优秀案例';
  aiRecognition: string;
  highlightTag?: string;
}

export interface DashboardStats {
  cooperativeBrands: number;
  coveredProvinces: number;
  coveredStores: number;
  deployedBadges: number;
  todayActiveUsers: number;
  
  // Realtime badge status
  onlineBadges: number;
  activeConversations: number;
  todayTotalSessions: number;
  totalAudioHours: number;
  aiQueueTasks: number;
}
