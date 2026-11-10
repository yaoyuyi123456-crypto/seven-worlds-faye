import { YuyanFuzzyLyric } from '../typography/YuyanFuzzyLyric';
import { usePageStart } from '../typography/usePageStart';
import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SpaceXinfangke, SpaceBihanhua, SpaceXiangnaier } from '../yuyan/YuyanPoetrySpaces';
import { SEVEN_WORLDS } from '../../data/sevenWorlds';
import FallingText from '../effects/FallingText';
import { useTypographyReducedMotion } from '../typography/useTypographyReducedMotion';
import './WorldYuyan.css';
import Hyperspeed from '../effects/Hyperspeed';
const world = SEVEN_WORLDS.find(world => world.id === 'yuyan')!;
const songs = [
  { title: '新房客', question: '我能否真正理解你？', photo: '/assets/aistudio/IMG_5420_3984ad28.jpeg', Component: SpaceXinfangke, thought: '看见了大自然壮阔的海啸、天空中自由的飞鸟，却始终无法穿透面前那个人最细微的微笑与真实的温度。', gravity: .45 },
  { title: '彼岸花', question: '美丽是否必然与消逝相伴？', photo: '/assets/aistudio/fable_rainbow_eyes_clean.jpg', Component: SpaceBihanhua, thought: '以黑夜主动执笔将青丝染为白。极尽绚烂的东方宿命隐喻，消逝不是毁灭，而是超越时空的终极涅槃。', gravity: -.3 },
  { title: '香奈儿', question: '在爱与被爱之间，究竟是谁塑造了谁？', photo: '/assets/aistudio/IMG_5419_b796a387.jpeg', Component: SpaceXiangnaier, thought: '拒绝将《香奈儿》简化为消费主义或品牌崇拜。它是关于亲密关系中身份、角色与主动权的动态流动与相互塑造。', gravity: .3 }
];
export const WorldYuyan: React.FC<{ onBackToCosmos: () => void; onSwitchWorld: (id: string) => void; initialSong?: string }> = ({ onBackToCosmos, onSwitchWorld, initialSong }) => {
  const [selected, setSelected] = useState<number | null>(() => { const index = songs.findIndex(song => song.title === initialSong); return index < 0 ? null : index; });
  const [reset, setReset] = useState(0);
  usePageStart(selected);
  const reduced = useTypographyReducedMotion();
  const select = (index: number | null) => { setSelected(index); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const song = selected === null ? null : songs[selected];
  const track = selected === null ? null : world.tracks[selected];
  const Space = song?.Component;
  const continuation = selected === 1 ? '紧握着我火把，他来我对自己说，我不害怕，我很爱他' : selected === 2 ? '那么多的玻璃鞋每个人都合适没有独一无二' : null;
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}><main className={`yy-world yy-restored ${song ? 'yy-in-song' : 'yy-in-directory'}`} style={song ? { '--yy-song-photo': `url("${song.photo}")` } as React.CSSProperties : undefined}>
    <nav className="yy-nav"><button onClick={onBackToCosmos}>← HOME</button><div>{song && <button onClick={() => select(null)}>寓言目录</button>}{songs.map((item, index) => <button key={item.title} aria-current={selected === index ? 'page' : undefined} onClick={() => select(index)}>{item.title}</button>)}</div></nav>
    {!song ? <section className="yy-directory-field">
      <img className="yy-directory-photo" src={songs[0].photo} alt="王菲《寓言》摄影" />
      <div className="yy-floating-eyes"><img src="/assets/faye/yuyan-floating-eyes.jpg" alt="王菲彩色眼影摄影，悬浮的凝视" /></div>
      <div className="yy-hyperspeed-entry"><Hyperspeed curve="winding" curvature={1} speed={1} boost={3} fov={90} boostFov={130} lanes={3} roadWidth={10} medianWidth={2} density={40} trailLength={1} lightSize={1} poles={20} dust={100} glow={.6} reflections={.5} roadOpacity={.1} steer={.35} tailColors={['#d856bf','#6750a2','#c247ac']} headColors={['#03b3c3','#0e5ea5','#324555']} poleColors={['#03b3c3']} interactive /></div>
      <h1>寓言<small>FABLE / 2000</small></h1>
      <p className="yy-premise">一场关于亲密关系、时间与身份的视觉寓言展。</p>
      {!reduced && <p className="yy-hyperspeed-hint">移动视线 · 按住空白处加速 · 松开返回</p>}
      <div className="yy-entrances">{songs.map((item, index) => <button key={item.title} onClick={() => select(index)}><span>0{index + 1}</span><strong>{item.title}</strong><em>{item.question}</em></button>)}</div>
    </section> : <>
      <section className={`yy-live-installation yy-live-${selected}`} aria-label={`${song.title}交互艺术空间`}>
        {Space && <Space key={song.title} isFullscreen />}
      </section>
      {continuation && <section className={`yy-thought-field yy-continuation yy-continuation-${selected}`} style={{ '--yy-photo': `url("${song.photo}")` } as React.CSSProperties}>
        <div className="yy-falling-stage" role="group" aria-label="悬停歌词，文字横向模糊">
          <YuyanFuzzyLyric key={`${song.title}-${reset}`} text={continuation}/>
        </div>
        <div className="yy-text-actions"><span>{reduced ? '歌词原文' : '悬停文字 · 横向模糊 · 移开复原'}</span><button onClick={() => setReset(value => value + 1)}>复原文字 ↺</button></div>
      </section>}
    </>}
    <footer className="yy-ending">{song && <><button onClick={() => select(null)}>← 返回《寓言》专辑目录</button><button onClick={() => select((selected! + 1) % songs.length)}>走向下一首 ↗</button></>}<button onClick={onBackToCosmos}>HOME</button><button onClick={() => onSwitchWorld('jiangai')}>将爱 ↗</button></footer>
  </main></MotionConfig>;
};
