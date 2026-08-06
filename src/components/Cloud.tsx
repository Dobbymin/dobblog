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
          viewBox='0 0 2034 528'
        >
          <path
            d='M0 118C73 114 117 153 162 201C203 171 255 152 319 165C405 181 469 235 514 245C562 214 627 188 701 191C798 194 866 248 916 298C962 266 1035 257 1111 264C1211 272 1266 329 1314 327C1376 216 1512 143 1729 146C1803 146 1870 178 1932 217C1962 191 2002 180 2034 180V528H0V118Z'
            fill='var(--color-cloud-400)'
          />
          <path
            d='M0 234C102 244 168 316 215 360C230 375 244 367 262 350C372 307 493 289 610 309C699 324 760 371 827 384C875 349 952 332 1031 338C1122 344 1179 387 1225 390C1275 301 1391 274 1485 279C1544 282 1598 305 1641 325C1705 272 1804 251 1901 260C1952 264 1997 260 2034 252V528H0V234Z'
            fill='var(--color-cloud-300)'
          />
          <path
            d='M0 233C94 243 159 303 209 357C223 372 239 366 262 349C372 307 493 289 610 309C804 342 983 471 1104 515C1114 519 1124 518 1135 512C1270 431 1450 424 1607 473C1650 487 1661 491 1673 488C1701 461 1718 390 1751 339C1792 274 1855 242 1935 241C1970 240 2005 241 2034 240V528H0V233Z'
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
