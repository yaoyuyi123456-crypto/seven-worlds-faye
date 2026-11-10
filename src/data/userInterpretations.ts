/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JIANGAI_FIXED_PHOTOS } from './jiangaiArt';
import { DIDAR_HOLIDAY_PHOTO } from './didarArt';
import { HOLIDAY_LYRICS, HOLIDAY_INTERPRETATION } from './holidayLyrics';

export interface UserLyricEntry {
  id: string;
  songTitle: string;
  albumTitle: string;
  albumId: string;
  year: number;
  // HIGHEST PRIORITY: Raw user-provided lyric text. Never modify or auto-correct.
  rawLyric: string;
  // User's personal perspective & literary interpretation
  userInterpretation: string;
  // Visual & dynamic interaction presentation concept
  visualTheme: string;
  interactionType: 'road_vanishing' | 'night_train_window' | 'micro_macro_ant' | 'light_into_silver' | 'elusive_mask' | 'green_sanpo' | 'fading_paper' | 'hypnosis_drift' | 'love_sigh_orbit' | 'gift_exchange' | 'sunflower_daylight';
  // Associated authentic Faye photo from uploaded archive
  photoUrl: string;
  photoAspect: string;
  photoTitle: string;
  // AI open-ended reflection presets (complementing, never overwriting user view)
  aiOpenPerspectives: {
    lens: string;
    insight: string;
  }[];
}

export const INITIAL_USER_INTERPRETATIONS: UserLyricEntry[] = [
  {
    id: 'holiday_didar',
    songTitle: '假期',
    albumTitle: 'Di-Dar',
    albumId: 'didar',
    year: 1995,
    // EXACT user input:
    rawLyric: HOLIDAY_LYRICS,
    // EXACT user interpretation:
    userInterpretation: HOLIDAY_INTERPRETATION,
    visualTheme: '旅程、短暂、告别、回忆为核心视觉意象。道路向远处延伸、逐渐消失的风景、缓慢淡出的文字。最后一句独立视觉强调，呈现旅程结束后回望过去的感觉。',
    interactionType: 'road_vanishing',
    photoUrl: DIDAR_HOLIDAY_PHOTO,
    photoAspect: 'portrait',
    photoTitle: '旅途与假期 · 阳光下的随性出离',
    aiOpenPerspectives: [
      {
        lens: '词理空间 (林夕与C.Y. Kong)',
        insight: '林夕用「假期」消解了现代爱情沉重的誓言感。假期的本质不在于逗留，而在于「时限」。既然有始有终，那句轻盈的「lalilala～～～」反而承载了最坦诚的释然——爱过即是假期的全部意义。'
      },
      {
        lens: '听觉符号学',
        insight: '迷幻手风琴与带有中东色彩的吉他扫弦营造出旅途列车的车厢晃动感。王菲的人声像车窗外飞掠的浮光，随时准备关门启程。'
      }
    ]
  },
  {
    id: 'passenger_jiangai',
    songTitle: '乘客',
    albumTitle: '将爱',
    albumId: 'jiangai',
    year: 2003,
    // EXACT user input:
    rawLyric: '高架桥过去了，路口还有好多个。天空血红色，星星灰银色，你的爱人呢….',
    // EXACT user interpretation:
    userInterpretation: '城市、夜晚、车窗、移动、陌生人与亲密关系。坐在车内观察世界的流动体验。',
    visualTheme: '城市、夜晚、车窗、移动、陌生人与亲密关系。使用横向移动的城市摄影、窗外光影、模糊的路灯和具有电影感的滚动效果，歌词随画面移动逐渐出现。',
    interactionType: 'night_train_window',
    photoUrl: JIANGAI_FIXED_PHOTOS.passenger_jiangai,
    photoAspect: 'portrait',
    photoTitle: '夜行车窗 · 倒退的都市微光',
    aiOpenPerspectives: [
      {
        lens: '都市疏离哲学',
        insight: '翻唱自 Sophie Zelmani 的《Going Home》，林夕填入极具电影分镜感的文字。「高架桥过去了，路口还有好多个」以极简白描勾勒出都市人的心理漂流，亲密关系沦为暂时的同行者。'
      },
      {
        lens: '色彩隐喻 (王家卫式光影)',
        insight: '「天空血红色，星星灰银色」，强烈的色温对比暗示了黄昏与夜幕交替时分无所适从的情绪悬空。最后一句的省略号不是停顿，而是车轮滚滚向前的无尽延伸。'
      }
    ]
  },
  {
    id: 'buliu_jiangai',
    songTitle: '不留',
    albumTitle: '将爱',
    albumId: 'jiangai',
    year: 2003,
    rawLyric: '我把風情給了你 日子給了他\n我把笑容給了你 寬容給了他\n我把思念給了你 時間給了他\n我把眼淚給了你\n我把照片給了你 日曆給了他\n我把顏色給了你 風景給了他\n我把距離給了你 無言給了他\n我把煙花給了你 節日給了他\n我把電影票給了你 我把座位給了他\n我把燭光給了你 晚餐給了他\n我把歌點給了你 麥克風遞給他\n聲音給了你 畫面給了他\n我把情節給了你 結局給了他\n我把水晶鞋給了你 十二點給了他\n我把心給了你 身體給了他\n情願甚麼也不留下\n再也沒有甚麼牽掛\n如果我還有哀傷 讓風吹散他\n如果我還有快樂',
    userInterpretation: '把属于自己的事物一件件交出去，最后连牵挂也留在风里。',
    visualTheme: '照片、票根与日历页在两个方向缓慢漂移，字句逐段交付，最后只剩未被占据的留白。',
    interactionType: 'gift_exchange',
    photoUrl: JIANGAI_FIXED_PHOTOS.buliu_jiangai,
    photoAspect: 'portrait',
    photoTitle: '不留 · 交付与空白',
    aiOpenPerspectives: [
      { lens: '物件清单', insight: '每一件被交付的物品都标记一段共同生活，也让叙述逐渐变得轻。' },
      { lens: '留白结构', insight: '最后的空白不是遗失，而是终于不再被关系占满的空间。' }
    ]
  },
  {
    id: 'yangbao_jiangai',
    songTitle: '阳宝',
    albumTitle: '将爱',
    albumId: 'jiangai',
    year: 2003,
    rawLyric: '需要阳光的宝贝 我的向日葵，只在阳光下灿烂，善于激情中优美。',
    userInterpretation: '向日葵随光线转向，在热烈与明亮之间找到自己的姿态。',
    visualTheme: '以真实日光和向日葵般的转向构成动态场景；光线随滚动缓慢移动，歌词在明处逐句浮现。',
    interactionType: 'sunflower_daylight',
    photoUrl: JIANGAI_FIXED_PHOTOS.yangbao_jiangai,
    photoAspect: 'portrait',
    photoTitle: '阳宝 · 向阳而生',
    aiOpenPerspectives: [
      { lens: '光的方向', insight: '画面保持原始色彩，亮度变化只由缓慢移动的日光层产生。' },
      { lens: '向日葵', insight: '花盘不静止地朝向光源，成为歌曲中依赖、热烈与自我生长的动态隐喻。' }
    ]
  },
  {
    id: 'kaidaotumi_stranger',
    songTitle: '开到荼蘼',
    albumTitle: '只爱陌生人',
    albumId: 'faye1997', // belongs to the late 90s era (1999)
    year: 1999,
    // EXACT user input:
    rawLyric: '每只蚂蚁都有眼睛鼻子，每一个人遇见所爱的人都心有余悸。',
    // EXACT user interpretation:
    userInterpretation: '又是把人类比作蚂蚁，自然界的规律在人的情感上复演。',
    visualTheme: '微观与宏观、自然与情感。显微镜视角、蚂蚁微小生命与庞大情绪宇宙对比，缩放微距交互。',
    interactionType: 'micro_macro_ant',
    photoUrl: '/assets/aistudio/IMG_1624_ebcad229.JPG', // Faye lying on floor, dramatic avant-garde posture
    photoAspect: 'landscape',
    photoTitle: '微观复演 · 荒诞与庞大的人类心绪',
    aiOpenPerspectives: [
      {
        lens: '生命尺度视差',
        insight: '将庞大的人类戏剧压缩至昆虫微尘的尺度。蚂蚁也拥有感知五官，人的心有余悸在宇宙演化长河中同样不过是分子层面的应激反应。'
      },
      {
        lens: '失真扩音器声学',
        insight: 'C.Y. Kong 标志性的工业摇滚失真鼓点与王菲被 Megaphone 滤镜压缩的人声，模拟了神经末梢短路时的蜂鸣感，打破了传统华语抒情歌的平稳叙事。'
      }
    ]
  },
  {
    id: 'equinox_yuyan',
    songTitle: '彼岸花',
    albumTitle: '寓言',
    albumId: 'yuyan',
    year: 2000,
    // EXACT user input:
    rawLyric: '天黑 刷白了头发。',
    // EXACT user interpretation:
    userInterpretation: '太美的意境。极致极简、黑白光影、东方宿命感。',
    visualTheme: '极致极简、黑白光影、东方宿命感。从纯黑渐变到白发银光，静止而震撼的文字意境，时空在一瞬间白头。',
    interactionType: 'light_into_silver',
    photoUrl: '/assets/aistudio/fable_rainbow_eyes_clean.jpg', // Authentic Faye Wong Fable Rainbow Eyes Artwork
    photoAspect: 'portrait',
    photoTitle: '天黑与银丝 · 极简宿命的光斑',
    aiOpenPerspectives: [
      {
        lens: '东方写意与色彩倒置',
        insight: '正常逻辑是「岁月催白了头」，林夕用「天黑 刷白了头发」这一主动句式，让黑夜化身为一位执笔的无形画师。一瞬间将浩瀚时间凝结于一寸青丝。'
      },
      {
        lens: '弦乐电子的彼岸引渡',
        insight: '王菲亲谱前五首曲子，《彼岸花》是终篇。大提琴与沉缓电子脉冲交织，像灵魂脱离重力穿过幽暗水域，在彼岸看见静默的花开。'
      }
    ]
  },
  {
    id: 'new_tenant_yuyan',
    songTitle: '新房客',
    albumTitle: '寓言',
    albumId: 'yuyan',
    year: 2000,
    // EXACT user input:
    rawLyric: '我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。',
    // EXACT user interpretation:
    userInterpretation: '比喻想要了解一个人却怎么都看不透。看见了世界，却无法看透一个人。',
    visualTheme: '遮挡、隐匿、未解之谜。"看见世界，却无法看透一个人"的光影遮罩探索，光标移动探索无法完全揭开的面纱。',
    interactionType: 'elusive_mask',
    photoUrl: '/assets/aistudio/IMG_1626_52f07706.JPG', // Cinematic purple/pink, elusive gaze
    photoAspect: 'portrait',
    photoTitle: '隐匿与遮蔽 · 无法透视的亲密客体',
    aiOpenPerspectives: [
      {
        lens: '认知失焦论',
        insight: '你能目睹大自然最暴烈的海啸、天空中最轻盈的飞鸟，却抓不住面前那个人最细微的情绪切片。这道对比构筑了现代亲密关系中永恒的认知壁垒。'
      },
      {
        lens: '王菲的漫游旋律',
        insight: '王菲的曲调没有传统主副歌的强烈高潮，而是像水滴滑过玻璃表面，冷感、游离，把「看不透」写成了一种理所当然的释然。'
      }
    ]
  },
  {
    id: 'sanpo_fuzao',
    songTitle: '野三坡',
    albumTitle: '浮躁',
    albumId: 'fuzao',
    year: 1996,
    // EXACT user input:
    rawLyric: '窦唯竹笛长鸣，王菲山谷纵马；北方旷野的大风，永驻此曲。',
    userInterpretation: '山野自然、长笛与呼吸感。王菲与窦唯在野三坡骑马采风，音乐像风一样穿过山谷。',
    visualTheme: '野三坡骑马原图、山脊与溪流的自然影像，粗粝颗粒随风轻轻移动。',
    interactionType: 'green_sanpo',
    photoUrl: '/assets/fuzao/photo-06.jpg', // User's final uploaded Yesanpo photograph
    photoAspect: 'landscape',
    photoTitle: 'YESANPO 1996 · 绝望逆流与甘心罗网',
    aiOpenPerspectives: [
      {
        lens: '极度克制的悲剧浪漫',
        insight: '「绝望的逆流而上，甘心的自投罗网～」将自我交付给明知无常的宿命。在野三坡群山环抱间，这声叹息具有无与伦比的旷达与坦然。'
      },
      {
        lens: '自然呼吸与草绿色块',
        insight: '纯色草绿色与骑马纪实胶片碰撞出纯粹的先锋编辑感，逃离都市效率规训，回归原始旷野。'
      }
    ]
  },
  {
    id: 'drop_fuzao',
    songTitle: '堕落',
    albumTitle: '浮躁',
    albumId: 'fuzao',
    year: 1996,
    rawLyric: '绝望的逆流而上，甘心的自投罗网。',
    userInterpretation: '夜色中短暂脱离秩序，笑声与叹息一起落下。',
    visualTheme: '深夜、失序、孩子般的游戏感与渐渐收束的呼吸。',
    interactionType: 'green_sanpo',
    photoUrl: '/assets/aistudio/IMG_5421_f530edaa.png',
    photoAspect: 'landscape',
    photoTitle: '浮躁夜色 · 野性与松弛',
    aiOpenPerspectives: [
      {
        lens: '夜色与游戏感',
        insight: '把成年人的规训暂时放下，笑与哭都不必向任何人交代。'
      },
      {
        lens: '失序的温柔',
        insight: '歌曲将放纵写得轻盈，像一场不需要结论的夜间游戏。'
      }
    ]
  },
  {
    id: 'cuimian_stranger',
    songTitle: '催眠',
    albumTitle: '只爱陌生人',
    albumId: 'strangers',
    year: 1999,
    // EXACT user input:
    rawLyric: '第一口蛋糕的滋味\n第一件玩具帶來的安慰\n太陽上山 太陽下山 冰淇淋流淚\n忽然天亮 忽然天黑\n諸如此類 遠走高飛\n一二三歲 四五六歲 千秋萬歲',
    // EXACT user interpretation:
    userInterpretation: '玩具、太阳、冰淇淋、岁月的流转。超现实童谣般的恍惚与漂浮感。',
    visualTheme: '漂浮的童谣梦境与多重视角胶片（奔跑小狗、狂野甩发与大巴呼喊）。歌词在时空中如气泡般漂浮。',
    interactionType: 'hypnosis_drift',
    photoUrl: '/assets/aistudio/IMG_5412_34ca1f0a.jpeg', // Faye with little dog running
    photoAspect: 'landscape',
    photoTitle: '催眠童谣 · 玩具与奔跑的午后',
    aiOpenPerspectives: [
      {
        lens: '潜意识童谣解构',
        insight: '林夕用儿歌般的白描「太阳上山，太阳下山，冰淇凌流泪」，将时间庞大流逝隐喻于融化的甜腻中，千秋万岁不过是眨眼之间。'
      },
      {
        lens: '英伦吉他催眠音墙',
        insight: '郭伟亮谱曲，沉缓吉他扫弦如钟摆晃动，王菲的人声像从梦魇深处传来的童年回响，恍惚而治愈。'
      }
    ]
  },
  {
    id: 'woaini_jiangai',
    songTitle: '我爱你',
    albumTitle: '将爱',
    albumId: 'jiangai',
    year: 2003,
    // EXACT user input:
    rawLyric: '爱…哎…爱…哎….',
    // EXACT user interpretation:
    userInterpretation: '爱与叹息的循环。爱…哎…爱…哎….四个字慢慢靠近又分开。',
    visualTheme: '爱与哎的引力潮汐。四个字慢慢靠近又分开，在私密、脆弱的近景肖像间呼吸流动。',
    interactionType: 'love_sigh_orbit',
    photoUrl: '/assets/aistudio/IMG_5432_ee2874af.jpeg', // Faye intimate pillow direct gaze
    photoAspect: 'portrait',
    photoTitle: '爱与叹息 · 私密脆弱的凝视',
    aiOpenPerspectives: [
      {
        lens: '叹词的终极情感张力',
        insight: '从第四声的「爱」到第一声轻叹的「哎」，只差一个声调与偏旁，却道尽了亲密关系中所有的欢愉与无可奈何。'
      },
      {
        lens: '引力潮汐与呼吸视差',
        insight: '两组字如同宇宙中互相牵引的孤星，靠近时炽热如火，分开时落寞如叹息，在私密肖像中形成永恒的呼吸。'
      }
    ]
  },
  {
    id: 'red_bean_changyou',
    songTitle: '红豆',
    albumTitle: '唱游',
    albumId: 'changyou',
    year: 1998,
    // EXACT user input:
    rawLyric: '没有什么会永垂不朽。',
    // EXACT user interpretation:
    userInterpretation: '没有什么会永垂不朽，金曲也不例外。就像那首被许多人嗤之以鼻的《红豆》，曾经被奉为经典，如今却也难逃被重新审视的命运。',
    visualTheme: '剥离商业刻板印象，回归最纯粹的宿命悲凉。随时间消散的风化文字、泛黄纸张与时间痕迹。',
    interactionType: 'fading_paper',
    photoUrl: '/assets/aistudio/d9e6a8bdb47286e97643bd0194102f16_d6ef450c.JPG', // Vintage paper/autograph book portrait
    photoAspect: 'portrait',
    photoTitle: '时间的风化 · 永垂不朽的反讽与悲凉',
    aiOpenPerspectives: [
      {
        lens: '大众化与哲学内核的共生',
        insight: '正因旋律极度流行，这句「没有什么会永垂不朽」才得以被数百万人无意识地传唱。柳重言的旋律如温水，而林夕的佛理如沉底的冰块——看似煽情流行，实为虚无主义的最高宣讲。'
      },
      {
        lens: '风化文字的美学转化',
        insight: '红豆熬成伤口的隐喻，在王菲内敛、克制的气声下，没有撕心裂肺的哭腔，只有接受万物终将瓦解的宁静庄严。'
      }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'faye_user_interpretations_v3';

export function loadUserInterpretations(): UserLyricEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_USER_INTERPRETATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Sync canonical photoUrls and default assets
      const savedEntries = parsed.map((item: UserLyricEntry) => {
        const canonical = INITIAL_USER_INTERPRETATIONS.find(i => i.id === item.id);
        if (!canonical) return item;
        return {
          ...item,
          songTitle: canonical.songTitle,
          albumTitle: canonical.albumTitle,
          albumId: canonical.albumId,
          year: canonical.year,
          photoUrl: canonical.photoUrl,
          rawLyric: item.id === 'passenger_jiangai' ? item.rawLyric.replace('路口还有好过个', '路口还有好多个') : item.rawLyric
        };
      });
      const savedIds = new Set(savedEntries.map((item: UserLyricEntry) => item.id));
      return [...savedEntries, ...INITIAL_USER_INTERPRETATIONS.filter(item => !savedIds.has(item.id))];
    }
  } catch (e) {
    console.warn('Failed to parse user interpretations from localStorage', e);
  }
  return INITIAL_USER_INTERPRETATIONS;
}

export function saveUserInterpretations(entries: UserLyricEntry[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save user interpretations', e);
  }
}

export function resetUserInterpretations(): UserLyricEntry[] {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  return INITIAL_USER_INTERPRETATIONS;
}
