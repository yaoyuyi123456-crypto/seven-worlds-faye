// Keep every user-provided background in upload order.
export const HOME_BACKGROUNDS = [
  '星星与蓝天',
  '白色沙发',
  '黑白短发连拍',
  '蓝色彩纸',
  '云端拍立得',
  '后台影像',
  '复古室内写真',
  '红色拼贴',
  '彩色时装拼贴',
  '街头侧影',
  '生活随拍',
  '舞台与日常拼贴'
].map((title, index) => ({
  id: `home-background-${index + 1}`,
  path: index === 11 ? '/assets/home-backgrounds/faye-12-clean.png' : `/assets/home-backgrounds/faye-${String(index + 1).padStart(2, '0')}.jpg`,
  title,
  era: '王菲 · 影像漫游',
  credit: '用户提供影像'
}));
