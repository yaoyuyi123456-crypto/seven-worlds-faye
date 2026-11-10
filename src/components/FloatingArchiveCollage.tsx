import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type ArchiveCollageScene = 'home' | 'holiday' | 'passenger' | 'tumi' | 'hypnosis' | 'sanpo' | 'drop' | 'love';

interface FloatingArchiveCollageProps {
  scene: ArchiveCollageScene;
  pointerX?: number;
  pointerY?: number;
}

const collageImages: Record<ArchiveCollageScene, [string, string, string]> = {
  home: [
    '/assets/aistudio/IMG_0958_cbaff56a.JPG',
    '/assets/aistudio/IMG_1624_ebcad229.JPG',
    '/assets/aistudio/IMG_5419_b796a387.jpeg'
  ],
  holiday: [
    '/assets/aistudio/IMG_0958_cbaff56a.JPG',
    '/assets/aistudio/IMG_5419_b796a387.jpeg',
    '/assets/aistudio/IMG_5420_3984ad28.jpeg'
  ],
  passenger: [
    '/assets/aistudio/IMG_1638_159f9005.JPG',
    '/assets/aistudio/IMG_1635_0a3cc105.jpg',
    '/assets/aistudio/IMG_1644_6e1bd031.JPG'
  ],
  tumi: [
    '/assets/aistudio/IMG_1624_ebcad229.JPG',
    '/assets/aistudio/IMG_1647_6ac420d2.JPG',
    '/assets/aistudio/IMG_1634_002e42c6.JPG'
  ],
  hypnosis: [
    '/assets/aistudio/IMG_5412_34ca1f0a.jpeg',
    '/assets/aistudio/IMG_5410_b15c8573.jpeg',
    '/assets/aistudio/IMG_5411_6b9d0810.jpeg'
  ],
  sanpo: [
    '/assets/aistudio/IMG_5408_ae3f79f2.jpeg',
    '/assets/aistudio/IMG_5419_b796a387.jpeg',
    '/assets/aistudio/IMG_5420_3984ad28.jpeg'
  ],
  drop: [
    '/assets/aistudio/IMG_5408_ae3f79f2.jpeg',
    '/assets/aistudio/IMG_5431_cbb33e5c.jpeg',
    '/assets/aistudio/IMG_1624_ebcad229.JPG'
  ],
  love: [
    '/assets/aistudio/IMG_5432_ee2874af.jpeg',
    '/assets/aistudio/IMG_5433_98f82a21.jpeg',
    '/assets/aistudio/IMG_5425_cfee52d4.png'
  ]
};

const stars = [
  { x: '18%', y: '22%', color: '#f5dc45', size: 31, rotate: '-13deg' },
  { x: '81%', y: '18%', color: '#f08cce', size: 23, rotate: '8deg' },
  { x: '72%', y: '75%', color: '#f5dc45', size: 19, rotate: '19deg' },
  { x: '10%', y: '72%', color: '#f08cce', size: 16, rotate: '-21deg' }
];

export const FloatingArchiveCollage: React.FC<FloatingArchiveCollageProps> = ({
  scene,
  pointerX = 0,
  pointerY = 0
}) => {
  const images = collageImages[scene];
  const reduceMotion = useReducedMotion();

  return (
    <div className={`archive-collage archive-collage--${scene}`} aria-hidden="true">
      <div className="archive-cloudwash" />
      {images.map((src, index) => {
        const depth = [0.5, -0.3, 0.72][index];
        const baseRotation = [-5, 3, 7][index];
        return (
          <div
            key={src}
            className={`archive-fragment archive-fragment--${index + 1}`}
            style={{ transform: `translate3d(${pointerX * depth}px, ${pointerY * depth}px, 0)` }}
          >
            <motion.img
              src={src}
              alt=""
              initial={false}
              animate={reduceMotion ? { y: 0, rotate: baseRotation } : { y: [0, index === 1 ? 10 : -8, 0], rotate: [baseRotation, baseRotation + 1.8, baseRotation] }}
              transition={{ duration: 9 + index * 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.7 }}
              draggable={false}
            />
          </div>
        );
      })}

      <div className="archive-cd" />
      <div className="archive-label archive-label--top">FAYE / ARCHIVE 97</div>
      <div className="archive-label archive-label--side">PRIVATE VIEW · 1995—2003</div>
      {stars.map((star, index) => (
        <span
          key={index}
          className="archive-star"
          style={{
            left: star.x,
            top: star.y,
            backgroundColor: star.color,
            width: star.size,
            height: star.size,
            transform: `rotate(${star.rotate})`
          }}
        />
      ))}
      <span className="archive-pencil-note">记忆有自己的天气</span>
    </div>
  );
};
