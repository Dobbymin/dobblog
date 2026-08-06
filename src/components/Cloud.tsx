type CloudLayer = {
  color: string;
};

type CloudProps = {
  height?: string;
  viewBoxHeight?: number;
  ariaHidden?: boolean;
  layers?: [CloudLayer, CloudLayer, CloudLayer];
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
    </section>
  );
};
