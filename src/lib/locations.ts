export type Location = {
  id: string;
  nameZh: string;
  nameEn: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  blurb: string;
};

export const REGIONS = [
  "極地",
  "歐洲",
  "非洲與西亞",
  "亞洲",
  "大洋洲",
  "美洲",
] as const;

export const LOCATIONS: Location[] = [
  {
    id: "mcmurdo",
    nameZh: "麥克默多站",
    nameEn: "McMurdo Station",
    country: "南極洲",
    region: "極地",
    lat: -77.8419,
    lng: 166.6863,
    blurb: "南極最大的科研聚落，極夜裡的燈火像釘在冰原上的座標。",
  },
  {
    id: "reykjavik",
    nameZh: "雷克雅維克",
    nameEn: "Reykjavík",
    country: "冰島",
    region: "極地",
    lat: 64.1466,
    lng: -21.9426,
    blurb: "世界最北的首都。大西洋裂谷與極光在此交會，城市本身幾乎是一座港口。",
  },
  {
    id: "tromso",
    nameZh: "特羅姆瑟",
    nameEn: "Tromsø",
    country: "挪威",
    region: "極地",
    lat: 69.6492,
    lng: 18.9553,
    blurb: "北極圈內的門戶城市。冬夜漫長，北極光在峽灣上方緩慢開合。",
  },
  {
    id: "london",
    nameZh: "倫敦",
    nameEn: "London",
    country: "英國",
    region: "歐洲",
    lat: 51.5074,
    lng: -0.1278,
    blurb: "泰晤士河上的帝國餘韻。經線從格林威治出發，把全世界量成一張網。",
  },
  {
    id: "paris",
    nameZh: "巴黎",
    nameEn: "Paris",
    country: "法國",
    region: "歐洲",
    lat: 48.8566,
    lng: 2.3522,
    blurb: "塞納河心的島城。石橋、林蔭與博物館把時間疊成可走的層次。",
  },
  {
    id: "venice",
    nameZh: "威尼斯",
    nameEn: "Venice",
    country: "義大利",
    region: "歐洲",
    lat: 45.4408,
    lng: 12.3155,
    blurb: "建在潟湖木樁上的城市。沒有馬路，只有潮汐與倒影在巷弄裡換班。",
  },
  {
    id: "cairo",
    nameZh: "開羅",
    nameEn: "Cairo",
    country: "埃及",
    region: "非洲與西亞",
    lat: 30.0444,
    lng: 31.2357,
    blurb: "尼羅河三角洲的門戶。吉薩的三角錐在霾色裡仍舊量得出太陽的角度。",
  },
  {
    id: "cape-town",
    nameZh: "開普敦",
    nameEn: "Cape Town",
    country: "南非",
    region: "非洲與西亞",
    lat: -33.9249,
    lng: 18.4241,
    blurb: "桌山俯視兩洋交會。城市夾在峭壁與海岬之間，風是常駐的居民。",
  },
  {
    id: "petra",
    nameZh: "佩特拉",
    nameEn: "Petra",
    country: "約旦",
    region: "非洲與西亞",
    lat: 30.3285,
    lng: 35.4444,
    blurb: "從峽谷走出來的玫瑰石城。納巴泰人把岩壁鑿成門面，沙漠負責保存。",
  },
  {
    id: "dubai",
    nameZh: "杜拜",
    nameEn: "Dubai",
    country: "阿拉伯聯合大公國",
    region: "非洲與西亞",
    lat: 25.2048,
    lng: 55.2708,
    blurb: "波斯灣南岸的垂直城市。沙漠、港口與玻璃塔同時存在於同一條地平線。",
  },
  {
    id: "taipei",
    nameZh: "台北",
    nameEn: "Taipei",
    country: "台灣",
    region: "亞洲",
    lat: 25.033,
    lng: 121.5654,
    blurb: "盆地裡的島嶼首都。山、雨與夜市把一座現代城市壓成親密的尺度。",
  },
  {
    id: "kyoto",
    nameZh: "京都",
    nameEn: "Kyoto",
    country: "日本",
    region: "亞洲",
    lat: 35.0116,
    lng: 135.7681,
    blurb: "千年古都。社寺沿東山鋪開，季節比交通號誌更準時地更換城市的顏色。",
  },
  {
    id: "singapore",
    nameZh: "新加坡",
    nameEn: "Singapore",
    country: "新加坡",
    region: "亞洲",
    lat: 1.3521,
    lng: 103.8198,
    blurb: "馬六甲海峽的樞紐島。赤道氣候裡，港口、花園與金融區被規劃成同一張圖。",
  },
  {
    id: "angkor",
    nameZh: "吳哥窟",
    nameEn: "Angkor Wat",
    country: "柬埔寨",
    region: "亞洲",
    lat: 13.4125,
    lng: 103.867,
    blurb: "高棉帝國的石構宇宙。護城河圍出一座山，浮雕把神話走成走廊。",
  },
  {
    id: "sydney",
    nameZh: "雪梨",
    nameEn: "Sydney",
    country: "澳洲",
    region: "大洋洲",
    lat: -33.8688,
    lng: 151.2093,
    blurb: "港灣城市。歌劇院的殼片對著太平洋，把一條殖民海岸線變成地標。",
  },
  {
    id: "new-york",
    nameZh: "紐約",
    nameEn: "New York",
    country: "美國",
    region: "美洲",
    lat: 40.7128,
    lng: -74.006,
    blurb: "哈德遜河口的垂直群島。街道是網格，天際線是不斷重寫的草稿。",
  },
  {
    id: "machu-picchu",
    nameZh: "馬丘比丘",
    nameEn: "Machu Picchu",
    country: "秘魯",
    region: "美洲",
    lat: -13.1631,
    lng: -72.545,
    blurb: "安第斯山脊上的印加遺址。雲霧來去，石階仍對準太陽與聖谷。",
  },
  {
    id: "rio",
    nameZh: "里約熱內盧",
    nameEn: "Rio de Janeiro",
    country: "巴西",
    region: "美洲",
    lat: -22.9068,
    lng: -43.1729,
    blurb: "山海之間的城市。基督像守著海灣，沙岸把整座山脈接到大西洋。",
  },
];

export const LOCATIONS_BY_ID = Object.fromEntries(
  LOCATIONS.map((l) => [l.id, l]),
) as Record<string, Location>;

export function locationsByRegion(): { region: string; items: Location[] }[] {
  return REGIONS.map((region) => ({
    region,
    items: LOCATIONS.filter((l) => l.region === region),
  })).filter((g) => g.items.length > 0);
}
