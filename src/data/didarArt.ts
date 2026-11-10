export const DIDAR_ART_TITLES = ['假期', '迷路', '流星', '暧昧'] as const;
export type DidarArtTitle = typeof DIDAR_ART_TITLES[number];
export const DIDAR_PHOTOS = Array.from({ length: 6 }, (_, i) => `/assets/didar/photo-${String(i + 1).padStart(2, '0')}.jpg`);
export const DIDAR_DIRECTORY_PHOTO = DIDAR_PHOTOS[3];
export const DIDAR_HOLIDAY_PHOTO = DIDAR_PHOTOS[2];
export const DIDAR_VERSES = {
  假期: ['随时准备旅程结束', 'lalilala～～～', '我爱上过你。'],
  迷路: ['黃像雨後黃昏', '藍像世上男人', '攜同著前塵一起遠行', '紅燈', '綠燈', '紅燈'],
  流星: ['我在海角', '你卻在天邊', '兩顆註定一起出現的星星', '遙遙呼應', '卻永遠走不近', '我和你在暗中互相輝映'],
  暧昧: ['眉目裡似哭不似哭', '還祈求甚麼說不出', '陪著你輕呼著煙圈', '到唇邊 講不出滿足', '你的溫柔怎可以捕捉', '越來越近 卻不接觸', 'La……', '茶沒有喝光早變酸', '從來未熱戀已相戀', '陪著你天天在兜圈', '那纏繞 怎麼可算短', '你的衣裳今天我在穿', '未留住你 卻仍然溫暖', '徘徊在似苦又甜之間', '望不穿這暖昧的眼', '愛或情借來填一晚', '終須都歸還 無謂多貪', '猶疑在似即若離之間', '望不穿這暖昧的眼', '似是濃卻仍然很淡', '天早灰藍 想告別 偏未晚']
} satisfies Record<DidarArtTitle, string[]>;
