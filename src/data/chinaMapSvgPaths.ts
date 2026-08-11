// Detailed Geo Projection SVG Paths for China Map (viewBox 0 0 1000 800)
export interface ChinaPath {
  id: string;
  name: string;
  path: string;
  center: [number, number]; // [x, y] center for label/hover positioning
}

export const CHINA_MAP_PATHS: ChinaPath[] = [
  {
    id: 'xinjiang',
    name: '新疆维吾尔自治区',
    center: [230, 220],
    path: 'M 100 120 L 220 80 L 320 140 L 330 250 L 290 320 L 220 330 L 160 300 L 110 210 Z',
  },
  {
    id: 'tibet',
    name: '西藏自治区',
    center: [260, 430],
    path: 'M 110 320 L 220 340 L 330 330 L 410 390 L 380 480 L 310 500 L 210 490 L 140 430 Z',
  },
  {
    id: 'qinghai',
    name: '青海省',
    center: [380, 330],
    path: 'M 290 310 L 370 260 L 460 290 L 480 360 L 420 400 L 330 380 Z',
  },
  {
    id: 'gansu',
    name: '甘肃省',
    center: [460, 310],
    path: 'M 350 250 L 420 180 L 480 230 L 520 320 L 480 370 L 440 330 L 370 260 Z',
  },
  {
    id: 'inner_mongolia',
    name: '内蒙古自治区',
    center: [610, 210],
    path: 'M 410 180 L 530 110 L 680 120 L 800 100 L 840 180 L 740 220 L 670 210 L 550 240 L 470 220 Z',
  },
  {
    id: 'heilongjiang',
    name: '黑龙江省',
    center: [880, 140],
    path: 'M 800 100 L 890 50 L 960 90 L 950 180 L 870 210 L 820 160 Z',
  },
  {
    id: 'jilin',
    name: '吉林省',
    center: [870, 210],
    path: 'M 830 180 L 910 190 L 900 240 L 830 250 L 810 220 Z',
  },
  {
    id: 'liaoning',
    name: '辽宁省',
    center: [810, 260],
    path: 'M 790 220 L 840 230 L 840 280 L 790 290 L 770 250 Z',
  },
  {
    id: 'hebei',
    name: '河北省',
    center: [710, 290],
    path: 'M 680 230 L 750 220 L 770 290 L 740 350 L 680 330 L 670 280 Z',
  },
  {
    id: 'beijing',
    name: '北京市',
    center: [720, 280],
    path: 'M 708 270 L 732 270 L 735 292 L 710 292 Z',
  },
  {
    id: 'tianjin',
    name: '天津市',
    center: [742, 300],
    path: 'M 735 293 L 750 293 L 752 308 L 737 308 Z',
  },
  {
    id: 'shanxi',
    name: '山西省',
    center: [650, 310],
    path: 'M 630 260 L 680 250 L 670 350 L 630 360 Z',
  },
  {
    id: 'shaanxi',
    name: '陕西省',
    center: [590, 380],
    path: 'M 570 300 L 630 290 L 620 440 L 560 450 L 560 380 Z',
  },
  {
    id: 'ningxia',
    name: '宁夏回族自治区',
    center: [550, 310],
    path: 'M 530 290 L 560 280 L 560 330 L 535 340 Z',
  },
  {
    id: 'shandong',
    name: '山东省',
    center: [750, 350],
    path: 'M 710 320 L 810 310 L 820 370 L 730 380 Z',
  },
  {
    id: 'henan',
    name: '河南省',
    center: [670, 400],
    path: 'M 620 360 L 720 350 L 710 440 L 620 430 Z',
  },
  {
    id: 'jiangsu',
    name: '江苏省',
    center: [790, 440],
    path: 'M 730 380 L 820 370 L 835 470 L 760 480 Z',
  },
  {
    id: 'anhui',
    name: '安徽省',
    center: [730, 460],
    path: 'M 700 420 L 760 410 L 760 510 L 690 500 Z',
  },
  {
    id: 'shanghai',
    name: '上海市',
    center: [830, 480],
    path: 'M 822 470 L 840 470 L 842 490 L 824 490 Z',
  },
  {
    id: 'zhejiang',
    name: '浙江省',
    center: [800, 520],
    path: 'M 760 480 L 835 480 L 820 570 L 760 560 Z',
  },
  {
    id: 'jiangxi',
    name: '江西省',
    center: [720, 550],
    path: 'M 680 500 L 750 490 L 740 600 L 680 590 Z',
  },
  {
    id: 'fujian',
    name: '福建省',
    center: [780, 580],
    path: 'M 740 540 L 810 530 L 800 630 L 740 610 Z',
  },
  {
    id: 'hubei',
    name: '湖北省',
    center: [660, 480],
    path: 'M 600 440 L 710 430 L 700 510 L 590 500 Z',
  },
  {
    id: 'hunan',
    name: '湖南省',
    center: [650, 560],
    path: 'M 600 500 L 690 500 L 680 610 L 590 600 Z',
  },
  {
    id: 'guangdong',
    name: '广东省',
    center: [700, 640],
    path: 'M 620 600 L 750 590 L 760 670 L 640 680 Z',
  },
  {
    id: 'guangxi',
    name: '广西壮族自治区',
    center: [590, 640],
    path: 'M 520 590 L 630 580 L 630 680 L 520 670 Z',
  },
  {
    id: 'hainan',
    name: '海南省',
    center: [650, 740],
    path: 'M 630 720 L 670 720 L 670 760 L 630 760 Z',
  },
  {
    id: 'sichuan',
    name: '四川省',
    center: [490, 490],
    path: 'M 410 420 L 550 400 L 550 540 L 420 560 Z',
  },
  {
    id: 'chongqing',
    name: '重庆市',
    center: [570, 510],
    path: 'M 545 470 L 590 460 L 590 540 L 545 530 Z',
  },
  {
    id: 'guizhou',
    name: '贵州省',
    center: [530, 580],
    path: 'M 480 540 L 580 530 L 570 610 L 480 600 Z',
  },
  {
    id: 'yunnan',
    name: '云南省',
    center: [450, 610],
    path: 'M 380 550 L 490 540 L 480 680 L 370 650 Z',
  },
  {
    id: 'taiwan',
    name: '台湾省',
    center: [840, 610],
    path: 'M 825 580 L 850 580 L 855 640 L 830 640 Z',
  }
];
