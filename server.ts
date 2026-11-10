import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. MOOD PLAYER RECOMMENDATION API
app.post('/api/mood-recommend', async (req: Request, res: Response) => {
  try {
    const { prompt, dimensions } = req.body;
    const moodDesc = prompt || '空灵而略带疏离的午后';
    const dimText = dimensions
      ? `维度偏好：
- 疏离/亲密 (0-100, 0疏离 100亲密): ${dimensions.intimacy ?? 50}
- 冷静/强烈 (0-100, 0冷静 100强烈): ${dimensions.intensity ?? 50}
- 梦幻/现实 (0-100, 0梦幻 100现实): ${dimensions.ethereal ?? 30}
- 实验/流行 (0-100, 0实验 100流行): ${dimensions.experimental ?? 40}`
      : '';

    if (!ai) {
      return res.json({
        success: true,
        source: 'curated_catalog',
        analysis: `根据你所描述的心境「${moodDesc}」，档案库检索到最契合你当下的心绪回响。`,
        recommendations: [
          {
            title: '脸',
            album: '唱游 (1998)',
            albumId: 'changyou',
            year: 1998,
            composer: '王菲',
            lyricist: '林夕',
            arranger: '张亚东',
            reason: '充满实验性华丽唱腔与低吟撕扯，吉他泛音如水滴般晕开，恰好容纳你此刻不想被窥探却又暗涌的心绪。',
            tags: ['实验迷幻', '华丽梦呓', '冷艳自持'],
            frequencyResonance: '84% 疏离美学'
          },
          {
            title: '浮躁',
            album: '浮躁 (1996)',
            albumId: 'fuzao',
            year: 1996,
            composer: '王菲',
            lyricist: '王菲',
            arranger: '张亚东',
            reason: 'Cocteau Twins 式的无字吟唱与跳脱鼓点，没有冗长的大道理，只有纯粹的声音切片与随性喘息。',
            tags: ['Brit-pop', 'Dream Pop', '灵动无拘'],
            frequencyResonance: '92% 随性解构'
          },
          {
            title: '新房客',
            album: '寓言 (2000)',
            albumId: 'yuyan',
            year: 2000,
            composer: '王菲',
            lyricist: '林夕',
            arranger: '张亚东',
            reason: '冰冷电音节拍与王菲漫不经心的吐字，在冷峻与诗意之间划开一道超现实的安全界限。',
            tags: ['Trip-hop', '概念五部曲', '哲学思辨'],
            frequencyResonance: '89% 空间漫游'
          }
        ]
      });
    }

    const systemInstruction = `你是一位专注研究华语先锋音乐与王菲（Faye Wong）美学谱系的资深音乐评论家兼策展人。
你极度熟悉王菲从新艺宝到新艺宝后期（《天空》《迷》《讨好自己》）、百代EMI巅峰（《浮躁》《王菲1997》《唱游》《只爱陌生人》《寓言》）至银鱼音乐《将爱》的所有作品脉络，以及她与张亚东、窦唯、林夕、Cocteau Twins、Adrian Chan、C.Y. Kong、夏永康等人的先锋跨界合作。
根据用户输入的情绪描述和四个维度坐标，推荐3-4首最契合的王菲代表作或冷门神作，用极具文学质感、诗意、犀利而充满90年代港岛美学的文字解析每首歌的推荐理由。
请严格输出JSON格式。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `用户当下情绪描述：「${moodDesc}」\n${dimText}\n请推荐3-4首王菲的作品，并给出精准的音乐美学分析。`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: '针对用户情绪的整体艺术性提炼与共情导言（80字左右）',
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: '歌曲名称' },
                  album: { type: Type.STRING, description: '所属专辑名及年份，如：唱游 (1998)' },
                  albumId: { type: Type.STRING, description: '专辑简写：changyou, yuyan, fuzao, strangers, sky, jiangai, faye1997, coming_home 之一' },
                  year: { type: Type.INTEGER, description: '发行年份' },
                  composer: { type: Type.STRING, description: '作曲人' },
                  lyricist: { type: Type.STRING, description: '作词人' },
                  arranger: { type: Type.STRING, description: '编曲/制作人' },
                  reason: { type: Type.STRING, description: '推荐理由：结合编曲配器、唱腔情绪与用户心境的深刻剖析（100字左右）' },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '风格或情绪标签'
                  },
                  frequencyResonance: { type: Type.STRING, description: '共振指数或关键词，如：94% 梦幻抽离' }
                },
                required: ['title', 'album', 'year', 'reason', 'tags']
              }
            }
          },
          required: ['analysis', 'recommendations']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini',
      ...parsed
    });
  } catch (error) {
    console.error('Mood recommendation error:', error);
    return res.status(500).json({
      error: '无法生成情绪推荐',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    fayeArchiveVersion: '1990-2026',
    aiEnabled: !!ai
  });
});

// Vite or Static handling
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`FAYE Digital Archive server listening on port ${PORT}`);
  });
}

startServer();
