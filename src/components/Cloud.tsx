type CloudLayer = {
  color: string;
};

type CloudProps = {
  height?: string;
  viewBoxHeight?: number;
  ariaHidden?: boolean;
  layers?: [CloudLayer, CloudLayer, CloudLayer];
  variant?: 'default' | 'home';
};

type CloudEllipseLayer = CloudLayer & {
  baseY: number;
  start: number;
  gaps: number[];
  sizes: [number, number][];
  rectHeight: number;
};

const defaultLayers: CloudEllipseLayer[] = [
  {
    color: 'var(--color-cloud-500)',
    baseY: 250,
    start: -180,
    gaps: [268, 196, 242, 178, 255, 210, 232],
    sizes: [
      [185, 161],
      [122, 106],
      [168, 146],
      [140, 122],
      [196, 170],
      [112, 98],
      [176, 153],
      [132, 115],
      [190, 165],
      [118, 103],
      [162, 141],
      [146, 127],
      [182, 158],
      [126, 110],
    ],
    rectHeight: 107,
  },
  {
    color: 'var(--color-cloud-300)',
    baseY: 302,
    start: -180,
    gaps: [232, 278, 204, 256, 222, 290, 238],
    sizes: [
      [172, 150],
      [201, 175],
      [138, 120],
      [186, 162],
      [152, 132],
      [212, 184],
      [144, 125],
      [178, 155],
      [164, 143],
      [196, 171],
      [130, 113],
      [190, 165],
      [156, 136],
      [206, 179],
    ],
    rectHeight: 55,
  },
  {
    color: 'var(--color-background)',
    baseY: 362,
    start: -180,
    gaps: [258, 306, 222, 282, 240, 318, 266],
    sizes: [
      [230, 200],
      [158, 138],
      [212, 184],
      [176, 153],
      [244, 212],
      [148, 129],
      [220, 191],
      [190, 165],
      [166, 144],
      [236, 205],
      [142, 124],
      [204, 177],
      [182, 158],
      [226, 196],
    ],
    rectHeight: 195,
  },
];

export const Cloud = ({
  height = '357px',
  viewBoxHeight = 357,
  ariaHidden = true,
  layers,
  variant = 'default',
}: CloudProps) => {
  const verticalScale = viewBoxHeight / 357;

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
      {variant === 'home' ? (
        <svg
          aria-hidden={ariaHidden}
          preserveAspectRatio='none'
          style={{ display: 'block', height: '100%', width: '100%' }}
          viewBox='0 0 1440 506'
        >
          <path
            d='M0 165C74 193 103 170 155 171C208 172 246 213 286 249C339 230 412 221 468 263C514 297 545 322 594 320C670 233 797 234 898 280C973 315 1009 363 1057 360C1103 255 1196 241 1285 279C1347 244 1396 207 1440 194V506H0V165Z'
            fill='var(--color-cloud-400)'
          />
          <path
            d='M0 265C105 260 198 299 274 355C339 317 410 295 497 319C574 341 614 386 672 387C732 304 851 293 938 338C1005 372 1048 420 1094 407C1152 287 1283 242 1440 304V506H0V265Z'
            fill='var(--color-cloud-300)'
          />
          <path
            d='M0 289C147 258 337 272 443 328C548 384 624 490 701 476C789 458 843 400 954 413C1062 424 1169 470 1261 459C1342 449 1395 405 1440 411V506H0V289Z'
            fill='var(--background)'
          />
        </svg>
      ) : (
        <svg
          viewBox={`0 0 2000 ${viewBoxHeight}`}
          preserveAspectRatio='none'
          aria-hidden={ariaHidden}
          style={{
            width: 'max(100%, min(2000px, 500vw))',
            minWidth: 'min(2000px, 500vw)',
            height: '100%',
            display: 'block',
            flex: 'none',
          }}
        >
          {defaultLayers.map(
            ({ baseY, color, gaps, rectHeight, sizes, start }, index) => {
              let cx = start;
              const fill = layers?.[index]?.color ?? color;

              return (
                <g key={color} fill={fill}>
                  {sizes.map(([rx, ry], ellipseIndex) => {
                    const currentCx = cx;
                    cx += gaps[ellipseIndex % gaps.length];

                    return (
                      <ellipse
                        key={`${currentCx}-${rx}-${ry}`}
                        cx={currentCx}
                        cy={baseY * verticalScale}
                        rx={rx}
                        ry={ry * verticalScale}
                      />
                    );
                  })}
                  <rect
                    x={-180}
                    y={baseY * verticalScale}
                    width={2360}
                    height={rectHeight}
                  />
                </g>
              );
            },
          )}
        </svg>
      )}
    </section>
  );
};
