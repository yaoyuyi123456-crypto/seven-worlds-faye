export const JIANGAI_PHOTOS = [
  '/assets/jiangai/photo-01.jpg',
  '/assets/jiangai/photo-02.jpg',
  '/assets/jiangai/photo-03.jpg',
  '/assets/jiangai/photo-04.jpg'
] as const;

export const JIANGAI_SONG_IDS = ['passenger_jiangai', 'buliu_jiangai', 'yangbao_jiangai'] as const;
export const JIANGAI_FIXED_PHOTOS = {
  passenger_jiangai: JIANGAI_PHOTOS[0],
  buliu_jiangai: JIANGAI_PHOTOS[0],
  yangbao_jiangai: JIANGAI_PHOTOS[2]
} as const;
