import FuzzyText from '../effects/FuzzyText';
import { useTypographyReducedMotion } from './useTypographyReducedMotion';
export function AtmosphericTitle({ text }: { text: string }) {
  const reduced = useTypographyReducedMotion();
  return <span className="atmospheric-title" aria-label={text}>{reduced ? text : <FuzzyText fontSize="clamp(42px, 9vw, 125px)" fontWeight={300} fontFamily="Songti SC, serif" baseIntensity={.015} hoverIntensity={.18} fuzzRange={12} fps={30} intro introDuration={1100} colorSplit={.06}>{text}</FuzzyText>}</span>;
}
