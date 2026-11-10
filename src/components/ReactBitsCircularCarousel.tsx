import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './ReactBitsCircularCarousel.css';

export interface CircularCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

type Preset = 'cylinder' | 'orbit' | 'wheel' | 'panorama';
type Intro = 'assemble' | 'rise' | 'spin' | 'none';
type Autoplay = 'drift' | 'step' | 'off';
type Axis = 'x' | 'y';
type Point3 = [number, number, number];

interface PresetLayout {
  axis: Axis;
  tilt: number;
  perspective: number;
  curve: number;
  spread: number;
  inward: boolean;
  billboard: boolean;
  backfaces: boolean;
  window: number;
}

interface Tile {
  index: number;
  total: number;
  start: number;
  end: number;
  size: number;
  move: string;
}

interface DragSample { time: number; angle: number }
interface PressState {
  id: number;
  x: number;
  y: number;
  angle: number;
  moved: boolean;
  origin: number;
  samples: DragSample[];
}
interface IntroState { type: Intro; start: number }
interface CarouselState {
  angle: number;
  velocity: number;
  target: number | null;
  dir: number;
  press: PressState | null;
  drag: boolean;
  hover: boolean;
  pointer: { inside: boolean; x: number; y: number };
  yaw: number;
  pitch: number;
  intro: IntroState | null;
  introDone: boolean;
  holdUntil: number;
  stepAt: number;
  suppressClick: boolean;
  wheelTimer: number | null;
  fit: number;
  shift: number;
  drop: number;
  last: number;
}

interface CircularCarouselProps {
  items: CircularCarouselItem[];
  preset?: Preset;
  intro?: Intro;
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  curve?: number;
  tilt?: number;
  perspective?: number;
  autoplay?: Autoplay;
  speed?: number;
  interval?: number;
  direction?: 'left' | 'right';
  draggable?: boolean;
  momentum?: number;
  snap?: boolean;
  pauseOnHover?: boolean;
  focusOnClick?: boolean;
  parallax?: number;
  stretch?: number;
  depthFade?: number;
  fadeColor?: string;
  innerShade?: number;
  cornerRadius?: number;
  captions?: boolean;
  onChange?: (index: number) => void;
  onItemClick?: (item: CircularCarouselItem, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const PRESETS: Record<Preset, PresetLayout> = {
  cylinder: { axis: 'y', tilt: -5, perspective: 2500, curve: 1, spread: 1, inward: false, billboard: false, backfaces: true, window: 0 },
  orbit: { axis: 'y', tilt: -16, perspective: 1500, curve: 0, spread: 1.45, inward: false, billboard: true, backfaces: false, window: 0 },
  wheel: { axis: 'x', tilt: 0, perspective: 1800, curve: 0, spread: 1, inward: false, billboard: false, backfaces: true, window: 1.7 },
  panorama: { axis: 'y', tilt: 0, perspective: 0, curve: 1, spread: 1, inward: true, billboard: false, backfaces: false, window: 0 }
};

const INTRO_LENGTH: Record<Intro, number> = { assemble: 1500, rise: 1400, spin: 1800, none: 0 };
const TILES = 8;
const OVERLAP = 2.5;
const DRAG_THRESHOLD = 5;
const SPRING = 118;
const SETTLE_SPEED = 9;
const CAPTION_SPACE = 76;
const SWAP_LENGTH = 700;
const SWAP_SPREAD = 420;
const TO_RAD = Math.PI / 180;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (degrees: number) => ((((degrees + 180) % 360) + 360) % 360) - 180;
const easeOut = (value: number) => 1 - Math.pow(1 - value, 4);
const easeOutQuint = (value: number) => 1 - Math.pow(1 - value, 5);

const rotateX = ([x, y, z]: Point3, degrees: number): Point3 => {
  const radians = degrees * TO_RAD;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return [x, y * cosine - z * sine, y * sine + z * cosine];
};

const rotateY = ([x, y, z]: Point3, degrees: number): Point3 => {
  const radians = degrees * TO_RAD;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return [x * cosine + z * sine, y, -x * sine + z * cosine];
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return reduced;
};

const Digits: React.FC<{ value: number }> = ({ value }) => (
  <span className="circular-carousel__digits">
    {String(value).padStart(2, '0').split('').map((digit, index) => (
      <span key={index} className="circular-carousel__digit">
        <span className="circular-carousel__reel" style={{ transform: `translateY(${-Number(digit) * 10}%)` }}>
          {'0123456789'.split('').map(number => <span key={number}>{number}</span>)}
        </span>
      </span>
    ))}
  </span>
);

const CircularCarousel: React.FC<CircularCarouselProps> = ({
  items,
  preset = 'cylinder',
  intro = 'rise',
  cardWidth = 220,
  aspectRatio = 1,
  gap = 25,
  curve,
  tilt,
  perspective,
  autoplay = 'drift',
  speed = 14,
  interval = 3,
  direction = 'left',
  draggable = true,
  momentum = 0.6,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  parallax = 0.3,
  stretch = 0.5,
  depthFade = 0.55,
  fadeColor = '#000000',
  innerShade = 0.6,
  cornerRadius = 12,
  captions = false,
  onChange,
  onItemClick,
  className = '',
  style
}) => {
  const incoming = items;
  const [list, setList] = useState<CircularCarouselItem[]>(incoming);
  const [leaving, setLeaving] = useState<{ id: number; items: CircularCarouselItem[]; delays: number[] } | null>(null);
  const count = list.length;
  const shape: Preset = PRESETS[preset] ? preset : 'cylinder';
  const layout = PRESETS[shape];
  const axis = layout.axis;
  const tiltValue = tilt ?? layout.tilt;
  const curveValue = layout.billboard ? 0 : clamp(curve ?? layout.curve, 0, 1);
  const reduced = usePrefersReducedMotion();
  const cardW = Math.max(40, cardWidth);
  const cardH = cardW / clamp(aspectRatio, 0.2, 5);
  const along = axis === 'x' ? cardH : cardW;
  const step = count ? 360 / count : 0;

  const radius = useMemo(() => {
    const number = Math.max(count, 3);
    const pitch = (along + gap) * layout.spread;
    const chord = pitch / (2 * Math.sin(Math.PI / number));
    const arc = (number * pitch) / (2 * Math.PI);
    return Math.max(chord + (arc - chord) * curveValue, along * 0.6);
  }, [count, along, gap, curveValue, layout.spread]);

  const tiles = useMemo<Tile[]>(() => {
    const total = curveValue > 0.001 ? TILES : 1;
    const length = along / total;
    const bend = curveValue > 0.001 ? radius / curveValue : 0;
    return Array.from({ length: total }, (_, index) => {
      const start = index * length - (index > 0 ? OVERLAP / 2 : 0);
      const end = (index + 1) * length + (index < total - 1 ? OVERLAP / 2 : 0);
      const center = (start + end) / 2 - along / 2;
      const alpha = bend ? center / bend : 0;
      const shift = bend ? bend * Math.sin(alpha) : center;
      const sink = bend ? bend * (1 - Math.cos(alpha)) : 0;
      const depth = layout.inward ? sink : -sink;
      const turn = ((layout.inward ? -alpha : alpha) * 180) / Math.PI;
      const move = axis === 'x'
        ? `translate3d(0px, ${shift}px, ${depth}px) rotateX(${-turn}deg)`
        : `translate3d(${shift}px, 0px, ${depth}px) rotateY(${turn}deg)`;
      return { index, total, start, end, size: end - start, move };
    });
  }, [along, axis, curveValue, layout.inward, radius]);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wakeRef = useRef<() => void>(() => undefined);
  const measureRef = useRef<() => void>(() => undefined);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const readyRef = useRef(false);
  readyRef.current = ready;

  const stateRef = useRef<CarouselState>({
    angle: 0, velocity: 0, target: null, dir: 0, press: null, drag: false, hover: false,
    pointer: { inside: false, x: 0, y: 0 }, yaw: 0, pitch: 0, intro: null,
    introDone: false, holdUntil: 0, stepAt: 0, suppressClick: false, wheelTimer: null,
    fit: 1, shift: 0, drop: 0, last: 0
  });

  const settings = {
    count, step, radius, layout, axis, tilt: tiltValue,
    perspective: layout.inward ? radius : (perspective ?? layout.perspective),
    cardW, cardH, intro: reduced ? 'none' as Intro : intro in INTRO_LENGTH ? intro : 'rise' as Intro,
    autoplay: reduced ? 'off' as Autoplay : autoplay, speed, interval: Math.max(0.5, interval),
    draggable, momentum: clamp(momentum, 0, 1), snap, pauseOnHover,
    parallax: reduced ? 0 : clamp(parallax, 0, 1), stretch: reduced ? 0 : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1), captions, reduced
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const dragSign = layout.inward ? -1 : 1;
  const directionSign = (direction === 'right' ? 1 : -1) * dragSign;

  useEffect(() => {
    stateRef.current.dir = directionSign;
    wakeRef.current();
  }, [directionSign]);

  const incomingRef = useRef(incoming);
  incomingRef.current = incoming;
  const listRef = useRef(list);
  listRef.current = list;
  const sourcesKey = incoming.map(item => item.src).join('|');

  useEffect(() => {
    let cancelled = false;
    const next = incomingRef.current;
    const smooth = readyRef.current && next.length === listRef.current.length;
    if (!smooth) {
      setReady(false);
      setLeaving(null);
      setList(next);
    }
    const load = (src: string) => new Promise<void>(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (image.decode) void image.decode().then(() => resolve(), () => resolve());
        else resolve();
      };
      image.onerror = () => resolve();
      image.src = src;
    });
    const timeout = new Promise<void>(resolve => window.setTimeout(resolve, 2400));
    Promise.race([Promise.all(next.slice(0, 16).map(item => load(item.src))), timeout]).then(() => {
      if (cancelled) return;
      const state = stateRef.current;
      if (smooth) {
        const previous = listRef.current;
        const currentSettings = settingsRef.current;
        if (!currentSettings.reduced && previous !== next) {
          setLeaving(current => ({
            id: (current?.id || 0) + 1,
            items: previous,
            delays: previous.map((_item, index) => (Math.abs(wrap(index * currentSettings.step + state.angle)) / 180) * SWAP_SPREAD)
          }));
        }
        setList(next);
        wakeRef.current();
        return;
      }
      state.introDone = false;
      state.intro = null;
      setReady(true);
      wakeRef.current();
    });
    return () => { cancelled = true; };
  }, [sourcesKey]);

  useEffect(() => {
    if (!leaving) return undefined;
    const timer = window.setTimeout(() => setLeaving(null), SWAP_LENGTH + SWAP_SPREAD + 80);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const ring = ringRef.current;
    if (!root || !stage || !camera || !ring) return undefined;
    const state = stateRef.current;
    let raf = 0;
    let visible = true;

    const nearest = (angle: number) => Math.round(angle / settingsRef.current.step) * settingsRef.current.step;
    const measure = () => {
      const currentSettings = settingsRef.current;
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const room = currentSettings.captions ? CAPTION_SPACE : 0;
      const width = rect.width * 0.94;
      const height = (rect.height - room) * 0.92;
      const distance = currentSettings.perspective;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      if (currentSettings.layout.inward) {
        minX = -width / 2;
        maxX = width / 2;
        minY = -currentSettings.cardH / 2;
        maxY = currentSettings.cardH / 2;
      } else {
        const corners: Array<[number, number]> = [
          [-currentSettings.cardW / 2, -currentSettings.cardH / 2],
          [currentSettings.cardW / 2, -currentSettings.cardH / 2],
          [-currentSettings.cardW / 2, currentSettings.cardH / 2],
          [currentSettings.cardW / 2, currentSettings.cardH / 2]
        ];
        const limit = currentSettings.layout.window ? currentSettings.layout.window * currentSettings.step : 180;
        for (let angle = -limit; angle <= limit; angle += limit / 24) {
          for (const [cornerX, cornerY] of corners) {
            let point: Point3;
            if (currentSettings.axis === 'x') point = rotateY(rotateX([cornerX, cornerY, currentSettings.radius], -angle), currentSettings.tilt);
            else if (currentSettings.layout.billboard) {
              const center = rotateY([0, 0, currentSettings.radius], angle);
              point = rotateX([center[0] + cornerX, cornerY, center[2]], currentSettings.tilt);
            } else point = rotateX(rotateY([cornerX, cornerY, currentSettings.radius], angle), currentSettings.tilt);
            point = [point[0], point[1], point[2] - currentSettings.radius];
            if (point[2] >= distance * 0.95) continue;
            const scale = distance / (distance - point[2]);
            minX = Math.min(minX, point[0] * scale);
            maxX = Math.max(maxX, point[0] * scale);
            minY = Math.min(minY, point[1] * scale);
            maxY = Math.max(maxY, point[1] * scale);
          }
        }
      }
      const fit = Math.min(1, width / Math.max(maxX - minX, 1), height / Math.max(maxY - minY, 1));
      state.fit = fit;
      state.shift = -((minY + maxY) / 2) * fit - room / 2;
      state.drop = (currentSettings.axis === 'x' ? rect.width : rect.height) / fit * 0.55 + currentSettings.cardW;
      stage.style.perspective = `${distance}px`;
      stage.style.transform = `translate3d(0, ${state.shift}px, 0) scale(${fit})`;
    };
    measureRef.current = measure;

    const introCard = (elapsed: number, landing: number) => {
      if (!state.intro) return { radius: 1, lift: 0 };
      const distance = Math.abs(wrap(landing + state.angle));
      if (state.intro.type === 'assemble') {
        const delay = distance / 180 * 420;
        const progress = easeOut(clamp((elapsed - delay) / 1080, 0, 1));
        return { radius: 1 + 0.6 * (1 - progress), lift: 0 };
      }
      if (state.intro.type === 'rise') {
        const delay = distance / 180 * 480;
        const progress = easeOutQuint(clamp((elapsed - delay) / 900, 0, 1));
        return { radius: 1, lift: (1 - progress) * state.drop };
      }
      if (state.intro.type === 'spin') {
        const progress = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1));
        return { radius: 1 + 0.28 * (1 - progress), lift: 0 };
      }
      return { radius: 1, lift: 0 };
    };

    const advance = (currentSettings: typeof settings, delta: number, now: number) => {
      if (!state.introDone && readyRef.current) {
        if (!state.intro) {
          if (currentSettings.intro === 'none') state.introDone = true;
          else state.intro = { type: currentSettings.intro, start: now };
        }
        if (state.intro && now - state.intro.start >= INTRO_LENGTH[state.intro.type]) {
          state.intro = null;
          state.introDone = true;
        }
      }
      const paused = (currentSettings.pauseOnHover && state.hover) || state.drag || now < state.holdUntil;
      const cruise = currentSettings.autoplay === 'drift' && !paused && !state.intro ? currentSettings.speed * state.dir : 0;
      let busy = Boolean(state.intro) || state.drag;
      if (state.drag || state.intro) state.velocity = state.drag ? state.velocity : 0;
      else if (state.target !== null) {
        let remaining = delta;
        const damping = 2 * Math.sqrt(SPRING);
        while (remaining > 0) {
          const intervalStep = Math.min(remaining, 1 / 240);
          const acceleration = SPRING * (state.target - state.angle) - damping * state.velocity;
          state.velocity += acceleration * intervalStep;
          state.angle += state.velocity * intervalStep;
          remaining -= intervalStep;
        }
        if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
          state.angle = state.target;
          state.velocity = 0;
          state.target = null;
        }
        busy = true;
      } else {
        const tau = 0.18 + currentSettings.momentum * 1.5;
        state.velocity += (cruise - state.velocity) * (1 - Math.exp(-delta / tau));
        state.angle += state.velocity * delta;
        if (cruise === 0 && currentSettings.snap && Math.abs(state.velocity) < SETTLE_SPEED) state.target = nearest(state.angle);
        busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null;
      }
      if (currentSettings.autoplay === 'step' && !paused && !state.intro && state.introDone) {
        if (!state.stepAt) state.stepAt = now + currentSettings.interval * 1000;
        if (now >= state.stepAt) {
          state.target = (state.target ?? nearest(state.angle)) + currentSettings.step * state.dir;
          state.stepAt = now + currentSettings.interval * 1000;
        }
        busy = true;
      } else state.stepAt = 0;
      if (now < state.holdUntil) busy = true;
      const ease = 1 - Math.exp(-delta / 0.35);
      const aimYaw = state.pointer.inside ? state.pointer.x * currentSettings.parallax * 9 : 0;
      const aimPitch = state.pointer.inside ? -state.pointer.y * currentSettings.parallax * 6 : 0;
      state.yaw += (aimYaw - state.yaw) * ease;
      state.pitch += (aimPitch - state.pitch) * ease;
      if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true;
      return busy;
    };

    const render = (currentSettings: typeof settings, now: number) => {
      const elapsed = state.intro ? now - state.intro.start : 0;
      const swell = 1 + currentSettings.stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420);
      let spinOffset = 0;
      if (state.intro?.type === 'spin') spinOffset = -300 * state.dir * (1 - easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1)));
      else if (state.intro?.type === 'assemble') spinOffset = -32 * state.dir * (1 - easeOut(clamp(elapsed / INTRO_LENGTH.assemble, 0, 1)));
      const angle = state.angle + spinOffset;
      const ringRadius = currentSettings.radius * swell;
      if (currentSettings.axis === 'x') {
        camera.style.transform = `translate3d(0, 0, ${-ringRadius}px) rotateY(${currentSettings.tilt + state.yaw}deg) rotateX(${state.pitch}deg)`;
        ring.style.transform = `rotateX(${-angle}deg)`;
      } else if (currentSettings.layout.inward) {
        camera.style.transform = `translate3d(0, 0, ${currentSettings.perspective - 1}px) rotateX(${currentSettings.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;
        ring.style.transform = `rotateY(${angle}deg)`;
      } else {
        camera.style.transform = `translate3d(0, 0, ${-ringRadius}px) rotateX(${currentSettings.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;
        ring.style.transform = `rotateY(${angle}deg)`;
      }
      for (let index = 0; index < currentSettings.count; index++) {
        const card = cardRefs.current[index];
        if (!card) continue;
        const base = index * currentSettings.step;
        const introLayout = introCard(elapsed, base);
        const cardRadius = ringRadius * introLayout.radius;
        let transform: string;
        if (currentSettings.axis === 'x') transform = `rotateX(${-base}deg) translateZ(${cardRadius}px)`;
        else if (currentSettings.layout.inward) transform = `rotateY(${base}deg) translateZ(${-cardRadius}px)`;
        else {
          transform = `rotateY(${base}deg) translateZ(${cardRadius}px)`;
          if (currentSettings.layout.billboard) transform += ` rotateY(${-(base + angle)}deg)`;
        }
        if (introLayout.lift) transform += currentSettings.axis === 'x' ? ` translateX(${introLayout.lift}px)` : ` translateY(${introLayout.lift}px)`;
        card.style.transform = transform;
        const worldAngle = wrap(base + angle);
        const facing = Math.cos(worldAngle * TO_RAD);
        if (currentSettings.layout.inward) card.style.visibility = Math.abs(worldAngle) > 86 ? 'hidden' : '';
        const fade = currentSettings.depthFade * Math.pow((1 - facing) / 2, 1.25);
        card.style.setProperty('--cc-depth', fade.toFixed(3));
      }
      if (!currentSettings.count) return;
      const index = ((Math.round(-state.angle / currentSettings.step) % currentSettings.count) + currentSettings.count) % currentSettings.count;
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
        onChangeRef.current?.(index);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const currentSettings = settingsRef.current;
      const delta = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60;
      state.last = now;
      const busy = advance(currentSettings, delta, now);
      render(currentSettings, now);
      if (busy && visible && !document.hidden) raf = window.requestAnimationFrame(frame);
      else state.last = 0;
    };
    const wake = () => {
      if (!raf && visible && !document.hidden) raf = window.requestAnimationFrame(frame);
    };
    wakeRef.current = wake;
    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      } else wake();
    };
    const resize = new ResizeObserver(() => { measure(); wake(); });
    resize.observe(root);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        window.cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      }
    });
    observer.observe(root);
    const onWheel = (event: WheelEvent) => {
      const currentSettings = settingsRef.current;
      if (!currentSettings.draggable) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
      if (!delta) return;
      event.preventDefault();
      const perPixel = 180 / (Math.PI * currentSettings.radius * state.fit);
      state.target = null;
      state.angle -= delta * perPixel * (currentSettings.layout.inward ? -1 : 1);
      state.velocity = -delta * perPixel * (currentSettings.layout.inward ? -1 : 1) * 30;
      state.holdUntil = performance.now() + 1600;
      if (state.wheelTimer) window.clearTimeout(state.wheelTimer);
      state.wheelTimer = window.setTimeout(() => {
        if (settingsRef.current.snap) state.target = nearest(state.angle + state.velocity * 0.12);
        wake();
      }, 140);
      wake();
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('visibilitychange', onVisibility);
    measure();
    render(settingsRef.current, performance.now());
    wake();
    return () => {
      window.cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      if (state.wheelTimer) window.clearTimeout(state.wheelTimer);
      root.removeEventListener('wheel', onWheel);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    measureRef.current();
    wakeRef.current();
  }, [radius, cardW, cardH, tiltValue, perspective, preset, captions, count]);

  useEffect(() => { wakeRef.current(); });

  const focusIndex = useCallback((index: number) => {
    const state = stateRef.current;
    const currentSettings = settingsRef.current;
    let target = -index * currentSettings.step;
    target += 360 * Math.round((state.angle - target) / 360);
    state.target = target;
    state.holdUntil = performance.now() + 2800;
    wakeRef.current();
  }, []);
  const stepBy = useCallback((delta: number) => {
    const state = stateRef.current;
    const currentSettings = settingsRef.current;
    const base = state.target ?? Math.round(state.angle / currentSettings.step) * currentSettings.step;
    state.target = base - delta * currentSettings.step * (currentSettings.layout.inward ? -1 : 1);
    state.holdUntil = performance.now() + 2800;
    wakeRef.current();
  }, []);
  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const pointer = stateRef.current.pointer;
    pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
  };
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    state.suppressClick = false;
    if (!draggable || event.button !== 0) return;
    state.press = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: state.angle, moved: false, origin: 0, samples: [{ time: performance.now(), angle: state.angle }] };
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (event.pointerType === 'mouse') { state.pointer.inside = true; updatePointer(event); }
    const press = state.press;
    if (!press || press.id !== event.pointerId) { wakeRef.current(); return; }
    const currentSettings = settingsRef.current;
    const delta = currentSettings.axis === 'x' ? event.clientY - press.y : event.clientX - press.x;
    const cross = currentSettings.axis === 'x' ? event.clientX - press.x : event.clientY - press.y;
    if (!press.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      if (Math.abs(cross) > Math.abs(delta) * 1.2 && event.pointerType !== 'mouse') { state.press = null; return; }
      press.moved = true;
      press.origin = delta;
      state.drag = true;
      state.target = null;
      state.velocity = 0;
      setDragging(true);
      try { rootRef.current?.setPointerCapture(event.pointerId); } catch { /* Safari may reject capture after a lost pointer. */ }
    }
    const perPixel = 180 / (Math.PI * currentSettings.radius * state.fit);
    state.angle = press.angle + (delta - press.origin) * perPixel * (currentSettings.layout.inward ? -1 : 1);
    const now = performance.now();
    press.samples.push({ time: now, angle: state.angle });
    while (press.samples.length > 2 && now - press.samples[0].time > 110) press.samples.shift();
    wakeRef.current();
  };
  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    const press = state.press;
    if (!press || press.id !== event.pointerId) return;
    state.press = null;
    if (!press.moved) return;
    state.drag = false;
    setDragging(false);
    state.suppressClick = true;
    const currentSettings = settingsRef.current;
    const first = press.samples[0];
    const last = press.samples[press.samples.length - 1];
    const span = (last.time - first.time) / 1000;
    const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0;
    state.velocity = velocity;
    if (Math.abs(velocity) > 60) state.dir = Math.sign(velocity);
    const coasting = currentSettings.autoplay === 'drift' && !(currentSettings.pauseOnHover && state.hover && event.pointerType === 'mouse');
    if (currentSettings.snap && !coasting) {
      const tau = 0.18 + currentSettings.momentum * 1.5;
      state.target = Math.round((state.angle + velocity * tau * 0.55) / currentSettings.step) * currentSettings.step;
    }
    wakeRef.current();
  };
  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    stateRef.current.hover = true;
    wakeRef.current();
  };
  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (event.pointerType === 'mouse') { state.hover = false; state.pointer.inside = false; }
    wakeRef.current();
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (state.suppressClick) { state.suppressClick = false; return; }
    const target = event.target;
    if (!(target instanceof Element)) return;
    const card = target.closest('[data-cc-index]');
    if (!card) return;
    const index = Number(card.getAttribute('data-cc-index'));
    if (focusOnClick) focusIndex(index);
    onItemClick?.(list[index], index);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = axis === 'x' ? 'ArrowDown' : 'ArrowRight';
    const backward = axis === 'x' ? 'ArrowUp' : 'ArrowLeft';
    if (event.key === forward) stepBy(1);
    else if (event.key === backward) stepBy(-1);
    else if (event.key === 'Home') focusIndex(0);
    else if (event.key === 'End') focusIndex(count - 1);
    else if ((event.key === 'Enter' || event.key === ' ') && list[activeRef.current]) onItemClick?.(list[activeRef.current], activeRef.current);
    else return;
    event.preventDefault();
  };

  const current = list[active] || list[0];
  const label = current ? current.title || current.alt || `Image ${active + 1}` : '专辑环形展览';
  const renderTile = (item: CircularCarouselItem, tile: Tile, back: boolean, index: number) => {
    const strip = back ? tile.total - 1 - tile.index : tile.index;
    const first = strip === 0;
    const last = strip === tile.total - 1;
    const radiusValue = 'var(--cc-radius)';
    const frameRadius = axis === 'x'
      ? `${first ? radiusValue : 0} ${first ? radiusValue : 0} ${last ? radiusValue : 0} ${last ? radiusValue : 0}`
      : `${first ? radiusValue : 0} ${last ? radiusValue : 0} ${last ? radiusValue : 0} ${first ? radiusValue : 0}`;
    const offset = back ? along - tile.end : tile.start;
    const box: React.CSSProperties = axis === 'x'
      ? { left: -cardW / 2, top: -tile.size / 2, width: cardW, height: tile.size }
      : { left: -tile.size / 2, top: -cardH / 2, width: tile.size, height: cardH };
    const photoStyle: React.CSSProperties = axis === 'x'
      ? { left: 0, top: -offset, width: cardW, height: cardH }
      : { left: -offset, top: 0, width: cardW, height: cardH };
    const flip = axis === 'x' ? ' rotateX(180deg)' : ' rotateY(180deg)';
    const gone = leaving?.items[index];
    return (
      <div key={`${back ? 'b' : 'f'}${tile.index}`} className="circular-carousel__tile" style={{ ...box, transform: tile.move + (back ? flip : '') }} aria-hidden="true">
        <div className="circular-carousel__frame" style={{ height: axis === 'x' ? tile.size : cardH, borderRadius: frameRadius }}>
          <img className="circular-carousel__photo" src={item.src} alt="" draggable={false} decoding="async" style={photoStyle} />
          {gone && leaving && <img key={`leaving-${leaving.id}`} className="circular-carousel__photo circular-carousel__photo--leaving" src={gone.src} alt="" draggable={false} decoding="async" style={{ ...photoStyle, animationDelay: `${Math.round(leaving.delays[index])}ms` }} />}
          {back && <div className="circular-carousel__inner" />}
          <div className="circular-carousel__shade" />
        </div>
      </div>
    );
  };

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className={`circular-carousel ${className}`.trim()}
      style={{ ...style, '--cc-fade': fadeColor, '--cc-radius': `${Math.max(0, cornerRadius)}px`, '--cc-inner': (1 - clamp(innerShade, 0, 1)).toFixed(3) } as React.CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label="王菲专辑环形展览"
      tabIndex={0}
      data-axis={axis}
      data-shape={shape}
      data-ready={ready ? '' : undefined}
      data-draggable={draggable ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="circular-carousel__view">
        <div ref={stageRef} className="circular-carousel__stage">
          <div ref={cameraRef} className="circular-carousel__camera">
            <div ref={ringRef} className="circular-carousel__ring">
              {list.map((item, index) => (
                <div key={item.id || index} ref={element => { cardRefs.current[index] = element; }} className="circular-carousel__card" data-cc-index={index} role="group" aria-roledescription="slide" aria-label={`${item.title || item.alt || `Image ${index + 1}`}, ${index + 1} of ${count}`}>
                  {tiles.map(tile => renderTile(item, tile, false, index))}
                  {layout.backfaces && tiles.map(tile => renderTile(item, tile, true, index))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {captions && current && (
        <div className="circular-carousel__caption" aria-hidden="true">
          <span key={active} className="circular-carousel__title">{current.title || current.alt}{current.subtitle && <span className="circular-carousel__subtitle">{current.subtitle}</span>}</span>
          <span className="circular-carousel__count"><Digits value={active + 1} /><span className="circular-carousel__slash">/</span><span>{String(count).padStart(2, '0')}</span></span>
        </div>
      )}
      <div className="circular-carousel__live" aria-live="polite" aria-atomic="true">{`${label}, ${active + 1} of ${count}`}</div>
    </div>
  );
};

export default CircularCarousel;