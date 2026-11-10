import { useTypographyReducedMotion } from './useTypographyReducedMotion';
import WarpText from './WarpText';

// Keep readable DOM text when animation is disabled. Only titles get WebGL,
// leaving the scrolling lyric text selectable and keeping GPU usage small.
export function QuietWarpTitle({ text }: { text: string }) {
  const reduced = useTypographyReducedMotion();
  return <div className="ja-warp-title">
    {reduced ? <span className="ja-warp-static">{text}</span> : <WarpText
      text={text}
      fontFamily={'"Noto Serif SC", serif'}
      fontWeight={300}
      fontSize="clamp(5rem, 18vw, 16rem)"
      letterSpacing=".06em"
      color="#28392e"
      warpStrength={.035}
      speed={.16}
      pointerStrength={.14}
      refraction={.006}
      chromatic={0}
      ripple={false}
      idleDrift={.04}
      intro={false}
    />}
  </div>;
}
