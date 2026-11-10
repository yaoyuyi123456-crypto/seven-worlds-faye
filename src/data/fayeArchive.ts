export interface Song {
  id: string;
  title: string;
  albumId: string;
  albumTitle: string;
  year: number;
  composer: string;
  lyricist: string;
  arranger: string;
  keyLyric: string;
  fullLyricsSnippet: string;
  moodTags: string[];
  dimensions: {
    intimacy: number; // 0 = 极度疏离, 100 = 亲密温存
    intensity: number; // 0 = 极致冷静, 100 = 强烈激越
    ethereal: number; // 0 = 梦幻仙音, 100 = 现实写实
    experimental: number; // 0 = 前卫实验, 100 = 流行悦耳
  };
  audioSignature: {
    rootNote: number; // Hz for synthesizer preview
    chords: string[];
    tempo: number;
    ambientType: 'dream_pop' | 'trip_hop' | 'acoustic' | 'ambient' | 'brit_rock';
  };
  motifs: string[];
  curatorNote: string;
}

export interface Album {
  id: string;
  title: string;
  englishTitle: string;
  year: number;
  releaseDate: string;
  recordCompany: string;
  coreCollaborators: string[];
  coverImage: string;
  heroBgImage: string;
  visualConcept: string;
  aestheticDna: {
    primaryBg: string;
    textColor: string;
    accentColor: string;
    secondaryColor: string;
    gradient: string;
    textureStyle: string;
    tagline: string;
  };
  manifesto: string;
  curatorOverview: string;
  tracks: Song[];
}

export interface VisualLook {
  id: string;
  era: string;
  year: number;
  title: string;
  image: string;
  category: 'album_art' | 'concert_look' | 'cinema' | 'fashion_editorial';
  collaborators: {
    photography?: string;
    makeup?: string;
    artDirection?: string;
    styling?: string;
  };
  palette: string[];
  description: string;
  culturalImpact: string;
  archiveCode: string;
}

export interface LyricMotif {
  id: string;
  name: string;
  englishName: string;
  symbolism: string;
  lyricistFocus: string;
  frequency: number;
  quotes: Array<{
    song: string;
    year: number;
    album: string;
    line: string;
  }>;
}

export const ALBUMS: Album[] = [
  {
    id: 'didar',
    title: 'Di-Dar',
    englishTitle: 'Di-Dar',
    year: 1995,
    releaseDate: '1995-12-22',
    recordCompany: '新艺宝唱片 Cinepoly',
    coreCollaborators: ['王菲', '窦唯', '林夕', 'C.Y. Kong', '梁荣骏', 'Adrian Chan'],
    coverImage: '/assets/faye/faye_didar_cover.png',
    heroBgImage: '/assets/faye/faye_didar.png',
    visualConcept: '迷离短发 · 颓废神游 · 粗颗粒墨绿胶片 · 异域Trip-Hop',
    aestheticDna: {
      primaryBg: '#091512',
      textColor: '#d1fae5',
      accentColor: '#10b981',
      secondaryColor: '#34d399',
      gradient: 'from-[#071612] via-[#0d2820] to-[#040c0a]',
      textureStyle: 'didar_emerald_noir',
      tagline: '粤语大碟绝响 · 英伦迷幻与Trip-Hop颓废美学巅峰'
    },
    manifesto: '不要偷看你一秒，是害怕突然会偷笑；凌乱短发蜷在旧沙发，灵魂出窍，Di-Dar 一点一滴。',
    curatorOverview: '1995年岁末发行的《Di-Dar》是王菲粤语专辑无可争议的艺术巅峰。整张大碟充斥着浓郁英伦迷幻、中东异域音阶与神秘Trip-Hop律动。主打歌《Di-Dar》由王菲作曲、窦唯编曲，将神思恍惚与心跳失控表现得淋漓尽致；而《暧昧》与《迷路》则将港岛世纪末都市男女的暧昧拉扯与虚无写到了极致。',
    tracks: [
      {
        id: 'didar_track',
        title: 'Di-Dar',
        albumId: 'didar',
        albumTitle: 'Di-Dar',
        year: 1995,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '窦唯',
        keyLyric: '不要偷看你一秒 是害怕突然会偷笑 会突然高声呼叫 叫灵魂出窍 出窍 出窍',
        fullLyricsSnippet: '不要偷看你一秒\n是害怕突然会偷笑\n会自然爱过没了\n会突然高声呼叫\n叫灵魂出窍 出窍 出窍\n不要听见你心跳\n是害怕突然你醒了\n你自然说太夜了\n你定然必须走了\n我突然哭了 哭了 哭了\nDi-Dar... Di-Dar... Di-Dar...',
        moodTags: ['神秘迷幻', '灵魂出窍', '窦唯编曲'],
        dimensions: { intimacy: 30, intensity: 80, ethereal: 10, experimental: 10 },
        audioSignature: { rootNote: 220, chords: ['Am', 'Dm', 'E7', 'Am'], tempo: 86, ambientType: 'trip_hop' },
        motifs: ['出窍', '心跳', '呼吸', 'Di-Dar'],
        curatorNote: '王菲自创诡谲迷离曲调，窦唯以古怪的管乐与打击乐编曲赋予全曲神秘巫术般的气质，反复吟唱的 Di-Dar 既像时钟嘀嗒，又像心跳崩塌。'
      },
      {
        id: 'aimei',
        title: '暧昧',
        albumId: 'didar',
        albumTitle: 'Di-Dar',
        year: 1995,
        composer: '陈小霞',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        keyLyric: '徘徊在似苦又甜之间 望不穿这暖昧的眼',
        fullLyricsSnippet: '眉目也似戏言 誓言怎敢叫它实现\n剪不断 离还乱 哪怕这恋爱将完\n徘徊在似苦又甜之间 望不穿这暖昧的眼\n爱或情借来填一晚 终须都归还\n沉沦在似非似真之间',
        moodTags: ['都市暗涌', '欲拒还迎', '林夕绝笔'],
        dimensions: { intimacy: 85, intensity: 50, ethereal: 40, experimental: 65 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'Em', 'F', 'G'], tempo: 70, ambientType: 'acoustic' },
        motifs: ['眉目', '誓言', '暧昧', '借来'],
        curatorNote: '港乐史上关于“暧昧”母题的终极定义。林夕填词刀刀见血，王菲叹息般的弱混气声与真假音滑音，精准捕捉成年男女之间进退两难的情感拉扯。'
      },
      {
        id: 'milu',
        title: '迷路',
        albumId: 'didar',
        albumTitle: 'Di-Dar',
        year: 1995,
        composer: 'C.Y. Kong',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        keyLyric: '如果今天我没有碰到他 谁陪我过这一夏',
        fullLyricsSnippet: '如果今天我没有碰到他\n谁陪我过这一夏\n哪怕在刹那 刹那间失去他\n黄昏很美 / 但这刻我迷路了\n谁在催促我回家',
        moodTags: ['慢板迷失', '港岛黄昏', '空灵吉他'],
        dimensions: { intimacy: 40, intensity: 45, ethereal: 20, experimental: 35 },
        audioSignature: { rootNote: 196, chords: ['Gm', 'Eb', 'F', 'Bb'], tempo: 76, ambientType: 'dream_pop' },
        motifs: ['迷路', '黄昏', '刹那', '回家'],
        curatorNote: 'C.Y. Kong 标志性的慢板碎拍与吉他泛音，将王菲游荡在香港中环街头的迷失感营造得无比真实。'
      }
    ]
  },
  {
    id: 'changyou',
    title: '唱游',
    englishTitle: 'Scenic Tour',
    year: 1998,
    releaseDate: '1998-10-02',
    recordCompany: 'EMI 百代唱片',
    coreCollaborators: ['张亚东', '林夕', '阿Zing', '夏永康', '潘协庆', '柳重言'],
    coverImage: '/assets/aistudio/IMG_1634_002e42c6.JPG',
    heroBgImage: '/assets/aistudio/IMG_1634_002e42c6.JPG',
    visualConcept: '晒伤妆 · 实验拼贴 · 鲜艳色块 · 不规则排版',
    aestheticDna: {
      primaryBg: '#1b0907',
      textColor: '#fed7aa',
      accentColor: '#fb923c',
      secondaryColor: '#f43f5e',
      gradient: 'from-[#2a0e0a] via-[#431407] to-[#140604]',
      textureStyle: 'sunburst_collage',
      tagline: '晒伤狂潮与迷幻拼贴的世纪转折'
    },
    manifesto: '不要中规中矩的肖像，将女性面部的潮红与雀斑放大为视觉狂欢；音符在撕裂民谣与梦呓噪音间狂奔。',
    curatorOverview: '1998年《唱游》全面爆发。阿Zing以一抹跨越鼻梁的深红与雀斑创造了席卷亚洲的「晒伤妆」，夏永康使用粗颗粒底片与不规则剪影排版颠覆了华语唱片惯例。音乐上包揽了传世金曲《红豆》、王菲自谱的实验神作《脸》、撕裂气声《半途而废》与Trip-hop暗夜《色诫》。',
    tracks: [
      {
        id: 'lian',
        title: '脸',
        albumId: 'changyou',
        albumTitle: '唱游',
        year: 1998,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '周广斌',
        keyLyric: '不断演变那海岸线长出了最哀艳的水仙；我搁浅我却要继续冒险。',
        fullLyricsSnippet: '不断演变那海岸线长出了最哀艳的水仙；我搁浅我却要继续冒险。',
        moodTags: ['海岸水仙', '超现实流动', '搁浅冒险'],
        dimensions: { intimacy: 60, intensity: 85, ethereal: 95, experimental: 90 },
        audioSignature: { rootNote: 261.6, chords: ['C#m', 'A', 'F#m', 'G#'], tempo: 76, ambientType: 'dream_pop' },
        motifs: ['海岸线', '水仙', '搁浅', '冒险'],
        curatorNote: '海岸线与水仙花的超现实隐喻。哥特声乐实验与流动潮汐，在搁浅的绝境中迸发出继续冒险的坚毅生命力。'
      },
      {
        id: 'sejie',
        title: '色诫',
        albumId: 'changyou',
        albumTitle: '唱游',
        year: 1998,
        composer: 'Adrian Chan',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        keyLyric: '不要以为眼角眉梢只是种点缀；不要以为他的头发开不出蔷薇。',
        fullLyricsSnippet: '不要以为眼角眉梢只是种点缀；不要以为他的头发开不出蔷薇。',
        moodTags: ['发丝蔷薇', '冷调暗夜', '先锋重影'],
        dimensions: { intimacy: 25, intensity: 80, ethereal: 35, experimental: 75 },
        audioSignature: { rootNote: 196, chords: ['Gm', 'Eb', 'Cm', 'D7'], tempo: 100, ambientType: 'trip_hop' },
        motifs: ['眼角眉梢', '点缀', '头发', '蔷薇'],
        curatorNote: '暗潮涌动的低音贝斯线与冰冷打击乐，先锋摄影肖像与植物形态的解构重组。'
      },
      {
        id: 'xiaocongming',
        title: '小聪明',
        albumId: 'changyou',
        albumTitle: '唱游',
        year: 1998,
        composer: 'Robin Guthrie / Elizabeth Fraser',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '把泪水看成流星，不言不语都是好风景。',
        fullLyricsSnippet: '把泪水看成流星，不言不语都是好风景。',
        moodTags: ['泪滴流星', '静谧风景', 'Cocteau仙音'],
        dimensions: { intimacy: 70, intensity: 40, ethereal: 95, experimental: 70 },
        audioSignature: { rootNote: 220, chords: ['A', 'F#m', 'D', 'E'], tempo: 84, ambientType: 'dream_pop' },
        motifs: ['泪水', '流星', '不言不语', '好风景'],
        curatorNote: 'Cocteau Twins专属操刀谱写仙音。将沉重泪水解构为划破夜空的流星，最终归于无言而恒久的绝美风景。'
      }
    ]
  },
  {
    id: 'yuyan',
    title: '寓言',
    englishTitle: 'Fable',
    year: 2000,
    releaseDate: '2000-10-20',
    recordCompany: 'EMI 百代唱片',
    coreCollaborators: ['张亚东', '林夕', '阿Zing', '夏永康', 'C.Y. Kong'],
    coverImage: '/assets/faye/faye_changyou.png',
    heroBgImage: '/assets/faye/faye_changyou.png',
    visualConcept: '太空超现实 · 银色钛金 · 蝴蝶彩绘 · 概念宿命',
    aestheticDna: {
      primaryBg: '#090b14',
      textColor: '#c7d2fe',
      accentColor: '#818cf8',
      secondaryColor: '#38bdf8',
      gradient: 'from-[#070913] via-[#101426] to-[#04060b]',
      textureStyle: 'cosmic_futurism',
      tagline: '千禧年最宏大的概念交响与哲学形而上'
    },
    manifesto: '前五乐章一气呵成，从寒武纪生命诞生写到彼岸花开宿命涅槃，华语乐坛世纪之交唯一的形而上概念神迹。',
    curatorOverview: '2000年跨入新世纪，《寓言》展现了华语流行音乐空前绝后的概念完整度。前半张是由张亚东作曲/编曲、王菲自谱自唱、林夕填词的「寓言五部曲」（寒武纪、新房客、香奈儿、阿修罗、彼岸花），贯穿着管弦交响乐、Trip-hop、古希腊悲剧与佛家轮回哲理。',
    tracks: [
      {
        id: 'xinfangke',
        title: '新房客',
        albumId: 'yuyan',
        albumTitle: '寓言',
        year: 2000,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。',
        fullLyricsSnippet: '我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。',
        moodTags: ['我能否真正理解你', '看不透的亲密客体', '海啸与微笑', '现代疏离'],
        dimensions: { intimacy: 30, intensity: 50, ethereal: 80, experimental: 75 },
        audioSignature: { rootNote: 220, chords: ['Am7', 'Dm7', 'G7', 'Cmaj7'], tempo: 84, ambientType: 'trip_hop' },
        motifs: ['海啸', '微笑', '飞鸟', '羽毛'],
        curatorNote: '【策展哲学入口：我能否真正理解你？】个人解读：比喻想要了解一个人却怎么都看不透。看见了世界，却无法看透一个人。'
      },
      {
        id: 'bihanhua',
        title: '彼岸花',
        albumId: 'yuyan',
        albumTitle: '寓言',
        year: 2000,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '天黑 刷白了头发。',
        fullLyricsSnippet: '天黑 刷白了头发。',
        moodTags: ['美丽是否必然消逝', '天黑刷白了头发', '极致极简', '东方宿命'],
        dimensions: { intimacy: 15, intensity: 75, ethereal: 95, experimental: 90 },
        audioSignature: { rootNote: 246.9, chords: ['Bm', 'G', 'Em', 'F#m'], tempo: 60, ambientType: 'ambient' },
        motifs: ['天黑', '白发', '涅槃', '时间'],
        curatorNote: '【策展哲学入口：美丽是否必然与消逝相伴？】个人解读：太美的意境。极致极简、黑白光影、东方宿命感。'
      },
      {
        id: 'xiangnaier',
        title: '香奈儿',
        albumId: 'yuyan',
        albumTitle: '寓言',
        year: 2000,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '你是模特儿；我是香奈儿。',
        fullLyricsSnippet: '你是模特儿；我是香奈儿。',
        moodTags: ['谁塑造了谁', '设计与被设计', '爱与被爱', '角色流动'],
        dimensions: { intimacy: 75, intensity: 65, ethereal: 70, experimental: 85 },
        audioSignature: { rootNote: 196, chords: ['Gm', 'Cm', 'F', 'Bb'], tempo: 96, ambientType: 'trip_hop' },
        motifs: ['模特儿', '香奈儿', '设计', '镜面'],
        curatorNote: '【策展哲学入口：在爱与被爱之间，究竟是谁塑造了谁？】个人解读：设计与被设计；爱与被爱。亲密关系中身份与主动权的流动转换。'
      }
    ]
  },
  {
    id: 'fuzao',
    title: '浮躁',
    englishTitle: 'Restless',
    year: 1996,
    releaseDate: '1996-06-03',
    recordCompany: '新艺宝唱片',
    coreCollaborators: ['窦唯', '张亚东', 'Cocteau Twins (极地双子星)', '梁荣骏'],
    coverImage: '/assets/faye/ye_sanpo_riding.svg',
    heroBgImage: '/assets/faye/ye_sanpo_riding.svg',
    visualConcept: '极简牛皮纸 · 抽象色块 · 粗糙质感 · 意识流拼贴',
    aestheticDna: {
      primaryBg: '#12120e',
      textColor: '#e4e4e7',
      accentColor: '#d4f43b',
      secondaryColor: '#84cc16',
      gradient: 'from-[#141510] via-[#1f2214] to-[#0c0d0a]',
      textureStyle: 'kraft_paper_raw',
      tagline: '彻底打破语言边界的华语先锋艺术巅峰'
    },
    manifesto: '没有冗长的大道理，十首歌仅千余字，甚至只有无字呢喃与呼吸；华语流行乐史上最勇敢、最纯粹的另类艺术宣言。',
    curatorOverview: '1996年《浮躁》是王菲音乐生涯的分水岭。在窦唯与张亚东的主导下，王菲彻底告别了港乐模式化的情歌框架，全面拥抱英国4AD厂牌的Dream Pop仙音。专辑不仅直接收录Cocteau Twins为王菲度身定制的《分裂》与《扫兴》，整张专辑更以大量叠字、无意义虚词与呼吸律动构筑了不可复制的灵性声音景观。',
    tracks: [
      {
        id: 'fuzao_title',
        title: '浮躁',
        albumId: 'fuzao',
        albumTitle: '浮躁',
        year: 1996,
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        keyLyric: '九月天高人浮躁 啦啦啦啦啦 表面上平静 心里头狂跳',
        fullLyricsSnippet: '九月天高人浮躁\n啦啦啦啦啦\n表面上平静\n心里头狂跳\n啦啦啦啦啦\n一切都好 / 只缺烦恼',
        moodTags: ['随性解构', '灵动无拘', '先锋简素'],
        dimensions: { intimacy: 45, intensity: 60, ethereal: 20, experimental: 5 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'F', 'G', 'C'], tempo: 120, ambientType: 'brit_rock' },
        motifs: ['九月', '浮躁', '平静', '心跳'],
        curatorNote: '王菲自作词曲，全曲短小利落，编曲明快跳脱，将秋日那种莫名的心神不宁转化为轻盈的呼吸。'
      },
      {
        id: 'fenlie',
        title: '分裂',
        albumId: 'fuzao',
        albumTitle: '浮躁',
        year: 1996,
        composer: 'Elizabeth Fraser / Robin Guthrie / Simon Raymonde',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '一面笑的天真无邪 一面看破一切 / 守著一个人的世界 流著两个人的血',
        fullLyricsSnippet: '分裂 分裂\n一面笑的天真无邪\n一面看破一切\n分裂 分裂\n一面爱的精疲力竭\n一面甚么都不屑\n都是我拥抱过你 一点一滴留在手里\n都是你拥抱过我 没有空隙让我呼吸\n分裂 分裂\n一面坚强面对一切\n一面须要撒野\n守著一个人的世界\n流著两个人的血',
        moodTags: ['仙音空灵', '4AD梦呓', '哲思解脱'],
        dimensions: { intimacy: 20, intensity: 65, ethereal: 5, experimental: 10 },
        audioSignature: { rootNote: 220, chords: ['Am', 'C', 'G', 'F'], tempo: 88, ambientType: 'dream_pop' },
        motifs: ['分裂', '无邪', '看破', '血'],
        curatorNote: '改编自 Cocteau Twins 名作《Tranquil Eye》，林夕以双重人格之喻直击现代都市人内心的撕扯与解脱。'
      },
      {
        id: 'duoluo',
        title: '堕落',
        albumId: 'fuzao',
        albumTitle: '浮躁',
        year: 1996,
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        keyLyric: '绝望的逆流而上，甘心的自投罗网。',
        fullLyricsSnippet: '绝望的逆流而上，甘心的自投罗网。',
        moodTags: ['暗黑童话', '肆意放浪', '戏谑笑声'],
        dimensions: { intimacy: 35, intensity: 75, ethereal: 15, experimental: 8 },
        audioSignature: { rootNote: 196, chords: ['G', 'Em', 'C', 'D'], tempo: 94, ambientType: 'brit_rock' },
        motifs: ['夜晚', '贪玩', '笑声', '堕落'],
        curatorNote: '王菲自作词曲，末尾那一串真切又充满嘲弄的笑声采样，已成为华语音乐史上的先锋传奇。'
      }
    ]
  },
  {
    id: 'strangers',
    title: '只爱陌生人',
    englishTitle: 'Lovers & Strangers',
    year: 1999,
    releaseDate: '1999-09-10',
    recordCompany: 'EMI 百代唱片',
    coreCollaborators: ['张亚东', '林夕', '夏永康', 'C.Y. Kong', 'Adrian Chan'],
    coverImage: '/assets/faye/faye_strangers.png',
    heroBgImage: '/assets/faye/faye_strangers.png',
    visualConcept: '黑色漆皮 · 极简墨镜 · 港岛夜色 · 摩登冷艳',
    aestheticDna: {
      primaryBg: '#0e0b11',
      textColor: '#fce7f3',
      accentColor: '#ec4899',
      secondaryColor: '#cbd5e1',
      gradient: 'from-[#120a17] via-[#1f1025] to-[#0a060d]',
      textureStyle: 'patent_leather_chrome',
      tagline: '世纪末的香港九龙霓虹与冷感都市寓言'
    },
    manifesto: '黑色漆皮连体裤，眼皮底下的微光，在末日临近的城市里拒绝海誓山盟，只愿与陌生人举杯。',
    curatorOverview: '1999年世纪末，王菲身穿Helmut Lang黑色漆皮服，带着深黑墨镜出现在唱片封面上。夏永康以粗粝的都市夜景拍摄将王菲包装成冷艳的世纪末女郎。音乐上，《开到荼蘼》用扩音喇叭失真音效拉开世纪落幕，《百年孤寂》展现了弗拉门戈吉他与Trip-hop的激烈碰撞，而《当时的月亮》与《催眠》则是王菲最优雅的城市诗学。',
    tracks: [
      {
        id: 'kaidaotumi',
        title: '开到荼蘼',
        albumId: 'strangers',
        albumTitle: '只爱陌生人',
        year: 1999,
        composer: 'C.Y. Kong',
        lyricist: '林夕',
        arranger: 'C.Y. Kong',
        keyLyric: '每只蚂蚁 都有眼睛鼻子 它美不美丽 偏差有没有一毫厘 有何关系',
        fullLyricsSnippet: '每只蚂蚁 都有眼睛鼻子\n它美不美丽 偏差有没有一毫厘 有何关系\n每一个人 伤心了就哭泣 饿了就要吃\n相差大不过天地 有何刺激\n一个一个偶像 都不外如此 / 沉迷过的偶像 一个个消失\n谁曾伤天害理 谁又是上帝 / 我们在等待 什么奇迹\n最后剩下自己 舍不得挑剔 / 最后对着自己 也不大看得起\n谁给我全世界 我都会怀疑 / 心花怒放 却开到荼蘼\n每一个人 碰见所爱的人 却心有余悸',
        moodTags: ['世纪末噪音', '失真电音', '冷酷解构'],
        dimensions: { intimacy: 15, intensity: 90, ethereal: 30, experimental: 15 },
        audioSignature: { rootNote: 196, chords: ['Gm', 'Bb', 'F', 'Eb'], tempo: 112, ambientType: 'trip_hop' },
        motifs: ['蚂蚁', '拥抱', '青春', '荼蘼'],
        curatorNote: 'C.Y. Kong 极具侵略性的失真编曲，王菲的声音通过扩音大喇叭滤镜发出，如同世纪末倒计时的冷酷宣判。'
      },
      {
        id: 'bainianguji',
        title: '百年孤寂',
        albumId: 'strangers',
        albumTitle: '只爱陌生人',
        year: 1999,
        composer: 'Adrian Chan',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        keyLyric: '一百年前你不是你我不是我 悲哀是真的 泪是假的 本来没因果 一百年后没有你也没有我',
        fullLyricsSnippet: '心属于你的 我借来寄托 / 却变成我的心魔\n你属于谁的 我刚好经过 / 却带来磨难\n一百年前你不是你我不是我\n悲哀是真的 泪是假的\n本来没因果\n一百年后没有你也没有我',
        moodTags: ['佛理旷远', '热烈冷峻', '宏大释怀'],
        dimensions: { intimacy: 30, intensity: 88, ethereal: 25, experimental: 35 },
        audioSignature: { rootNote: 220, chords: ['Am', 'Dm', 'G', 'C', 'F', 'E7'], tempo: 92, ambientType: 'brit_rock' },
        motifs: ['百年', '心魔', '泪', '因果'],
        curatorNote: '借鉴马尔克斯名著书名，Adrian Chan将异域弗拉门戈琴音与英式摇滚鼓点激烈交织，王菲在宏大时空尺度下超脱尘缘。'
      },
      {
        id: 'dangshidiyueliang',
        title: '当时的月亮',
        albumId: 'strangers',
        albumTitle: '只爱陌生人',
        year: 1999,
        composer: '李冰',
        lyricist: '林夕',
        arranger: 'Adrian Chan',
        keyLyric: '看 当时的月亮 曾经代表谁的心 结果都一样 看 当时的月亮 一夜之间化做今天的阳光',
        fullLyricsSnippet: '看 今天的月亮 / 看 曾经照亮过什么人\n这个夏天还没完 / 一转眼 就在眼前\n当时的月亮 / 曾经代表谁的心 / 结果都一样\n看 当时的月亮 / 一夜之间化做今天的阳光',
        moodTags: ['淡然释怀', '流转岁月', '温暖疗愈'],
        dimensions: { intimacy: 70, intensity: 35, ethereal: 30, experimental: 60 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'Am', 'F', 'G'], tempo: 80, ambientType: 'acoustic' },
        motifs: ['月亮', '夏天', '阳光', '人心'],
        curatorNote: '吉他扫弦伴着清风般的呢喃，借“月亮代表我的心”经典意象反转出物是人非后的淡泊自处。'
      }
    ]
  },
  {
    id: 'sky',
    title: '天空',
    englishTitle: 'Sky',
    year: 1994,
    releaseDate: '1994-11-10',
    recordCompany: '新艺宝唱片',
    coreCollaborators: ['杨明煌', '黄国伦', '李子恒', '屠颖'],
    coverImage: '/assets/faye/faye_sky.png',
    heroBgImage: '/assets/faye/faye_sky.png',
    visualConcept: '纯净高原蓝 · 清澈银白 · 空灵原声 · 极简肖像',
    aestheticDna: {
      primaryBg: '#081018',
      textColor: '#bae6fd',
      accentColor: '#38bdf8',
      secondaryColor: '#93c5fd',
      gradient: 'from-[#07131f] via-[#0c2438] to-[#040a10]',
      textureStyle: 'sky_celestial',
      tagline: '华语流行史上最纯净透明的声乐殿堂'
    },
    manifesto: '洗去都市铅华的纯粹气声，无伴奏口琴与原声吉他下的无垠苍穹。',
    curatorOverview: '1994年《天空》由金牌制作人杨明煌操刀，黄国伦倾力谱曲。整张专辑以令人屏息的清澈音色著称，王菲高超的气声共鸣、无伴奏阿卡贝拉与口琴交织，成为华语发烧碟与音响试音的不朽范本。',
    tracks: [
      {
        id: 'tiankong',
        title: '天空',
        albumId: 'sky',
        albumTitle: '天空',
        year: 1994,
        composer: '杨明煌',
        lyricist: '黄桂兰',
        arranger: '屠颖',
        keyLyric: '我的天空 为何挂着湿的泪 我的天空 为何总灰的脸',
        fullLyricsSnippet: '我的天空 / 为何挂着湿的泪\n我的天空 / 为何总灰的脸\n飘流在世界的另一边\n任寂寞侵犯 / 一遍一遍\n天空叠着层层的思念',
        moodTags: ['纯净无瑕', '辽阔苍穹', '空灵天籁'],
        dimensions: { intimacy: 70, intensity: 30, ethereal: 10, experimental: 60 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'Em', 'F', 'G'], tempo: 68, ambientType: 'acoustic' },
        motifs: ['天空', '泪', '思念', '寂寞'],
        curatorNote: '开篇一段悠扬空旷的口琴声奠定全曲基调，王菲纯澈的高音如雨后放晴的蔚蓝高空。'
      },
      {
        id: 'qizi',
        title: '棋子',
        albumId: 'sky',
        albumTitle: '天空',
        year: 1994,
        composer: '杨明煌',
        lyricist: '潘丽玉',
        arranger: '屠颖',
        keyLyric: '想走出你控制的领域 却走近你安排的战局 我是一颗棋子 来去全不由自己',
        fullLyricsSnippet: '想走出你控制的领域\n却走近你安排的战局\n我没有坚强的防备\n也没有后路可以退\n我是一颗棋子\n来去全不由自己',
        moodTags: ['被动叹息', '哀而不伤', '古典柔情'],
        dimensions: { intimacy: 78, intensity: 45, ethereal: 35, experimental: 70 },
        audioSignature: { rootNote: 220, chords: ['Am', 'Dm', 'G', 'C', 'E7'], tempo: 72, ambientType: 'acoustic' },
        motifs: ['棋子', '领域', '防备', '命运'],
        curatorNote: '将爱情中的被动与微小比作棋子，屠颖的古典钢琴与弦乐编曲烘托出凄美质感。'
      }
    ]
  },
  {
    id: 'faye1997',
    title: '王菲 1997',
    englishTitle: 'Faye Wong (1997)',
    year: 1997,
    releaseDate: '1997-09-26',
    recordCompany: 'EMI 百代唱片',
    coreCollaborators: ['张亚东', '林夕', 'Cocteau Twins', '阿Zing', '夏永康'],
    coverImage: '/assets/faye/faye_faye1997.png',
    heroBgImage: '/assets/faye/faye_faye1997.png',
    visualConcept: '黑白格纹 · 极简冷峻 · Brit-pop · 自适独立',
    aestheticDna: {
      primaryBg: '#101416',
      textColor: '#e2e8f0',
      accentColor: '#38bdf8',
      secondaryColor: '#94a3b8',
      gradient: 'from-[#0e1317] via-[#162026] to-[#080c0e]',
      textureStyle: 'monochrome_plaid',
      tagline: '百代首度同名大碟 · 英式独立摇滚与旷世名曲'
    },
    manifesto: '谁说爱人就该爱他的脾气，谁说相处就该规规矩矩；在黑白棋盘格里哼着你快乐所以我快乐。',
    curatorOverview: '1997年加盟百代的同名唱片《王菲1997》。张亚东全盘掌控编曲，诞生了《闷》《你快乐(所以我快乐)》《人间》《麻醉》等横扫两岸三地的传世之作。黑白大衣与短发眼泪妆造型，奠定了其华语天后最具辨识度的极简神采。',
    tracks: [
      {
        id: 'men',
        title: '闷',
        albumId: 'faye1997',
        albumTitle: '王菲 1997',
        year: 1997,
        composer: '张亚东',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '谁说爱人就该爱他的脾气 谁说相处就该规规矩矩 谁说为了生活就该落得半死不活',
        fullLyricsSnippet: '谁说爱人就该爱他的脾气\n谁说相处就该规规矩矩\n谁说为了生活就该落得半死不活\n不管了 哪怕这恋爱将完\n玩就玩 别要认真',
        moodTags: ['英式吉他', '反骨自洽', '不屑一顾'],
        dimensions: { intimacy: 35, intensity: 85, ethereal: 20, experimental: 30 },
        audioSignature: { rootNote: 220, chords: ['A', 'D', 'E', 'A'], tempo: 126, ambientType: 'brit_rock' },
        motifs: ['闷', '规矩', '脾气', '玩'],
        curatorNote: '张亚东酣畅淋漓的英伦吉他Solo，王菲轻快又略带嘲讽的咬字，唱出90年代青年最彻底的反规训宣言。'
      },
      {
        id: 'nilekuaile',
        title: '你快乐所以我快乐',
        albumId: 'faye1997',
        albumTitle: '王菲 1997',
        year: 1997,
        composer: '张亚东',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '喜怒哀乐 如果由我决定 那该多好 你快乐 于是我快乐',
        fullLyricsSnippet: '喜怒哀乐 如果由我决定 那该多好\n你快乐 于是我快乐\n玫瑰都开了\n天都亮了 / 只要你快乐',
        moodTags: ['Trip-hop轻快', '母性神性', '极简浪漫'],
        dimensions: { intimacy: 80, intensity: 40, ethereal: 25, experimental: 40 },
        audioSignature: { rootNote: 196, chords: ['G', 'C', 'D', 'Em'], tempo: 92, ambientType: 'trip_hop' },
        motifs: ['快乐', '喜怒哀乐', '玫瑰', '天亮'],
        curatorNote: '张亚东将冷调Trip-Hop节拍与王菲温暖轻柔的声线交织，写给初生女儿窦靖童的纯真寄托。'
      }
    ]
  },
  {
    id: 'jiangai',
    title: '将爱',
    englishTitle: 'To Love',
    year: 2003,
    releaseDate: '2003-11-07',
    recordCompany: '银鱼音乐 / 索尼音乐',
    coreCollaborators: ['张亚东', '王菲', '林夕', '袁惟仁', '杨明学'],
    coverImage: '/assets/faye/faye_jiangai_cover.png',
    heroBgImage: '/assets/faye/faye_editorial.png',
    visualConcept: 'The Art of Letting Go · 半透明纸张 · 灰绿褪色 · 平静告别',
    aestheticDna: {
      primaryBg: '#aebba7',
      textColor: '#28392e',
      accentColor: '#667b5e',
      secondaryColor: '#b9c4b0',
      gradient: 'from-[#aebba7] via-[#d5d7d0] to-[#bac6b6]',
      textureStyle: 'tracing_paper',
      tagline: 'The Art of Letting Go'
    },
    manifesto: '把相遇留给时间，把未说完的话留在纸的背面。',
    curatorOverview: '以半透明纸张、摄影与灰绿色的缓慢褪色，探索《将爱》中的距离、交付、光与平静的告别。',
    tracks: [
      {
        id: 'jiangai_title',
        title: '将爱',
        albumId: 'jiangai',
        albumTitle: '将爱',
        year: 2003,
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        keyLyric: '风风火火 轰轰烈烈 我们的爱情像一场战争 我们没有流血 却都已经阵亡 将爱进行到底',
        fullLyricsSnippet: '风风火火 轰轰烈烈\n我们的爱情像一场战争\n我们没有流血 却都已经阵亡\n将爱进行到底\n伟大是爱情 还是虚荣\n废馆 废墟 废话\n连恋爱都成了废纸',
        moodTags: ['电子硬朗', '战火浪漫', '决绝冲锋'],
        dimensions: { intimacy: 25, intensity: 95, ethereal: 40, experimental: 20 },
        audioSignature: { rootNote: 196, chords: ['G', 'Bb', 'C', 'Eb'], tempo: 130, ambientType: 'brit_rock' },
        motifs: ['废墟', '战争', '阵亡', '将爱'],
        curatorNote: '王菲自谱词曲，张亚东倾注电子摇滚鼓点，如同战场上的号角与玫瑰。'
      },
      {
        id: 'chengke',
        title: '乘客',
        albumId: 'jiangai',
        albumTitle: '将爱',
        year: 2003,
        composer: 'Sophie Zelmani',
        lyricist: '林夕',
        arranger: '郭亮',
        keyLyric: '坐你的车 听你的歌 假装我们 只是普通乘客',
        fullLyricsSnippet: '高架桥过去了 终点站还在前方\n窗外有雨 像一幕慢镜头\n坐你的车 听你的歌\n假装我们 只是普通乘客\n那些流过的泪 那些说过的话\n就让它随风飘走',
        moodTags: ['公路电影', '静谧抽离', '细雨慢镜'],
        dimensions: { intimacy: 65, intensity: 20, ethereal: 25, experimental: 45 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'G/B', 'Am', 'F'], tempo: 76, ambientType: 'acoustic' },
        motifs: ['高架桥', '乘客', '雨', '慢镜头'],
        curatorNote: '改编自瑞典民谣歌手 Sophie Zelmani 的《Going Home》，林夕用王家卫式的电影镜头语言勾勒出成年人最体面的告别。'
      },
      {
        id: 'buliu',
        title: '不留',
        albumId: 'jiangai',
        albumTitle: '将爱',
        year: 2003,
        composer: '王菲',
        lyricist: '林夕',
        arranger: '张亚东',
        keyLyric: '我把風情給了你 日子給了他 / 我把笑容給了你 寬容給了他',
        fullLyricsSnippet: '我把風情給了你 日子給了他\n我把笑容給了你 寬容給了他\n我把思念給了你 時間給了他\n我把眼淚給了你\n我把照片給了你 日曆給了他\n我把顏色給了你 風景給了他\n我把距離給了你 無言給了他\n我把煙花給了你 節日給了他\n我把電影票給了你 我把座位給了他\n我把燭光給了你 晚餐給了他\n我把歌點給了你 麥克風遞給他\n聲音給了你 畫面給了他\n我把情節給了你 結局給了他\n我把水晶鞋給了你 十二點給了他\n我把心給了你 身體給了他\n情願甚麼也不留下\n再也沒有甚麼牽掛\n如果我還有哀傷 讓風吹散他\n如果我還有快樂',
        moodTags: ['交付', '分离', '留白'],
        dimensions: { intimacy: 70, intensity: 30, ethereal: 45, experimental: 35 },
        audioSignature: { rootNote: 220, chords: ['Am', 'F', 'C', 'G'], tempo: 76, ambientType: 'ambient' },
        motifs: ['交付', '留下', '风', '空白'],
        curatorNote: '以“给了你 / 给了他”的交错句式逐项清点关系里的交付，最后落在不再挽留的空白。'
      },
      {
        id: 'yangbao',
        title: '阳宝',
        albumId: 'jiangai',
        albumTitle: '将爱',
        year: 2003,
        composer: '王菲',
        lyricist: '王菲',
        arranger: '张亚东',
        keyLyric: '需要阳光的宝贝 我的向日葵',
        fullLyricsSnippet: '需要阳光的宝贝 我的向日葵\n只在阳光下灿烂\n善于激情中优美',
        moodTags: ['阳光', '向日葵', '生命力'],
        dimensions: { intimacy: 75, intensity: 70, ethereal: 25, experimental: 42 },
        audioSignature: { rootNote: 247, chords: ['C', 'G', 'Am', 'F'], tempo: 96, ambientType: 'brit_rock' },
        motifs: ['宝贝', '向日葵', '阳光', '灿烂'],
        curatorNote: '以向日葵作自我隐喻，场景随光线展开，从收拢的花盘慢慢迎向亮处。'
      },
      {
        id: 'xuanmu',
        title: '旋木',
        albumId: 'jiangai',
        albumTitle: '将爱',
        year: 2003,
        composer: '袁惟仁',
        lyricist: '杨明学',
        arranger: '黄中岳',
        keyLyric: '旋转的木马 没有翅膀 但却能够带着你到处飞翔 音乐停下来 你将离场 我也只能在原地呆望',
        fullLyricsSnippet: '旋转的木马 没有翅膀\n但却能够带着你到处飞翔\n音乐停下来 你将离场\n我也只能在原地呆望\n我很满足 旋转的木马\n在掌声中散场',
        moodTags: ['凄美眷恋', '永恒童话', '温暖感伤'],
        dimensions: { intimacy: 90, intensity: 35, ethereal: 45, experimental: 80 },
        audioSignature: { rootNote: 261.6, chords: ['C', 'Em', 'F', 'G'], tempo: 74, ambientType: 'acoustic' },
        motifs: ['木马', '飞翔', '音乐', '原地'],
        curatorNote: '才华横溢却英年早逝的填词人杨明学与女友在MV中亲自出镜，王菲以最温润的声线为这首关于宿命奉献的歌镀上永恒的光芒。'
      }
    ]
  }
];

export const VISUAL_ARCHIVES: VisualLook[] = [
  {
    id: 'look_didar',
    era: '1995',
    year: 1995,
    title: '《Di-Dar》迷幻短发与旧沙发神游',
    image: '/assets/faye/faye_didar.png',
    category: 'album_art',
    collaborators: {
      styling: '王菲 / 团队',
      photography: '夏永康 (Wing Shya)'
    },
    palette: ['#091512', '#10B981', '#E2E8F0', '#34D399'],
    description: '1995年《Di-Dar》写真中，王菲顶着微卷凌乱短发，双手捂脸蜷缩在旧沙发上，眼神迷离如出窍神游。粗颗粒深褐与墨绿色调定格了90年代英伦Trip-Hop先锋气质。',
    culturalImpact: '终结了传统港乐女歌手甜美精致的既定套路，将病态颓废与慵懒神性首次推上主流唱片金榜。',
    archiveCode: 'FAYE-VIS-1995-01'
  },
  {
    id: 'look_chungking',
    era: '1994',
    year: 1994,
    title: '《重庆森林》加州梦金色短发与中环扶梯',
    image: '/assets/faye/faye_sky.png',
    category: 'cinema',
    collaborators: {
      artDirection: '张叔平 (William Chang)',
      photography: '杜可风 (Christopher Doyle)'
    },
    palette: ['#EAB308', '#0284C7', '#0F172A', '#F8FAFC'],
    description: '在快餐店柜台前随着 The Mamas & the Papas 的《California Dreamin\'》晃动身体；金发短发、大墨镜、透明雨衣与中环半山自动扶梯。王菲在王家卫镜头下完成了影史最迷人的梦游式即兴表演。',
    culturalImpact: '确立了90年代香港独立女性自然、不羁、带有孩童般纯真特质的「菲式美学」，启发了无数艺术青年与时尚先锋。',
    archiveCode: 'FAYE-VIS-1994-01'
  },
  {
    id: 'look_sunburn_1998',
    era: '1998',
    year: 1998,
    title: '《唱游》横空出世 · 晒伤妆与五彩眼影',
    image: '/assets/faye/faye_changyou.png',
    category: 'album_art',
    collaborators: {
      makeup: '阿Zing',
      photography: '夏永康 (Wing Shya)',
      artDirection: '王菲 / 团队'
    },
    palette: ['#FB923C', '#F43F5E', '#FED7AA', '#431407'],
    description: '化妆大师阿Zing用暖红胭脂横扫鼻梁，点缀天然雀斑与五彩虹霓眼影；夏永康运用粗颗粒胶片与特写镜头，定格王菲微张的嘴唇与清澈眼神。色彩鲜明、不拘一格。',
    culturalImpact: '「晒伤妆」引发亚洲乃至欧美时尚界长达数十年的模仿潮，至今仍是高级时装杂志与T台的常青母题。',
    archiveCode: 'FAYE-VIS-1998-01'
  },
  {
    id: 'look_helmut_lang',
    era: '1999',
    year: 1999,
    title: '《只爱陌生人》Helmut Lang 黑色漆皮连体裤',
    image: '/assets/faye/faye_strangers.png',
    category: 'fashion_editorial',
    collaborators: {
      styling: 'Helmut Lang Archive',
      photography: '夏永康 (Wing Shya)'
    },
    palette: ['#09090B', '#27272A', '#E4E4E7', '#F43F5E'],
    description: '九十年代末王菲自购 Helmut Lang 极简黑色漆皮连体裤，配以超扁平长方形墨镜，在夏永康的港岛夜色胶片下展现冷峻、抽离、超前的末世赛博前奏。',
    culturalImpact: '展现了王菲不依附任何商业赞助的先锋挑剔品味，将极简解构品牌推入华语大众视野。',
    archiveCode: 'FAYE-VIS-1999-01'
  },
  {
    id: 'look_fable_2000',
    era: '2000',
    year: 2000,
    title: '《寓言》异星银狐 · 倒挂千纸鹤与太空服',
    image: '/assets/faye/faye_yuyan.png',
    category: 'album_art',
    collaborators: {
      makeup: '阿Zing',
      photography: '夏永康 (Wing Shya)'
    },
    palette: ['#818CF8', '#C7D2FE', '#090B14', '#38BDF8'],
    description: '眼睑涂满钛银色亮粉眼影，眼角绘制宛如破茧重生的彩绘蝴蝶；身穿未来太空服与倒挂千纸鹤装置，宛如来自千禧外太空的星际生灵。',
    culturalImpact: '将西方太空未来主义（Space Age）与东方宿命意象融汇，成为跨世纪视觉设计的标杆之作。',
    archiveCode: 'FAYE-VIS-2000-01'
  },
  {
    id: 'look_faye1997',
    era: '1997',
    year: 1997,
    title: '《王菲 1997》黑白棋盘格风衣与短发眼泪妆',
    image: '/assets/faye/faye_faye1997.png',
    category: 'album_art',
    collaborators: {
      makeup: '阿Zing',
      photography: '夏永康 (Wing Shya)'
    },
    palette: ['#000000', '#FFFFFF', '#64748B', '#38BDF8'],
    description: '黑白交错的几何棋盘格大衣，利落黑发与眼角垂挂的泪珠妆，极简主义冷冽风骨与大女主独立气场浑然一体。',
    culturalImpact: '百代时代同名巨制视觉，将极简解构与摩登独立推向华语文化巅峰。',
    archiveCode: 'FAYE-VIS-1997-01'
  }
];

export const LYRIC_MOTIFS: LyricMotif[] = [
  {
    id: 'butterfly',
    name: '蝴蝶 / 蜕变',
    englishName: 'Butterfly & Metamorphosis',
    symbolism: '象征转瞬即逝的脆弱美感、爱欲化蝶的宿命与超越肉身的精神蜕变。',
    lyricistFocus: '林夕在多首作品中借蝴蝶阐述「庄周梦蝶」式的虚妄哲理。',
    frequency: 18,
    quotes: [
      { song: '蝴蝶', year: 1999, album: '只爱陌生人', line: '给我一双手 对你倚赖 / 给我一双眼 看你离开 / 就像蝴蝶飞不过沧海 没有谁忍心责怪' },
      { song: '香奈儿', year: 2000, album: '寓言', line: '一双眼 两个对白 / 一只蝴蝶 飞过阳台' },
      { song: '分裂', year: 1996, album: '浮躁', line: '灵魂随你飞到另一个世界 / 身体却像是断了翅膀的蝴蝶' }
    ]
  },
  {
    id: 'tumi',
    name: '荼蘼 / 绝境',
    englishName: 'The Final Bloom & Decadence',
    symbolism: '花开到荼蘼花事已了；代表极致繁华后的虚无与世界末日的凄美狂欢。',
    lyricistFocus: '林夕最著名的哲学反讽代表作，以宏观视角消解世俗执念。',
    frequency: 12,
    quotes: [
      { song: '开到荼蘼', year: 1999, album: '只爱陌生人', line: '每只蚂蚁 都有眼睛鼻子 / 它美不美丽 偏差有没有一毫厘 有何关系 / 心花怒放 却开到荼蘼' },
      { song: '色诫', year: 1998, album: '唱游', line: '不要以为眼角眉梢只是种点缀；不要以为他的头发开不出蔷薇。' },
      { song: '闷', year: 1997, album: '王菲 1997', line: '谁说爱人就该爱他的脾气 / 谁说相处就该规规矩矩' }
    ]
  },
  {
    id: 'red_bean',
    name: '红豆 / 偿还',
    englishName: 'Red Bean & Longing',
    symbolism: '相思红豆，将中国古典诗词中「愿君多采撷」化入现代都市感情的无奈与释然。',
    lyricistFocus: '林夕在电视里看到煮糊的红豆，顿悟人生聚散皆有期。',
    frequency: 9,
    quotes: [
      { song: '红豆', year: 1998, album: '唱游', line: '还没为你把红豆 / 熬成缠绵的伤口 / 有时候 有时候 我会相信一切有尽头 没有什么会永垂不朽' },
      { song: '偿还', year: 1998, album: '唱游 (粤语)', line: '偿还过才如愿 要是未曾偿清这心愿 / 星不会转 谎不会穿 因此太稀罕继续相恋' },
      { song: '红豆', year: 1998, album: '唱游', line: '等到风景都看透 / 也许你会陪我 看细水长流' }
    ]
  },
  {
    id: 'moon',
    name: '月亮 / 镜面',
    englishName: 'The Moon & Reflection',
    symbolism: '冷清孤绝的照耀者，见证时光冲刷人事变迁的恒久冷眼客。',
    lyricistFocus: '王菲自作品中亦多次出现月亮，赋予冷峻而从容的女性主体注视。',
    frequency: 15,
    quotes: [
      { song: '当时的月亮', year: 1999, album: '只爱陌生人', line: '看 当时的月亮 / 曾经代表谁的心 结果都一样 / 一夜之间化做今天的阳光' },
      { song: '天空', year: 1994, album: '天空', line: '我的天空 / 为何挂着湿的泪 / 飘流在世界的另一边' },
      { song: '新房客', year: 2000, album: '寓言', line: '我见过 一场海啸 / 没看过 你的微笑' }
    ]
  },
  {
    id: 'passenger',
    name: '乘客 / 孤岛漫游',
    englishName: 'Passenger & Urban Drift',
    symbolism: '人与人关系的最体面距离——不许诺未来，只在此刻同车看窗外流光。',
    lyricistFocus: '体现王菲最核心的精神气质：疏离自洽、拒绝绑架、优雅告别。',
    frequency: 14,
    quotes: [
      { song: '乘客', year: 2003, album: '将爱', line: '坐你的车 听你的歌 / 假装我们 只是普通乘客' },
      { song: '迷路', year: 1995, album: 'Di-Dar', line: '如果今天我没有碰到他 / 谁陪我过这一夏 / 黄昏很美 但这刻我迷路了' },
      { song: 'Di-Dar', year: 1995, album: 'Di-Dar', line: '不要偷看你一秒 / 是害怕突然会偷笑 / 叫灵魂出窍 出窍 出窍' }
    ]
  },
  {
    id: 'cambria',
    name: '寒武纪 / 远古荒原',
    englishName: 'Cambrian & Void',
    symbolism: '亿万年前的地质纪元，将一己之爱恨投射到宇宙演化的广袤荒凉中。',
    lyricistFocus: '林夕与王菲合作中少有的形而上时空构造。',
    frequency: 11,
    quotes: [
      { song: '寒武纪', year: 2000, album: '寓言', line: '故事从一双玻璃鞋开始 / 最初的猎物往往最美丽 / 原来最动人的故事 都写在寒武纪' },
      { song: '百年孤寂', year: 1999, album: '只爱陌生人', line: '一百年前你不是你我不是我 / 悲哀是真的 泪是假的 本来没因果 / 一百年后没有你也没有我' },
      { song: '彼岸花', year: 2000, album: '寓言', line: '看见的 熄灭了 / 消失的 记住了 / 我站在 海角天涯 听见土壤萌芽 等待那一朵 彼岸花' }
    ]
  }
];
