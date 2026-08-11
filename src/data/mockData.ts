import { Brand, CityNode, ProvinceData, RegionalRank, VOCItem, AIInsight, RealtimeEvent, DashboardStats } from '../types';

export const INITIAL_STATS: DashboardStats = {
  cooperativeBrands: 18,
  coveredProvinces: 28,
  coveredStores: 1286,
  deployedBadges: 12680,
  todayActiveUsers: 8426,
  
  onlineBadges: 8426,
  activeConversations: 2368,
  todayTotalSessions: 32685,
  totalAudioHours: 18625,
  aiQueueTasks: 2126,
};

export const AUTO_BRANDS: Brand[] = [
  { id: 'all', name: '全部品牌', category: '全量', totalStores: 1286, totalBadges: 12680, coveredProvincesCount: 28, activeUsers: 8426, todaySessions: 32685 },
  { id: 'galaxy', name: '银河汽车', category: '新能源', totalStores: 368, totalBadges: 3268, coveredProvincesCount: 23, activeUsers: 2186, todaySessions: 8265, featuredModel: '银河E5/L7' },
  { id: 'byd', name: '比亚迪', category: '新能源', totalStores: 245, totalBadges: 2420, coveredProvincesCount: 26, activeUsers: 1650, todaySessions: 6420, featuredModel: '秦L/宋L' },
  { id: 'benz', name: '奔驰', category: '豪华', totalStores: 112, totalBadges: 1180, coveredProvincesCount: 18, activeUsers: 780, todaySessions: 2890, featuredModel: '全新E级' },
  { id: 'bmw', name: '宝马', category: '豪华', totalStores: 105, totalBadges: 1060, coveredProvincesCount: 17, activeUsers: 690, todaySessions: 2650, featuredModel: '新5系' },
  { id: 'audi', name: '奥迪', category: '豪华', totalStores: 98, totalBadges: 980, coveredProvincesCount: 16, activeUsers: 620, todaySessions: 2410, featuredModel: 'A6L' },
  { id: 'geely', name: '吉利汽车', category: '自主', totalStores: 88, totalBadges: 890, coveredProvincesCount: 20, activeUsers: 580, todaySessions: 2150 },
  { id: 'lynk', name: '领克', category: '自主', totalStores: 76, totalBadges: 720, coveredProvincesCount: 15, activeUsers: 490, todaySessions: 1820 },
  { id: 'chery', name: '奇瑞', category: '自主', totalStores: 65, totalBadges: 610, coveredProvincesCount: 14, activeUsers: 410, todaySessions: 1580 },
  { id: 'jetour', name: '捷途', category: '自主', totalStores: 52, totalBadges: 480, coveredProvincesCount: 12, activeUsers: 320, todaySessions: 1240 },
  { id: 'vw', name: '大众', category: '合资', totalStores: 42, totalBadges: 410, coveredProvincesCount: 12, activeUsers: 290, todaySessions: 1100 },
  { id: 'toyota', name: '丰田', category: '合资', totalStores: 38, totalBadges: 360, coveredProvincesCount: 10, activeUsers: 240, todaySessions: 920 },
  { id: 'honda', name: '本田', category: '合资', totalStores: 35, totalBadges: 320, coveredProvincesCount: 9, activeUsers: 210, todaySessions: 810 },
  { id: 'aito', name: '问界', category: '新能源', totalStores: 28, totalBadges: 280, coveredProvincesCount: 8, activeUsers: 190, todaySessions: 730 },
  { id: 'li', name: '理想汽车', category: '新能源', totalStores: 24, totalBadges: 240, coveredProvincesCount: 8, activeUsers: 160, todaySessions: 620 },
  { id: 'nio', name: '蔚来', category: '新能源', totalStores: 22, totalBadges: 210, coveredProvincesCount: 7, activeUsers: 140, todaySessions: 540 },
  { id: 'xpeng', name: '小鹏', category: '新能源', totalStores: 19, totalBadges: 180, coveredProvincesCount: 6, activeUsers: 120, todaySessions: 460 },
  { id: 'zeekr', name: '极氪', category: '新能源', totalStores: 18, totalBadges: 170, coveredProvincesCount: 6, activeUsers: 110, todaySessions: 420 },
];

export const REGIONAL_RANKS: RegionalRank[] = [
  { region: '华东区域', stores: 386, badges: 3826, percentage: 30 },
  { region: '华南区域', stores: 268, badges: 2645, percentage: 21 },
  { region: '华北区域', stores: 205, badges: 1986, percentage: 16 },
  { region: '西南区域', stores: 156, badges: 1320, percentage: 12 },
  { region: '华中区域', stores: 128, badges: 986, percentage: 10 },
  { region: '西北/东北', stores: 143, badges: 1917, percentage: 11 },
];

export const CITY_NODES: CityNode[] = [
  { id: 'shanghai', name: '上海', provinceName: '上海市', stores: 82, activeUsers: 648, todaySessions: 2860, x: 825, y: 495, isHotspot: true },
  { id: 'beijing', name: '北京', provinceName: '北京市', stores: 78, activeUsers: 590, todaySessions: 2540, x: 720, y: 310, isHotspot: true },
  { id: 'guangzhou', name: '广州', provinceName: '广东省', stores: 56, activeUsers: 430, todaySessions: 1860, x: 715, y: 645, isHotspot: true },
  { id: 'shenzhen', name: '深圳', provinceName: '广东省', stores: 62, activeUsers: 510, todaySessions: 2120, x: 728, y: 658, isHotspot: true },
  { id: 'hangzhou', name: '杭州', provinceName: '浙江省', stores: 51, activeUsers: 410, todaySessions: 1780, x: 810, y: 520, isHotspot: true },
  { id: 'chengdu', name: '成都', provinceName: '四川省', stores: 43, activeUsers: 350, todaySessions: 1520, x: 525, y: 505, isHotspot: true },
  { id: 'wuhan', name: '武汉', provinceName: '湖北省', stores: 39, activeUsers: 310, todaySessions: 1340, x: 690, y: 490 },
  { id: 'chongqing', name: '重庆', provinceName: '重庆市', stores: 37, activeUsers: 290, todaySessions: 1280, x: 565, y: 535 },
  { id: 'xian', name: '西安', provinceName: '陕西省', stores: 32, activeUsers: 250, todaySessions: 1090, x: 590, y: 420 },
  { id: 'zhengzhou', name: '郑州', provinceName: '河南省', stores: 31, activeUsers: 240, todaySessions: 1020, x: 680, y: 415 },
  { id: 'changsha', name: '长沙', provinceName: '湖南省', stores: 28, activeUsers: 220, todaySessions: 940, x: 680, y: 560 },
  { id: 'jinan', name: '济南', provinceName: '山东省', stores: 26, activeUsers: 200, todaySessions: 880, x: 730, y: 370 },
  { id: 'qingdao', name: '青岛', provinceName: '山东省', stores: 25, activeUsers: 190, todaySessions: 830, x: 780, y: 365 },
  { id: 'suzhou', name: '苏州', provinceName: '江苏省', stores: 44, activeUsers: 360, todaySessions: 1610, x: 818, y: 488 },
  { id: 'nanjing', name: '南京', provinceName: '江苏省', stores: 36, activeUsers: 280, todaySessions: 1220, x: 780, y: 470 },
];

export const INITIAL_VOC_ITEMS: VOCItem[] = [
  { id: '1', tag: '价格优惠', count: 1286, category: '价格', trend: 'up' },
  { id: '2', tag: '续航焦虑', count: 986, category: '续航', isNewHotspot: true, trend: 'up' },
  { id: '3', tag: '智能驾驶', count: 826, category: '智驾', trend: 'up' },
  { id: '4', tag: '空间表现', count: 685, category: '空间', trend: 'stable' },
  { id: '5', tag: '置换政策', count: 562, category: '服务', isNewHotspot: true, trend: 'up' },
  { id: '6', tag: '充电速度', count: 436, category: '续航', trend: 'up' },
  { id: '7', tag: '内饰体验', count: 386, category: '体验', trend: 'stable' },
  { id: '8', tag: '保养成本', count: 320, category: '服务', trend: 'down' },
  { id: '9', tag: '智能座舱', count: 295, category: '智驾', trend: 'up' },
  { id: '10', tag: '贷款利率', count: 260, category: '价格', trend: 'stable' },
];

export const AI_INSIGHT_TICKER: AIInsight[] = [
  { id: 'i1', tag: '智驾偏好', text: '华东区域客户对“智能驾驶”的关注度较昨日提升 18%', timestamp: '10分钟前', region: '华东' },
  { id: 'i2', tag: '冬季续航', text: '银河E5客户近期高频关注“冬季实测续航表现”', timestamp: '5分钟前', region: '全国' },
  { id: 'i3', tag: '补贴利好', text: '广州区域“以旧换新置换补贴”成为今日TOP1客户咨询话题', timestamp: '3分钟前', region: '华南' },
  { id: 'i4', tag: '试驾转化', text: '数据表明：深度试驾后客户成交意向度比未试驾高出 42%', timestamp: '8分钟前', region: '全国' },
  { id: 'i5', tag: '充电效率', text: '新能源车型客户对“800V超充5分钟续航”关切度提升 25%', timestamp: '2分钟前', region: '华中' },
  { id: 'i6', tag: '话术合规', text: '华北区域销售顾问对质保政策与智驾功能标准介绍率达成 94%', timestamp: '1分钟前', region: '华北' },
];

export const STREAM_EVENTS_POOL: Omit<RealtimeEvent, 'id' | 'timestamp'>[] = [
  { city: '上海', brandName: '银河汽车', storeName: '浦东体验中心', actionType: '客户接待', aiRecognition: '需求分析：关注纯电续航与智能座舱', highlightTag: 'A级意向' },
  { city: '广州', brandName: '比亚迪', storeName: '天河旗舰店', actionType: '试乘试驾', aiRecognition: '试驾场景：体验高阶智驾自动泊车', highlightTag: '试驾完成' },
  { city: '成都', brandName: '奔驰', storeName: '锦江4S店', actionType: 'VOC产生', aiRecognition: '客户评价：“比较关注冬季续航与置换补贴”', highlightTag: 'VOC采集' },
  { city: '杭州', brandName: '吉利汽车', storeName: '西湖体验店', actionType: '意向识别', aiRecognition: 'AI评估：高意向买家，已预约二次试驾', highlightTag: '高意向' },
  { city: '武汉', brandName: '领克', storeName: '光谷旗舰店', actionType: '优秀案例', aiRecognition: '生成优秀对话案例：异议处理技巧示范', highlightTag: '优秀标杆' },
  { city: '北京', brandName: '宝马', storeName: '朝阳4S店', actionType: '客户接待', aiRecognition: '竞品对比：重点对比新能源车型充电速率', highlightTag: '竞品对比' },
  { city: '深圳', brandName: '奥迪', storeName: '南山展示中心', actionType: '试乘试驾', aiRecognition: '提问挖掘：客户对底盘质感及保值率高度认可', highlightTag: '满意度高' },
  { city: '西安', brandName: '奇瑞', storeName: '雁塔体验店', actionType: 'VOC产生', aiRecognition: '客户询问：“置换补贴与金融免息是否可同享”', highlightTag: '金融质询' },
  { city: '南京', brandName: '银河汽车', storeName: '建邺中心店', actionType: '意向识别', aiRecognition: '判定意向：锁定首选车色与选装包配置', highlightTag: '配置锁定' },
  { city: '郑州', brandName: '捷途', storeName: '郑东旗舰店', actionType: '客户接待', aiRecognition: '沟通分析：重点关注户外越野与大空间拉货需求', highlightTag: '用途明确' },
];

// Province details with Geo SVG Data & exact metrics
export const PROVINCES_DATA: ProvinceData[] = [
  {
    id: 'guangdong', name: '广东省', code: 'GD', stores: 186, badges: 1826, activeUsers: 1286, todaySessions: 4286, coveredBrandsCount: 16, densityLevel: 'high',
    brands: ['银河汽车', '比亚迪', '奔驰', '宝马', '奥迪', '广汽大众', '领克'],
    cities: [
      { name: '广州', stores: 56, badges: 540, activeUsers: 430, todaySessions: 1860 },
      { name: '深圳', stores: 62, badges: 610, activeUsers: 510, todaySessions: 2120 },
      { name: '佛山', stores: 28, badges: 260, activeUsers: 140, todaySessions: 480 },
      { name: '东莞', stores: 24, badges: 230, activeUsers: 126, todaySessions: 410 },
      { name: '珠海', stores: 16, badges: 186, activeUsers: 80, todaySessions: 216 },
    ]
  },
  {
    id: 'jiangsu', name: '江苏省', code: 'JS', stores: 162, badges: 1680, activeUsers: 1120, todaySessions: 3890, coveredBrandsCount: 15, densityLevel: 'high',
    brands: ['银河汽车', '比亚迪', '奔驰', '宝马', '奥迪', '吉利'],
    cities: [
      { name: '南京', stores: 36, badges: 380, activeUsers: 280, todaySessions: 1220 },
      { name: '苏州', stores: 44, badges: 460, activeUsers: 360, todaySessions: 1610 },
      { name: '无锡', stores: 28, badges: 290, activeUsers: 180, todaySessions: 520 },
      { name: '常州', stores: 22, badges: 230, activeUsers: 130, todaySessions: 320 },
      { name: '南通', stores: 18, badges: 180, activeUsers: 100, todaySessions: 220 },
    ]
  },
  {
    id: 'zhejiang', name: '浙江省', code: 'ZJ', stores: 158, badges: 1620, activeUsers: 1080, todaySessions: 3750, coveredBrandsCount: 16, densityLevel: 'high',
    brands: ['银河汽车', '吉利', '领克', '奔驰', '宝马', '极氪'],
    cities: [
      { name: '杭州', stores: 51, badges: 530, activeUsers: 410, todaySessions: 1780 },
      { name: '宁波', stores: 38, badges: 400, activeUsers: 280, todaySessions: 890 },
      { name: '温州', stores: 26, badges: 270, activeUsers: 160, todaySessions: 480 },
      { name: '嘉兴', stores: 22, badges: 220, activeUsers: 120, todaySessions: 360 },
      { name: '金华', stores: 21, badges: 200, activeUsers: 110, todaySessions: 240 },
    ]
  },
  {
    id: 'shandong', name: '山东省', code: 'SD', stores: 124, badges: 1180, activeUsers: 790, todaySessions: 2950, coveredBrandsCount: 14, densityLevel: 'high',
    brands: ['比亚迪', '大众', '奇瑞', '吉利', '奔驰', '奥迪'],
    cities: [
      { name: '济南', stores: 26, badges: 260, activeUsers: 200, todaySessions: 880 },
      { name: '青岛', stores: 25, badges: 250, activeUsers: 190, todaySessions: 830 },
      { name: '潍坊', stores: 22, badges: 210, activeUsers: 130, todaySessions: 420 },
      { name: '烟台', stores: 18, badges: 170, activeUsers: 110, todaySessions: 310 },
      { name: '临沂', stores: 19, badges: 180, activeUsers: 110, todaySessions: 310 },
    ]
  },
  {
    id: 'sichuan', name: '四川省', code: 'SC', stores: 98, badges: 920, activeUsers: 610, todaySessions: 2150, coveredBrandsCount: 13, densityLevel: 'medium',
    brands: ['银河汽车', '比亚迪', '丰田', '本田', '奇瑞'],
    cities: [
      { name: '成都', stores: 43, badges: 420, activeUsers: 350, todaySessions: 1520 },
      { name: '绵阳', stores: 16, badges: 140, activeUsers: 80, todaySessions: 210 },
      { name: '德阳', stores: 12, badges: 110, activeUsers: 60, todaySessions: 160 },
      { name: '宜宾', stores: 14, badges: 120, activeUsers: 65, todaySessions: 140 },
    ]
  },
  {
    id: 'henan', name: '河南省', code: 'HA', stores: 88, badges: 810, activeUsers: 530, todaySessions: 1890, coveredBrandsCount: 12, densityLevel: 'medium',
    brands: ['比亚迪', '奇瑞', '大众', '捷途', '吉利'],
    cities: [
      { name: '郑州', stores: 31, badges: 300, activeUsers: 240, todaySessions: 1020 },
      { name: '洛阳', stores: 18, badges: 160, activeUsers: 95, todaySessions: 320 },
      { name: '新乡', stores: 14, badges: 120, activeUsers: 70, todaySessions: 220 },
      { name: '南阳', stores: 15, badges: 130, activeUsers: 75, todaySessions: 210 },
    ]
  },
  {
    id: 'hubei', name: '湖北省', code: 'HB', stores: 76, badges: 710, activeUsers: 480, todaySessions: 1680, coveredBrandsCount: 12, densityLevel: 'medium',
    brands: ['东风本田', '银河汽车', '比亚迪', '奥迪', '奔驰'],
    cities: [
      { name: '武汉', stores: 39, badges: 380, activeUsers: 310, todaySessions: 1340 },
      { name: '襄阳', stores: 15, badges: 130, activeUsers: 70, todaySessions: 160 },
      { name: '宜昌', stores: 12, badges: 110, activeUsers: 60, todaySessions: 120 },
    ]
  },
  {
    id: 'hunan', name: '湖南省', code: 'HN', stores: 68, badges: 640, activeUsers: 420, todaySessions: 1420, coveredBrandsCount: 11, densityLevel: 'medium',
    brands: ['比亚迪', '吉利', '银河汽车', '大众'],
    cities: [
      { name: '长沙', stores: 28, badges: 290, activeUsers: 220, todaySessions: 940 },
      { name: '株洲', stores: 12, badges: 110, activeUsers: 60, todaySessions: 180 },
      { name: '湘潭', stores: 10, badges: 90, activeUsers: 50, todaySessions: 120 },
    ]
  },
  {
    id: 'shanghai', name: '上海市', code: 'SH', stores: 82, badges: 890, activeUsers: 648, todaySessions: 2860, coveredBrandsCount: 18, densityLevel: 'high',
    brands: ['全品牌覆盖'],
    cities: [
      { name: '浦东新区', stores: 28, badges: 310, activeUsers: 220, todaySessions: 980 },
      { name: '闵行区', stores: 18, badges: 190, activeUsers: 140, todaySessions: 610 },
      { name: '嘉定区', stores: 15, badges: 160, activeUsers: 110, todaySessions: 490 },
      { name: '静安区', stores: 12, badges: 130, activeUsers: 90, todaySessions: 420 },
    ]
  },
  {
    id: 'beijing', name: '北京市', code: 'BJ', stores: 78, badges: 820, activeUsers: 590, todaySessions: 2540, coveredBrandsCount: 18, densityLevel: 'high',
    brands: ['全品牌覆盖'],
    cities: [
      { name: '朝阳区', stores: 24, badges: 260, activeUsers: 190, todaySessions: 860 },
      { name: '海淀区', stores: 18, badges: 190, activeUsers: 140, todaySessions: 620 },
      { name: '丰台区', stores: 14, badges: 140, activeUsers: 100, todaySessions: 430 },
      { name: '昌平区', stores: 12, badges: 120, activeUsers: 80, todaySessions: 320 },
    ]
  },
  {
    id: 'chongqing', name: '重庆市', code: 'CQ', stores: 52, badges: 510, activeUsers: 340, todaySessions: 1380, coveredBrandsCount: 12, densityLevel: 'medium',
    brands: ['问界', '长安', '银河汽车', '比亚迪'],
    cities: [
      { name: '渝北区', stores: 18, badges: 180, activeUsers: 120, todaySessions: 520 },
      { name: '九龙坡', stores: 14, badges: 130, activeUsers: 90, todaySessions: 360 },
      { name: '江北区', stores: 12, badges: 110, activeUsers: 80, todaySessions: 310 },
    ]
  },
  {
    id: 'shaanxi', name: '陕西省', code: 'SN', stores: 58, badges: 540, activeUsers: 360, todaySessions: 1320, coveredBrandsCount: 11, densityLevel: 'medium',
    brands: ['比亚迪', '吉利', '奥迪', '大众'],
    cities: [
      { name: '西安', stores: 32, badges: 310, activeUsers: 250, todaySessions: 1090 },
      { name: '咸阳', stores: 12, badges: 100, activeUsers: 55, todaySessions: 120 },
      { name: '宝鸡', stores: 8, badges: 70, activeUsers: 35, todaySessions: 70 },
    ]
  },
  {
    id: 'fujian', name: '福建省', code: 'FJ', stores: 62, badges: 590, activeUsers: 380, todaySessions: 1460, coveredBrandsCount: 12, densityLevel: 'medium',
    brands: ['奔驰', '宝马', '比亚迪', '银河汽车'],
    cities: [
      { name: '福州', stores: 22, badges: 210, activeUsers: 140, todaySessions: 540 },
      { name: '厦门', stores: 24, badges: 230, activeUsers: 160, todaySessions: 620 },
      { name: '泉州', stores: 16, badges: 150, activeUsers: 80, todaySessions: 300 },
    ]
  },
  {
    id: 'anhui', name: '安徽省', code: 'AH', stores: 64, badges: 580, activeUsers: 370, todaySessions: 1390, coveredBrandsCount: 12, densityLevel: 'medium',
    brands: ['奇瑞', '捷途', '比亚迪', '大众'],
    cities: [
      { name: '合肥', stores: 28, badges: 270, activeUsers: 180, todaySessions: 720 },
      { name: '芜湖', stores: 18, badges: 160, activeUsers: 100, todaySessions: 380 },
    ]
  },
  {
    id: 'hebei', name: '河北省', code: 'HE', stores: 55, badges: 490, activeUsers: 310, todaySessions: 1150, coveredBrandsCount: 10, densityLevel: 'low',
    brands: ['长城', '比亚迪', '大众'],
    cities: [
      { name: '石家庄', stores: 22, badges: 200, activeUsers: 130, todaySessions: 480 },
      { name: '保定', stores: 18, badges: 160, activeUsers: 100, todaySessions: 380 },
    ]
  },
  {
    id: 'liaoning', name: '辽宁省', code: 'LN', stores: 48, badges: 430, activeUsers: 270, todaySessions: 980, coveredBrandsCount: 10, densityLevel: 'low',
    brands: ['宝马', '奥迪', '比亚迪'],
    cities: [
      { name: '沈阳', stores: 22, badges: 200, activeUsers: 130, todaySessions: 480 },
      { name: '大连', stores: 18, badges: 160, activeUsers: 100, todaySessions: 360 },
    ]
  },
  {
    id: 'yunnan', name: '云南省', code: 'YN', stores: 38, badges: 320, activeUsers: 190, todaySessions: 690, coveredBrandsCount: 8, densityLevel: 'low',
    brands: ['比亚迪', '丰田', '本田'],
    cities: [
      { name: '昆明', stores: 22, badges: 190, activeUsers: 120, todaySessions: 430 },
    ]
  },
  {
    id: 'guangxi', name: '广西壮族自治区', code: 'GX', stores: 42, badges: 360, activeUsers: 220, todaySessions: 780, coveredBrandsCount: 8, densityLevel: 'low',
    brands: ['上汽通用五菱', '比亚迪', '吉利'],
    cities: [
      { name: '南宁', stores: 20, badges: 180, activeUsers: 110, todaySessions: 410 },
      { name: '柳州', stores: 14, badges: 120, activeUsers: 70, todaySessions: 230 },
    ]
  },
  {
    id: 'jiangxi', name: '江西省', code: 'JX', stores: 40, badges: 340, activeUsers: 210, todaySessions: 720, coveredBrandsCount: 8, densityLevel: 'low',
    brands: ['比亚迪', '吉利', '奇瑞'],
    cities: [
      { name: '南昌', stores: 20, badges: 180, activeUsers: 110, todaySessions: 390 },
    ]
  },
  {
    id: 'heilongjiang', name: '黑龙江省', code: 'HL', stores: 28, badges: 230, activeUsers: 140, todaySessions: 480, coveredBrandsCount: 7, densityLevel: 'low',
    brands: ['大众', '奥迪', '红旗'],
    cities: [
      { name: '哈尔滨', stores: 18, badges: 150, activeUsers: 90, todaySessions: 310 },
    ]
  },
  {
    id: 'jilin', name: '吉林省', code: 'JL', stores: 25, badges: 210, activeUsers: 130, todaySessions: 420, coveredBrandsCount: 7, densityLevel: 'low',
    brands: ['红旗', '大众', '奥迪'],
    cities: [
      { name: '长春', stores: 16, badges: 130, activeUsers: 80, todaySessions: 270 },
    ]
  },
  {
    id: 'shanxi', name: '山西省', code: 'SX', stores: 32, badges: 270, activeUsers: 160, todaySessions: 540, coveredBrandsCount: 7, densityLevel: 'low',
    brands: ['比亚迪', '吉利', '奇瑞'],
    cities: [
      { name: '太原', stores: 18, badges: 150, activeUsers: 90, todaySessions: 320 },
    ]
  },
  {
    id: 'guizhou', name: '贵州省', code: 'GZ', stores: 30, badges: 250, activeUsers: 150, todaySessions: 510, coveredBrandsCount: 6, densityLevel: 'low',
    brands: ['比亚迪', '吉利'],
    cities: [
      { name: '贵阳', stores: 16, badges: 140, activeUsers: 85, todaySessions: 300 },
    ]
  },
  {
    id: 'xinjiang', name: '新疆维吾尔自治区', code: 'XJ', stores: 22, badges: 180, activeUsers: 110, todaySessions: 360, coveredBrandsCount: 5, densityLevel: 'low',
    brands: ['广汽丰田', '比亚迪'],
    cities: [
      { name: '乌鲁木齐', stores: 14, badges: 120, activeUsers: 75, todaySessions: 240 },
    ]
  },
  {
    id: 'inner_mongolia', name: '内蒙古自治区', code: 'NM', stores: 20, badges: 160, activeUsers: 95, todaySessions: 310, coveredBrandsCount: 5, densityLevel: 'low',
    brands: ['长城', '大众'],
    cities: [
      { name: '呼和浩特', stores: 12, badges: 100, activeUsers: 60, todaySessions: 190 },
    ]
  },
  {
    id: 'gansu', name: '甘肃省', code: 'GS', stores: 18, badges: 140, activeUsers: 80, todaySessions: 260, coveredBrandsCount: 5, densityLevel: 'low',
    brands: ['比亚迪', '吉利'],
    cities: [
      { name: '兰州', stores: 12, badges: 95, activeUsers: 55, todaySessions: 180 },
    ]
  },
  {
    id: 'hainan', name: '海南省', code: 'HI', stores: 18, badges: 150, activeUsers: 90, todaySessions: 290, coveredBrandsCount: 6, densityLevel: 'low',
    brands: ['新能源全覆盖'],
    cities: [
      { name: '海口', stores: 10, badges: 85, activeUsers: 50, todaySessions: 160 },
      { name: '三亚', stores: 8, badges: 65, activeUsers: 40, todaySessions: 130 },
    ]
  },
  {
    id: 'ningxia', name: '宁夏回族自治区', code: 'NX', stores: 10, badges: 80, activeUsers: 45, todaySessions: 140, coveredBrandsCount: 4, densityLevel: 'low',
    brands: ['比亚迪'],
    cities: [
      { name: '银川', stores: 8, badges: 65, activeUsers: 38, todaySessions: 110 },
    ]
  },
  {
    id: 'qinghai', name: '青海省', code: 'QH', stores: 8, badges: 60, activeUsers: 35, todaySessions: 90, coveredBrandsCount: 3, densityLevel: 'low',
    brands: ['大众'],
    cities: [
      { name: '西宁', stores: 6, badges: 45, activeUsers: 28, todaySessions: 75 },
    ]
  }
];
