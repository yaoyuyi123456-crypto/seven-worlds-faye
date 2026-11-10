/**
 * FAYE WONG · EIGHT WORLDS (王菲：八个音乐宇宙)
 * Comprehensive, verified discography and aesthetic world definitions.
 * UNOFFICIAL FAN-MADE DIGITAL ART ARCHIVE
 */

import { HOLIDAY_LYRICS, HOLIDAY_INTERPRETATION } from './holidayLyrics';
import { WINGS_LYRICS, BIBLE_LYRICS, ONE_WAY_LYRICS, RED_SHOES_LYRICS } from './faye2001Installations';
export interface TrackData {
  number: string;
  title: string;
  englishTitle?: string;
  composer: string;
  lyricist: string;
  arranger: string;
  producer?: string;
  duration?: string;
  signatureLyric: string;
  extendedLyricSnippet: string;
  artisticNote: string;
  tempoBpm: number;
  moodKeywords: string[];
  streamingUrl?: {
    appleMusic?: string;
    spotify?: string;
  };
}

export interface WorldDefinition {
  id: string;
  number: string;
  title: string;
  chineseTitle: string;
  year: number;
  releaseDate: string;
  recordLabel: string;
  coreCollaborators: string[];
  essence: string;
  visualDirection: {
    themeName: string;
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      mutedText: string;
    };
    typographyStyle: string;
    spatialAtmosphere: string;
  };
  manifesto: string;
  curatorialStatement: string;
  heroPhoto: string;
  tracks: TrackData[];
}

export const SEVEN_WORLDS: WorldDefinition[] = [
  // -------------------------------------------------------------
  // 01. CHANGYOU (唱游 / 1998)
  // 背景：唱游背景 (晒伤雀斑妆与彩虹天体 / 绿果天空)
  // -------------------------------------------------------------
  {
    id: 'changyou',
    number: '01',
    title: 'CHANGYOU / SCENIC WALK',
    chineseTitle: '唱游',
    year: 1998,
    releaseDate: '1998-10-02',
    recordLabel: '百代唱片 EMI Records',
    coreCollaborators: ['王菲', '张亚东', '林夕', '潘协庆', 'Adrian Chan', 'Cocteau Twins'],
    essence: '漫游 · 辽阔 · 天真 · 宇宙 · 晒伤 · 浩瀚',
    visualDirection: {
      themeName: 'Celestial Horizon & Prismatic Sunburn Mirage',
      colorPalette: {
        primary: '#38bdf8',
        secondary: '#ef4444',
        accent: '#f59e0b',
        background: '#040b14',
        surface: '#0c1a2d',
        text: '#f0f9ff',
        mutedText: '#7dd3fc'
      },
      typographyStyle: '星轨流线、漂浮漫游的无重力排版',
      spatialAtmosphere: '彩虹光晕、高原晒伤妆、星体轨道与无边苍穹'
    },
    manifesto: '脸上有晒伤的痕迹，眼中有整座银河。穿行在半途而废的荒原，红豆熬成缠绵，以肉身唱游九霄。',
    curatorialStatement: '1998年的《唱游》是华语流行史上的巅峰概念丰碑。阿Zing创造的“晒伤妆”与彩虹天体视觉，将王菲推向了东亚潮流文化的绝对中心。音乐上首次采用HDCD编码，张亚东与王菲构建出空灵飘渺的宇宙电子风骨，既有《脸》的大气磅礴，亦有《红豆》流传万世的诗性感喟。',
    heroPhoto: '/assets/aistudio/IMG_1634_002e42c6.JPG',
    tracks: [
      {
        number: '01',
        title: '脸',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '周广斌',
        duration: '03:34',
        signatureLyric: '不断演变那海岸线长出了最哀艳的水仙；我搁浅我却要继续冒险。',
        extendedLyricSnippet: '不断演变那海岸线长出了最哀艳的水仙；我搁浅我却要继续冒险。',
        artisticNote: '海岸线与水仙花的超现实隐喻。哥特声乐实验与流动潮汐，在搁浅的绝境中迸发出继续冒险的坚毅生命力。',
        tempoBpm: 76,
        moodKeywords: ['海岸线水仙', '搁浅与冒险', '哥特声乐', '超现实流动']
      },
      {
        number: '02',
        title: '色诫',
        composer: 'Adrian Chan',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        duration: '04:52',
        signatureLyric: '不要以为眼角眉梢只是种点缀；不要以为他的头发开不出蔷薇。',
        extendedLyricSnippet: '不要以为眼角眉梢只是种点缀 / 不要以为他的头发开不出蔷薇 / 如果你愛他 笑容和你相隨 / 胸膛把你包圍 / 他容顏都燒毀 你有沒有所謂',
        artisticNote: '007电影般冷酷管弦编排，发丝与蔷薇的先锋植物学重构。眼角眉梢绝非点缀，危险欲望在发间肆意绽放。',
        tempoBpm: 100,
        moodKeywords: ['发丝蔷薇', '眼角眉梢', '暗涌管弦', '先锋时尚']
      },
      {
        number: '03',
        title: '小聪明',
        composer: 'Robin Guthrie / Elizabeth Fraser',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '04:02',
        signatureLyric: '把泪水看成流星，不言不语都是好风景。把苍白看成水晶。故意让爱恨不太分明。',
        extendedLyricSnippet: '把泪水看成流星 / 不言不语都是好风景 / 把苍白看成水晶 / 故意让爱恨不太分明',
        artisticNote: 'Cocteau Twins 为王菲专属操刀谱写仙音。将沉重泪水解构为划破夜空的璀璨流星，最终归于无言而恒久的绝美风景。',
        tempoBpm: 84,
        moodKeywords: ['泪水流星', '静谧风景', 'Cocteau Twins', '仙音解构']
      }
    ]
  },

  // -------------------------------------------------------------
  // 02. FAYE WONG 2001 (01王菲 / 2001)
  // 背景：01王菲生日庆典背景 (彩色斜肩裙、黑漆皮长靴与草莓蛋糕)
  // -------------------------------------------------------------
  {
    id: 'faye2001',
    number: '02',
    title: 'FAYE WONG 2001 / 01 WANG FEI',
    chineseTitle: '王菲 (2001)',
    year: 2001,
    releaseDate: '2001-10-18',
    recordLabel: '百代唱片 EMI Records',
    coreCollaborators: ['王菲', '张亚东', '林夕', '伍佰', '梁基爵', '深沼元昭', 'Adrian Chan'],
    essence: '前卫 · 电子 · 繁复 · 流光 · 赤子 · 派对',
    visualDirection: {
      themeName: 'Century Prism & Electric Shimmering Glaze',
      colorPalette: {
        primary: '#f59e0b',
        secondary: '#3b82f6',
        accent: '#ec4899',
        background: '#09090b',
        surface: '#18181b',
        text: '#fdf4ff',
        mutedText: '#f472b6'
      },
      typographyStyle: '先锋错落、带有电波故障感与高级派对霓虹的字形',
      spatialAtmosphere: '派对彩色斜肩裙、黑漆皮长靴、草莓蛋糕烛光与跨世纪电子流光'
    },
    manifesto: '岁岁年年，不过是多吹灭几根蜡烛。在名利场最中心，撕开繁复霓虹，穿上彩色斜肩裙与漆皮靴，做回那个不驯的顽童。',
    curatorialStatement: '2001年同名专辑是王菲百代时期的华丽终章。云集伍佰、梁基爵、深沼元昭等前卫音乐人，《光之翼》的爆裂电子摇滚、《流年》的世纪宿命感叹、《流浪的红舞鞋》的巴洛克探戈，交织成世纪之初最具实验性与时尚张力的听觉矩阵。',
    heroPhoto: '/assets/aistudio/192_42caa072.JPG',
    tracks: [
      {
        number: '01',
        title: '光之翼',
        composer: '梁基爵 (人山人海)',
        lyricist: '林夕',
        arranger: '梁基爵',
        duration: '03:21',
        signatureLyric: '静静的按下电源开关　屏幕的色彩越来越亮',
        extendedLyricSnippet: WINGS_LYRICS,
        artisticNote: '人山人海梁基爵操刀，狂暴的工业电子节拍搭配失真电贝斯，唱出网络时代初启时的数字化狂喜与异化。',
        tempoBpm: 140,
        moodKeywords: ['数字狂喜', '爆裂电吉他', '人山人海', '工业摇滚']
      },
      {
        number: '02',
        title: '等等',
        composer: '蔡健雅',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '03:28',
        signatureLyric: '等等，再等一等；爱情如果真要发生，怎么会没有回声',
        extendedLyricSnippet: '等等 再等一等 / 谁的心跳在敲门 / 难道这漫长路程 / 真的只有我一个人 / 等等 别关上门',
        artisticNote: '蔡健雅谱曲，张亚东以极简空灵吉他铺底，王菲声线细腻如秋水。',
        tempoBpm: 88,
        moodKeywords: ['蔡健雅曲', '细腻等待', '秋水清冽']
      },
      {
        number: '03',
        title: '流年',
        composer: '陈晓娟',
        lyricist: '林夕',
        arranger: '刘宝龙',
        duration: '04:34',
        signatureLyric: '有生之年 狭路相逢 终不能幸免 手心忽然长出纠缠的曲线',
        extendedLyricSnippet: '爱上一个天使的缺点 / 用一种魔鬼的语言 / 懂事之前 情动以后 / 长不过一天 / 恨不过一念 / 懂事之前 情动以后 / 长不过一天 / 留不住 算不出 流年 / 有生之年 狭路相逢 终不能幸免 / 手心忽然长出纠缠的曲线 / 懂事之前 情动以后 / 长不过一天 / 哪怕只是一瞬间',
        artisticNote: '林夕世纪哲思名作，陈晓娟谱曲。王菲弱声叹息般的演唱将“狭路相逢、手心长线”的宿命感化作东亚流行乐不可磨灭的文化印记。',
        tempoBpm: 76,
        moodKeywords: ['世纪宿命', '狭路相逢', '陈晓娟', '宿命掌纹']
      },
      {
        number: '04',
        title: '流浪的红舞鞋',
        composer: '金武嶙',
        lyricist: '王海涛',
        arranger: '金武嶙',
        duration: '04:15',
        signatureLyric: '旋转 旋转 停不下的红舞鞋 踏碎所有现实的边界',
        extendedLyricSnippet: RED_SHOES_LYRICS,
        artisticNote: '古典巴洛克弦乐与暗黑手风琴交织的探戈迷局，王菲如同一位在刀尖上起舞的孤独女伶。',
        tempoBpm: 110,
        moodKeywords: ['暗黑探戈', '巴洛克弦乐', '手风琴', '狂热旋转']
      },
      {
        number: '05',
        title: '白痴',
        composer: '三宅一德',
        lyricist: '林夕',
        arranger: '三宅一德',
        duration: '04:30',
        signatureLyric: '不明白就不明白，做个快乐的白痴；世界太聪明，我们太愚蠢。',
        extendedLyricSnippet: '不明白 就不明白 / 听不懂 就不去猜 / 世界太聪明 / 我们太愚蠢 / 宁可做一个白痴 / 站在冷眼旁观的窗外',
        artisticNote: '日本前卫音乐家三宅一德作曲，暗涌重低音与歌剧般诡谲和声，王菲肆意冷笑的反讽绝作。',
        tempoBpm: 84,
        moodKeywords: ['反讽先锋', '三宅一德', '暗黑剧场']
      },
      {
        number: '06',
        title: '两个人的圣经',
        composer: '伍佰',
        lyricist: '林夕',
        arranger: '伍佰',
        duration: '04:22',
        signatureLyric: '我们两个人　一见如故　三言两语',
        extendedLyricSnippet: BIBLE_LYRICS,
        artisticNote: '摇滚教父伍佰与天后王菲的破壁合作，粗粝失真的摇滚吉他碰撞空灵声线，产生惊人化学反应。',
        tempoBpm: 128,
        moodKeywords: ['伍佰摇滚', '粗粝失真', '吉他轰鸣']
      },
      {
        number: '07',
        title: '单行道',
        composer: '伍佰',
        lyricist: '林夕',
        arranger: '伍佰',
        duration: '03:54',
        signatureLyric: '每个人都是单行道上的跳蚤　每个人皈依自己的宗教',
        extendedLyricSnippet: ONE_WAY_LYRICS,
        artisticNote: '伍佰招牌式的行进摇滚节奏，林夕将人生旅途比作不可逆转的单行道，王菲唱得极其洒脱冷艳。',
        tempoBpm: 116,
        moodKeywords: ['伍佰曲', '人生单行道', '洒脱绝尘']
      },
      {
        number: '08',
        title: '迷魂记',
        composer: '谢霆锋',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        duration: '04:06',
        signatureLyric: '怕什么 怕习惯了 这个人的味道 怕爱上 怕爱上了 逃不掉',
        extendedLyricSnippet: '别叫我太感激你 / 别叫我太珍惜你 / 怕什么 怕习惯了 这个人的味道 / 怕爱上 怕爱上了 逃不掉 / 难道这就是所谓迷魂记',
        artisticNote: '谢霆锋特意为王菲谱写的心声之作，缠绵入骨，林夕借歌词勾勒出沉沦于爱意中的极致软肋。',
        tempoBpm: 68,
        moodKeywords: ['谢霆锋曲', '缠绵入骨', '极度依恋']
      }
    ]
  },

  // -------------------------------------------------------------
  // 03. DI-DAR (1995)
  // 背景：Di-Dar 背景 (白色连身裙、金色拉链蝴蝶与低照度迷幻)
  // -------------------------------------------------------------
  {
    id: 'didar',
    number: '03',
    title: 'DI-DAR',
    chineseTitle: 'Di-Dar',
    year: 1995,
    releaseDate: '1995-12-22',
    recordLabel: '新艺宝唱片 Cinepoly Records',
    coreCollaborators: ['王菲', '窦唯', '林夕', 'C.Y. Kong', '梁荣骏', 'Adrian Chan'],
    essence: '幽暗 · 暧昧 · 迷幻 · 性感 · 都市 · 疏离',
    visualDirection: {
      themeName: 'Midnight Hong Kong Underground & Emerald Butterfly',
      colorPalette: {
        primary: '#10b981',
        secondary: '#064e3b',
        accent: '#facc15',
        background: '#07120e',
        surface: '#0f241c',
        text: '#ecfdf5',
        mutedText: '#6ee7b7'
      },
      typographyStyle: '幽暗低对比、隐于阴影中待探寻的字形',
      spatialAtmosphere: '低照度摄影、白色极简裙装、金属拉链蝴蝶、烟雾与深夜港岛光影'
    },
    manifesto: '不要偷看你一秒，是害怕突然会偷笑；凌乱短发蜷在旧沙发，灵魂出窍，Di-Dar 一点一滴。随时预备旅程结束，我爱上过你。',
    curatorialStatement: '1995年岁末发行的《Di-Dar》是王菲粤语时期的终极艺术绝唱。整张专辑充斥着浓郁的英伦迷幻、中东异域音阶与慵懒的Trip-Hop律动。窦唯的古怪乐器编织与林夕精妙入微的暧昧词作，将世纪末都市人的欲盖弥彰与神经质梦呓定格成无法复制的声音标本。',
    heroPhoto: '/assets/faye/faye_sky.png',
    tracks: [
      {
        number: '01',
        title: 'Di-Dar',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '窦唯',
        duration: '02:30',
        signatureLyric: '不要偷看你一秒 是害怕突然会偷笑 会突然高声呼叫 叫灵魂出窍 出窍 出窍',
        extendedLyricSnippet: '不要偷看你一秒 / 是害怕突然会偷笑 / 会自然爱过没了 / 会突然高声呼叫 / 叫灵魂出窍 出窍 出窍 / 不要听见你心跳 / 是害怕突然你醒了 / 你自然说太夜了 / 你定然必须走了 / 我突然哭了 哭了 哭了 / Di-Dar... Di-Dar... Di-Dar...',
        artisticNote: '王菲自谱诡谲迷幻旋律，窦唯编曲赋予了异域神秘的中东与英伦前卫色彩。反复吟诵的 Di-Dar 既像时钟嘀嗒，又像心跳崩塌。',
        tempoBpm: 86,
        moodKeywords: ['神秘迷幻', '灵魂出窍', '窦唯编曲', '异域律动']
      },
      {
        number: '02',
        title: '假期',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '林旷培',
        duration: '03:52',
        signatureLyric: '随时预备旅程结束，lalilala～～～我爱上过你。',
        extendedLyricSnippet: HOLIDAY_LYRICS,
        artisticNote: '王菲自作曲。将情感比喻成一场终将结束的假期，慵懒拖沓中带着宿命的回望，“我爱上过你”是全曲点睛绝响。',
        tempoBpm: 78,
        moodKeywords: ['慵懒抽离', '休止符', '都市避难', '旅程结束']
      },
      {
        number: '03',
        title: '迷路',
        composer: 'C.Y. Kong',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        duration: '05:07',
        signatureLyric: '如果今天我没有碰到他 谁陪我过这一夏 黄昏很美 但这刻我迷路了',
        extendedLyricSnippet: '如果今天我没有碰到他 / 谁陪我过这一夏 / 哪怕在刹那 刹那间失去他 / 黄昏很美 / 但这刻我迷路了 / 谁在催促我回家',
        artisticNote: 'C.Y. Kong 标志性的慢板碎拍与吉他泛音，将王菲游荡在香港中环街头的迷失感营造得无比真实。',
        tempoBpm: 76,
        moodKeywords: ['慢板迷失', '港岛黄昏', '空灵吉他']
      },
      {
        number: '04',
        title: '暧昧',
        composer: '陈小霞',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        duration: '04:36',
        signatureLyric: '徘徊在似苦又甜之间 望不穿这暖昧的眼 爱或情借来填一晚 终须都归还',
        extendedLyricSnippet: '眉目也似戏言 誓言怎敢叫它实现 / 剪不断 离还乱 哪怕这恋爱将完 / 徘徊在似苦又甜之间 望不穿这暖昧的眼 / 爱或情借来填一晚 终须都归还 / 沉沦在似非似真之间',
        artisticNote: '港乐史上关于“暧昧”母题的终极定义。林夕填词字字戳心，王菲叹息般的弱混气声，精准捕捉进退两难的情感拉扯。',
        tempoBpm: 70,
        moodKeywords: ['都市暗涌', '欲拒还迎', '林夕绝笔']
      },
      {
        number: '05',
        title: '或者',
        composer: 'Alex San',
        lyricist: '林夕',
        arranger: 'Alex San',
        duration: '04:30',
        signatureLyric: '或者这样 或者那样 到底在等待什么',
        extendedLyricSnippet: '或者这样 / 或者那样 / 到底在等待什么 / 还是我们习惯了彼此的冷漠',
        artisticNote: '极简慢摇滚氛围，展现了对关系不确定性的麻木沉浸。',
        tempoBpm: 74,
        moodKeywords: ['不确定性', '清冷凝视']
      },
      {
        number: '06',
        title: '流星',
        composer: '刘以达 (达明一派)',
        lyricist: '周耀辉',
        arranger: '刘以达',
        duration: '04:44',
        signatureLyric: '满天飞舞的流星 怎么照亮你冷漠的心情',
        extendedLyricSnippet: '满天飞舞的流星 / 怎么照亮你冷漠的心情 / 擦身而过的瞬间 / 所有的愿望都化作尘埃',
        artisticNote: '达明一派刘以达亲自操刀，诡谲迷幻的电吉他泛音，描摹都市夜空下流星坠落的绝美凄楚。',
        tempoBpm: 82,
        moodKeywords: ['刘以达', '达明一派', '冷艳吉他']
      }
    ]
  },

  // -------------------------------------------------------------
  // 04. FABLE (寓言 / 2000)
  // 背景：寓言背景 (五彩眼影面孔、菊花挂脖华服与五联交响)
  // -------------------------------------------------------------
  {
    id: 'yuyan',
    number: '04',
    title: 'FABLE / ALLEGORY',
    chineseTitle: '寓言',
    year: 2000,
    releaseDate: '2000-10-20',
    recordLabel: '百代唱片 EMI Records',
    coreCollaborators: ['王菲', '张亚东', '林夕', 'Adrian Chan', 'Alvin Leong'],
    essence: '宏大 · 宿命 · 佛性 · 交响 · 电子 · 涅槃',
    visualDirection: {
      themeName: 'Epic Buddhist Fable & Prismatic Eyeshadow Temple',
      colorPalette: {
        primary: '#a855f7',
        secondary: '#ec4899',
        accent: '#eab308',
        background: '#090411',
        surface: '#150a24',
        text: '#faf5ff',
        mutedText: '#d8b4fe'
      },
      typographyStyle: '古老典籍、如神谕雕刻般威严庄重的字形',
      spatialAtmosphere: '五彩眼影大特写、菊花暗纹、深紫殿堂与地质地层断裂感'
    },
    manifesto: '从寒武纪到彼岸花，十二亿年不过是一秒钟的叹息。我见过一场海啸，没见过你的微笑；天黑，刷白了头发。',
    curatorialStatement: '2000年的《寓言》是华语概念唱片的至高神作。前五首由王菲自谱曲、张亚东编曲、林夕填词构成的宏大“寓言五部曲”（寒武纪-新房客-香奈儿-阿修罗-彼岸花），将地质时代、宿命轮回与佛教哲思熔铸于Trip-Hop与交响乐的熔炉之中，在世界流行音乐史上亦属罕见奇观。',
    heroPhoto: '/assets/faye/faye_changyou.png',
    tracks: [
      {
        number: '01',
        title: '新房客',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '05:11',
        signatureLyric: '我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。',
        extendedLyricSnippet: '我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。',
        artisticNote: '【策展哲学入口：我能否真正理解你？】个人解读：比喻想要了解一个人却怎么都看不透。看见了世界，却无法看透一个人。室内Trip-Hop与光影遮罩下的无解探寻。',
        tempoBpm: 84,
        moodKeywords: ['我能否真正理解你', '看不透的亲密客体', '海啸与微笑', 'Trip-Hop']
      },
      {
        number: '02',
        title: '彼岸花',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '04:50',
        signatureLyric: '天黑 刷白了头发。',
        extendedLyricSnippet: '天黑 刷白了头发。',
        artisticNote: '【策展哲学入口：美丽是否必然与消逝相伴？】个人解读：太美的意境。极致极简、黑白光影、东方宿命感。万物寂灭与时光倒置的涅槃之美。',
        tempoBpm: 60,
        moodKeywords: ['美丽是否必然消逝', '天黑刷白了头发', '极致极简', '东方宿命']
      },
      {
        number: '03',
        title: '香奈儿',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '04:52',
        signatureLyric: '你是模特儿；我是香奈儿。',
        extendedLyricSnippet: '你是模特儿；我是香奈儿。',
        artisticNote: '【策展哲学入口：在爱与被爱之间，究竟是谁塑造了谁？】个人解读：设计与被设计；爱与被爱。亲密关系中身份、角色与主动权的流动转换，而非单纯的控制与从属。',
        tempoBpm: 96,
        moodKeywords: ['谁塑造了谁', '设计与被设计', '爱与被爱', '角色流动']
      }
    ]
  },

  // -------------------------------------------------------------
  // 05. FUZAO (浮躁 / 1996)
  // 背景：王菲窦唯在野三坡骑马 (对应最后一首《野三坡》)
  // -------------------------------------------------------------
  {
    id: 'fuzao',
    number: '05',
    title: 'FUZAO / RESTLESS',
    chineseTitle: '浮躁',
    year: 1996,
    releaseDate: '1996-06-03',
    recordLabel: '新艺宝唱片 Cinepoly Records',
    coreCollaborators: ['窦唯', '张亚东', 'Cocteau Twins (极地双子星)', '梁荣骏'],
    essence: '自由 · 自然 · 灵动 · 原始 · 抽象 · 天真',
    visualDirection: {
      themeName: 'Ye Sanpo Mountain Valley & 1996 Analog Wind',
      colorPalette: {
        primary: '#84cc16',
        secondary: '#0284c7',
        accent: '#facc15',
        background: '#0d1612',
        surface: '#15241d',
        text: '#f7fee7',
        mutedText: '#bef264'
      },
      typographyStyle: '山野纵马、自然风吹的自由无拘排版',
      spatialAtmosphere: '王菲与窦唯野三坡骑马、百里峡峰峦、拒马河浅滩、35毫米胶片颗粒与原野呼吸'
    },
    manifesto: '没有冗长的大道理，十首歌仅千余字，甚至只有无字呢喃与呼吸。王菲与窦唯在野三坡策马涉水，将山野的大风直接吹入唱片沟槽。',
    curatorialStatement: '1996年《浮躁》是王菲音乐生涯的分水岭。在窦唯与张亚东的主导下，王菲彻底告别了传统港式情歌框架，全面拥抱英国4AD厂牌的Dream Pop仙音。专辑末尾以窦唯吹奏的长笛与王菲在河北野三坡策马采风为灵感，诞生了纯音乐神作《野三坡》，成为华语独立音乐史上最富传奇色彩的自由之声。',
    heroPhoto: '/assets/aistudio/IMG_5419_b796a387.jpeg',
    tracks: [
      {
        number: '01',
        title: '麻醉 (浮躁版)',
        composer: '周凤岭',
        lyricist: '王菲',
        arranger: '张亚东',
        duration: '03:10',
        signatureLyric: '本来以为可以一直麻醉 谁知道心跳还是那么清脆',
        extendedLyricSnippet: '本来以为可以一直麻醉 / 谁知道心跳还是那么清脆 / 难道我清醒才是犯罪',
        artisticNote: '张亚东极简编曲，王菲自作词，将宿醉醒来后的超然感受具象化。',
        tempoBpm: 92,
        moodKeywords: ['极简清醒', '微醺麻醉', '心跳声']
      },
      {
        number: '02',
        title: '浮躁',
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        duration: '02:58',
        signatureLyric: '九月天高人浮躁 啦啦啦啦啦 表面上平静 心里头狂跳',
        extendedLyricSnippet: '九月天高人浮躁 / 啦啦啦啦啦 / 表面上平静 / 心里头狂跳 / 啦啦啦啦啦 / 一切都好 / 只缺烦恼',
        artisticNote: '王菲自作词曲，全曲短小利落，编曲明快跳脱，将秋日那种莫名的心神不宁转化为轻盈的呼吸。',
        tempoBpm: 120,
        moodKeywords: ['随性解构', '灵动无拘', '先锋简素']
      },
      {
        number: '03',
        title: '分裂',
        composer: 'Elizabeth Fraser / Robin Guthrie / Simon Raymonde',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '04:00',
        signatureLyric: '一面笑的天真无邪 一面看破一切 守著一个人的世界 流著两个人的血',
        extendedLyricSnippet: '分裂 分裂 / 一面笑的天真无邪 / 一面看破一切 / 分裂 分裂 / 一面爱的精疲力竭 / 一面甚么都不屑 / 都是我拥抱过你 一点一滴留在手里 / 都是你拥抱过我 没有空隙让我呼吸 / 分裂 分裂 / 守著一个人的世界 流著两个人的血',
        artisticNote: '改编自 Cocteau Twins 名作《Tranquil Eye》，林夕以双重人格之喻直击现代都市人内心的撕扯与解脱。',
        tempoBpm: 88,
        moodKeywords: ['Cocteau Twins', '双重人格', '4AD仙音']
      },
      {
        number: '04',
        title: '不安',
        composer: '王菲',
        lyricist: '王菲 (纯音乐/无字呼吸)',
        arranger: '张亚东',
        duration: '02:15',
        signatureLyric: '(纯器乐与气声呼吸：无字哼唱构建的神秘园)',
        extendedLyricSnippet: '(无歌词文本：由王菲即兴的气声轻哼与张亚东的幽玄吉他共同构筑)',
        artisticNote: '整曲不着一字，纯粹以音色和呼吸探索内心的动荡与平息。',
        tempoBpm: 80,
        moodKeywords: ['无字纯声', '呼吸实验', '极简器乐']
      },
      {
        number: '05',
        title: '哪儿',
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        duration: '03:12',
        signatureLyric: '哪儿... 哪儿... 迷茫四顾，却自得其乐',
        extendedLyricSnippet: '哪儿 哪儿 哪儿 / 风从哪儿来 / 心往哪儿去 / 啦啦啦...',
        artisticNote: '只有一声声灵动的“哪儿”，宛如林间小鸟的探问。',
        tempoBpm: 104,
        moodKeywords: ['灵动问询', '林间轻跃', '纯真天性']
      },
      {
        number: '06',
        title: '堕落',
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        duration: '03:40',
        signatureLyric: '绝望的逆流而上，甘心的自投罗网。',
        extendedLyricSnippet: '没有别的想法 只想放纵一下',
        artisticNote: '王菲自作词曲，末尾那一串真切又充满嘲弄的笑声采样，已成为华语音乐史上的先锋传奇。',
        tempoBpm: 94,
        moodKeywords: ['暗黑童话', '肆意放浪', '戏谑笑声']
      },
      {
        number: '07',
        title: '野三坡',
        composer: '王菲',
        lyricist: '王菲 (纯音乐/野外自然灵感)',
        arranger: '窦唯',
        duration: '03:52',
        signatureLyric: '窦唯竹笛长鸣，王菲山谷纵马；北方旷野的大风，永驻此曲。',
        extendedLyricSnippet: '(纯器乐名作：窦唯长笛与山涧溪水交织，记录王菲与窦唯在河北野三坡纵马奔腾的旷世自然之境)',
        artisticNote: '整张专辑的灵魂压轴之作！王菲与窦唯共赴河北野三坡山谷纵马，窦唯以长笛与原生态野草沙沙声交叠，成就了华语乐坛罕见的自然原野仙音。',
        tempoBpm: 76,
        moodKeywords: ['野三坡纵马', '窦唯长笛', '野性大地', '终章原野']
      },
      {
        number: '08',
        title: '末日',
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '03:46',
        signatureLyric: '欲望地买下了一切，却满足不了空虚。',
        extendedLyricSnippet: 'CD会旋转。',
        artisticNote: '消费与占有无法填满内心的空洞，繁华末日以冷静、克制的方式显影。',
        tempoBpm: 88,
        moodKeywords: ['末日感', '空虚', '消费幻象', '冷静崩塌']
      }
    ]
  },

  // -------------------------------------------------------------
  // 06. FEIMIMI ZHI YIN (菲靡靡之音 / 1995)
  // 背景：菲靡靡之音背景 (齐刘海深唇、泼洒红指甲油、宝丽来联页)
  // -------------------------------------------------------------
  {
    id: 'feimimizhinyin',
    number: '06',
    title: 'THE DECADENT SOUND OF FAYE',
    chineseTitle: '菲靡靡之音',
    year: 1995,
    releaseDate: '1995-07-03',
    recordLabel: '新艺宝唱片 Cinepoly Records',
    coreCollaborators: ['王菲', '梁荣骏', 'Adrian Chan', 'C.Y. Kong', 'Alex San'],
    essence: '致敬 · 颠覆 · 丝绒 · 典雅 · 重构 · 绝代',
    visualDirection: {
      themeName: 'Decadent Editorial & Spilled Crimson Velvet',
      colorPalette: {
        primary: '#b91c1c',
        secondary: '#ca8a04',
        accent: '#f87171',
        background: '#120b0b',
        surface: '#201212',
        text: '#fef2f2',
        mutedText: '#fca5a5'
      },
      typographyStyle: '经典波波头、复古哑光深唇与手迹典藏排版',
      spatialAtmosphere: '宝丽来试拍联页、洒落在白地上的暗红指甲油印记、丝绒低吟与世纪末港岛旧梦'
    },
    manifesto: '所谓“靡靡之音”，不过是俗世对不可方物之美的愚钝误解。以王菲先锋之骨，重塑邓丽君十四首经典绝代芳华。',
    curatorialStatement: '1995年王菲推出致敬邓丽君的翻唱专辑《菲靡靡之音》。此名巧妙反讽了当年内地对邓丽君音乐“靡靡之音”的批判。王菲并未简单复刻，而是以其独特的咽音、弱混气声与现代英伦流行编曲，赋予了《但愿人长久》《南海姑娘》《又见炊烟》等经典作品全新的现代生命，被誉为华语流行乐翻唱史的最高珠峰。',
    heroPhoto: '/assets/aistudio/IMG_1647_6ac420d2.JPG',
    tracks: [
      {
        number: '01',
        title: '但愿人长久',
        composer: '梁弘志',
        lyricist: '苏轼 (宋词)',
        arranger: 'Alex San',
        duration: '04:20',
        signatureLyric: '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
        extendedLyricSnippet: '明月几时有 把酒问青天 / 不知天上宫阙 今夕是何年 / 人有悲欢离合 月有阴晴圆缺 / 此事古难全 / 但愿人长久 千里共婵娟',
        artisticNote: '苏轼绝代宋词《水调歌头》，梁弘志谱曲。王菲空灵悠扬的气声将千年孤寂与旷达祝福唱得如水银泻地。',
        tempoBpm: 68,
        moodKeywords: ['苏轼宋词', '千古婵娟', '空灵水银', '传世翻唱']
      },
      {
        number: '02',
        title: '南海姑娘',
        composer: '刘家昌',
        lyricist: '庄奴',
        arranger: 'C.Y. Kong',
        duration: '03:45',
        signatureLyric: '椰风挑动银浪，夕阳披上彩霞；不知南海姑娘，为何泪如雨下。',
        extendedLyricSnippet: '椰风挑动银浪 夕阳披上彩霞 / 宛风吹动着她的发 端详着她的眼睛 / 为什么她在哭泣 为什么泪如雨下 / 南海姑娘 谁在听你的心事',
        artisticNote: 'C.Y. Kong 融入波萨诺瓦与轻盈碎拍，王菲呢喃般的低音让南洋微风拂面而来。',
        tempoBpm: 88,
        moodKeywords: ['南洋椰风', '波萨诺瓦', '庄奴词作']
      },
      {
        number: '03',
        title: '初恋的地方',
        composer: '刘家昌',
        lyricist: '孙仪',
        arranger: 'Adrian Chan',
        duration: '03:38',
        signatureLyric: '我记得有一个地方，我永远永远不能忘；我和他手牵着手，漫步在那夕阳下。',
        extendedLyricSnippet: '我记得有一个地方 我永远永远不能忘 / 听那微风低低地唱 听那小溪轻轻地响 / 在那青青的草地上 / 留下了我们最初的愿望',
        artisticNote: '弦乐泛起如清澈小溪，王菲用无邪质朴的语调重塑纯真年代的初恋悸动。',
        tempoBpm: 72,
        moodKeywords: ['纯真悸动', '柔情溪流', '经典旋律']
      },
      {
        number: '04',
        title: '又见炊烟',
        composer: '海沼实',
        lyricist: '庄奴',
        arranger: 'Adrian Chan',
        duration: '03:15',
        signatureLyric: '又见炊烟升起，暮色罩大地；想问阵阵炊烟，你要去哪里。',
        extendedLyricSnippet: '又见炊烟升起 暮色罩大地 / 想问阵阵炊烟 你要去哪里 / 夕阳有诗情 黄昏有画意 / 诗情画意虽然美丽 我心中只有你',
        artisticNote: '日式典雅民谣小调，王菲真声与假声在极弱音量下无缝切换，如同一缕晚霞在风中轻散。',
        tempoBpm: 80,
        moodKeywords: ['日暮炊烟', '典雅民谣', '弱声极致']
      },
      {
        number: '05',
        title: '雪中莲',
        composer: '李泰祥',
        lyricist: '李泰祥',
        arranger: 'Adrian Chan',
        duration: '03:26',
        signatureLyric: '雪花飘 飘起了多少爱恋；雪花飞 飞起了多少情缘。',
        extendedLyricSnippet: '雪花飘 飘起了多少爱恋 / 雪花飞 飞起了多少情缘 / 莲花开在雪中间 / 多少的希望 多少的心愿',
        artisticNote: '李泰祥经典，王菲以纯净空灵之音描绘天山雪莲傲立冰峰的绝美与坚忍。',
        tempoBpm: 66,
        moodKeywords: ['雪山天籁', '李泰祥', '坚贞空明']
      },
      {
        number: '06',
        title: '翠湖寒',
        composer: '骆明道',
        lyricist: '孙仪',
        arranger: 'Adrian Chan',
        duration: '04:02',
        signatureLyric: '我忆起翠湖寒，碧波荡漾；湖畔留连，伊人何在。',
        extendedLyricSnippet: '我忆起翠湖寒 碧波荡漾 / 倒映着那一抹淡淡的蓝 / 人已离去 湖水依然 / 问君能有几多愁',
        artisticNote: '清冷如碧潭寒玉的编曲，将深秋湖畔的凄清落寞刻画得入木三分。',
        tempoBpm: 64,
        moodKeywords: ['寒潭碧波', '清冷幽深', '秋日挽歌']
      }
    ]
  },

  // -------------------------------------------------------------
  // 07. ONLY LOVE STRANGERS (只爱陌生人 / 1999)
  // 背景：只爱陌生人背景 (黑色漆皮衬衫、粉色软包墙、红鞋静卧、斑马裤迪斯科)
  // -------------------------------------------------------------
  {
    id: 'strangers',
    number: '07',
    title: 'ONLY LOVE STRANGERS',
    chineseTitle: '只爱陌生人',
    year: 1999,
    releaseDate: '1999-09-10',
    recordLabel: '百代唱片 EMI Records',
    coreCollaborators: ['王菲', '张亚东', '林夕', 'C.Y. Kong', 'Adrian Chan', '袁惟仁'],
    essence: '冷艳 · 颓废 · 疏离 · 迷幻 · 摩登 · 荼靡',
    visualDirection: {
      themeName: 'Late-90s Noir Vinyl & Neon Pink Padded Cell',
      colorPalette: {
        primary: '#ec4899',
        secondary: '#09090b',
        accent: '#f43f5e',
        background: '#0a0508',
        surface: '#180d14',
        text: '#fdf2f8',
        mutedText: '#f472b6'
      },
      typographyStyle: '黑色漆皮、粉红软垫与前卫斑马纹的世纪末冷艳排版',
      spatialAtmosphere: '黑色PVC漆皮衬衫、粉色菱格软包墙面、白色地板上的红色高跟鞋、橙色射灯下的斑马裤舞步'
    },
    manifesto: '每只蚂蚁都有眼睛鼻子，每一个人遇见所爱的人都心有余悸。给陌生人一盒烟，给爱人一个叹息；当世纪末开到荼靡，我只爱陌生人。',
    curatorialStatement: '1999年《只爱陌生人》是世纪末最经典的独立都市时尚寓言。张叔平打造的黑色漆皮衬衫搭配粉红软包墙视觉，精准隐喻了世纪末都市男女在坚硬保护色与脆弱肉身之间的割裂。收录《开到荼靡》《当时的月亮》《催眠》《只爱陌生人》《百年孤寂》等时代名篇，将Trip-Hop与英伦摇滚推向极致。',
    heroPhoto: '/assets/faye/faye_strangers.png',
    tracks: [
      {
        number: '01',
        title: '开到荼靡',
        composer: 'C.Y. Kong',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        duration: '04:54',
        signatureLyric: '每只蚂蚁 都有眼睛鼻子 它美不美丽 偏差有没有一毫厘 有何关系',
        extendedLyricSnippet: '每只蚂蚁 都有眼睛鼻子 它美不美丽 / 偏差有没有一毫厘 有何关系 / 每一个人爱上所爱的人都心有余悸 / 一个一个偶像 都不外如此 / 沉迷过的偶像 一个个消失 / 谁比谁美丽 谁比谁高贵 / 当花开到荼靡',
        artisticNote: '扩音器滤镜人声爆破开场，C.Y. Kong 工业电吉他轰鸣，林夕写出解构一切偶像与虚无的绝世名篇。',
        tempoBpm: 122,
        moodKeywords: ['扩音器失真', '开到荼靡', '解构偶像', '世纪末英伦摇滚']
      },
      {
        number: '02',
        title: '当时的月亮',
        composer: '李冰',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        duration: '03:48',
        signatureLyric: '当时我们听着音乐 以为那是永恒 当时的月亮 曾经代表谁的心 结果都一样',
        extendedLyricSnippet: '看 当时的月亮 曾经代表谁的心 结果都一样 / 看 当时的月亮 一夜之间化做今天的阳光 / 谁在看谁 谁在等谁 / 以为那是永恒',
        artisticNote: '经典民谣木吉他前奏，林夕用极其精妙的笔触颠覆了《月亮代表我的心》的浪漫神话。',
        tempoBpm: 84,
        moodKeywords: ['月亮寓言', '木吉他清澈', '颠覆经典']
      },
      {
        number: '03',
        title: '催眠',
        composer: '郭亮',
        lyricist: '林夕',
        arranger: '郭亮',
        duration: '04:26',
        signatureLyric: '第一口蛋糕的滋味 第一件玩具帶來的安慰 太陽上山 太陽下山 冰淇淋流淚',
        extendedLyricSnippet: '第一口蛋糕的滋味 / 第一件玩具帶來的安慰 / 太陽上山 太陽下山 冰淇淋流淚 / 忽然天亮 忽然天黑 / 諸如此類 遠走高飛 / 一二三歲 四五六歲 千秋萬歲',
        artisticNote: '迷幻旋律与层层叠叠的合成器回音，童年记忆与成年幻灭在梦呓般的声线中被催眠。',
        tempoBpm: 94,
        moodKeywords: ['童年切片', '时间催眠', '迷离层叠']
      },
      {
        number: '04',
        title: '只爱陌生人',
        composer: '张亚东',
        lyricist: '林夕',
        arranger: '张亚东',
        duration: '03:42',
        signatureLyric: '我爱得，比脸色还单纯，比宠物还天真。',
        extendedLyricSnippet: '我爱得， / 比脸色还单纯， / 比宠物还天真， / 当我需要的， / 只是一个吻， / 就给我一个吻， / 我只爱陌生人。',
        artisticNote: '张亚东标志性的慵懒摇摆节拍，结尾处采样窦靖童稚嫩的童音“Come on baby”，反差令人动容。',
        tempoBpm: 102,
        moodKeywords: ['张亚东', '陌生人哲学', '窦靖童采样']
      },
      {
        number: '05',
        title: '百年孤寂',
        composer: 'C.Y. Kong / Adrian Chan',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        duration: '05:18',
        signatureLyric: '心属于你的 我借来寄托 却变成我的心魔 风属于天的 我借来吹吹 却吹起人间烟火',
        extendedLyricSnippet: '心属于你的 我借来寄托 却变成我的心魔 / 风属于天的 我借来吹吹 却吹起人间烟火 / 一百年前你不是你我不是我 / 悲哀是真的 泪是假的 本来没因果 / 一百年后没有你也没有我',
        artisticNote: '取材于马尔克斯《百年孤独》，C.Y. Kong 狂暴震撼的英伦摇滚编制，王菲气势磅礴的大气演绎无可匹敌。',
        tempoBpm: 130,
        moodKeywords: ['马尔克斯', '百年孤寂', '大漠英伦', '震撼宿命']
      },
      {
        number: '06',
        title: '邮差',
        composer: 'Adrian Chan',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        duration: '03:26',
        signatureLyric: '你是千堆雪 我是长街 / 怕日出一到 彼此瓦解',
        extendedLyricSnippet: '你是千堆雪 我是长街 / 怕日出一到 彼此瓦解 / 看着蝴蝶扑不过天涯 谁又有权不理解 / 你是一封信 我是邮差 / 最后一双脚 惹尽尘埃 / 忙着去护送 来不及拆开 / 里面完美的世界',
        artisticNote: '你是一封信，我是邮差。忙着护送，来不及拆开里面完美的世界。',
        tempoBpm: 70,
        moodKeywords: ['蝴蝶沧海', '丝缎气声', '林夕绝美挽歌']
      }
    ]
  }
];
