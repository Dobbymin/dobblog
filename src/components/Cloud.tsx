type CloudLayer = {
  color: string;
};

type CloudProps = {
  height?: string;
  ariaHidden?: boolean;
  layers?: [CloudLayer, CloudLayer, CloudLayer];
  scaleY?: number;
};

type CloudPathLayer = CloudLayer & {
  start: number;
  gaps: number[];
  ys: number[];
};

function buildPath(pts: [number, number][], vbH: number): string {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const s = x1 - x0;
    // Descending control points: [0.66, 0.80].
    const [r1, r2] = y1 > y0 ? [0.66, 0.8] : [0.14, 0.32];
    d += ` C ${x0 + s * r1} ${y0} ${x0 + s * r2} ${y1} ${x1} ${y1}`;
  }
  const lastX = pts[pts.length - 1][0];
  const firstX = pts[0][0];
  d += ` L ${lastX} ${vbH} L ${firstX} ${vbH} Z`;
  return d;
}

function mk(start: number, gaps: number[], ys: number[]): [number, number][] {
  const pts: [number, number][] = [];
  let x = start;
  for (let i = 0; i < ys.length; i++) {
    pts.push([x, ys[i]]);
    x += gaps[i % gaps.length];
  }
  return pts;
}

const defaultLayers: CloudPathLayer[] = [
  {
    color: 'var(--color-cloud-500)',
    start: -120,
    gaps: [
      268, 196, 241, 175, 254, 208, 231, 186, 262, 149, 238, 203, 177, 249, 164,
      226,
    ],
    ys: [
      148, 62, 132, 78, 155, 55, 140, 88, 126, 68, 158, 72, 135, 58, 146, 84,
      130, 66, 152, 74, 138, 60, 144, 80, 128, 70, 150, 64,
    ],
  },
  {
    color: 'var(--color-cloud-300)',
    start: -180,
    gaps: [
      225, 262, 188, 247, 206, 271, 164, 238, 215, 253, 179, 244, 197, 230, 168,
      258,
    ],
    ys: [
      222, 140, 238, 158, 215, 128, 232, 165, 208, 145, 242, 152, 218, 134, 235,
      160, 225, 148, 240, 155, 212, 138, 228, 168, 220, 142, 236, 150,
    ],
  },
  {
    color: 'var(--color-background)',
    start: -90,
    gaps: [
      248, 192, 265, 171, 239, 257, 183, 244, 212, 268, 158, 235, 201, 251, 176,
      229,
    ],
    ys: [
      305, 225, 318, 242, 298, 215, 312, 248, 302, 232, 322, 238, 295, 220, 315,
      245, 308, 228, 320, 235, 300, 218, 310, 250, 304, 224, 316, 240,
    ],
  },
];

export const Cloud = ({
  height = '357px',
  ariaHidden = true,
  layers,
  scaleY = 1,
}: CloudProps) => {
  return (
    <section
      aria-hidden={ariaHidden}
      className='relative isolate'
      style={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage:
          'linear-gradient(to bottom, var(--color-sky-from), var(--color-sky-to))',
        height,
      }}
    >
      <svg
        viewBox='0 0 5120 357'
        preserveAspectRatio='none'
        aria-hidden={ariaHidden}
        style={{
          width: 'min(5120px, 670vw)',
          minWidth: 'min(5120px, 670vw)',
          height: '100%',
          display: 'block',
          flex: 'none',
        }}
      >
        {defaultLayers.map(({ color, gaps, start, ys }, index) => (
          <path
            key={color}
            d={buildPath(
              mk(
                start,
                gaps,
                ys.map((y) => y * scaleY),
              ),
              357,
            )}
            fill={layers?.[index]?.color ?? color}
          />
        ))}
      </svg>
    </section>
  );
};
