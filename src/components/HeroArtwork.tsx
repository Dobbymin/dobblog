const pixelPositions = [
  [8, 72],
  [11, 65],
  [14, 59],
  [17, 52],
  [20, 46],
  [23, 40],
  [26, 35],
  [31, 28],
  [35, 23],
  [39, 19],
  [44, 16],
  [49, 14],
  [54, 15],
  [59, 17],
  [64, 20],
  [69, 24],
  [73, 29],
  [77, 35],
  [80, 42],
  [83, 49],
  [86, 57],
  [89, 65],
  [92, 73],
  [22, 76],
  [27, 68],
  [32, 61],
  [37, 55],
  [42, 51],
  [47, 49],
  [52, 50],
  [57, 52],
  [62, 56],
  [67, 62],
  [72, 69],
  [77, 77],
];

type HeroArtworkProps = {
  variant?: 'hero' | 'footer';
};

export function HeroArtwork({ variant = 'hero' }: HeroArtworkProps) {
  return (
    <div
      aria-hidden='true'
      className={`hero-artwork ${variant === 'footer' ? 'footer-artwork' : ''}`}
    >
      {variant === 'hero' && <svg className='pixel-arc' viewBox='0 0 100 100'>
        {pixelPositions.map(([x, y], index) => (
          <rect
            fill={`url(#pixel-gradient-${index % 3})`}
            height='2.7'
            key={`${x}-${y}`}
            rx='.35'
            transform={`rotate(${index % 2 ? -13 : 13} ${x} ${y})`}
            width='2.7'
            x={x}
            y={y}
          />
        ))}
        <defs>
          <linearGradient id='pixel-gradient-0' x1='0' x2='1' y1='0' y2='1'>
            <stop stopColor='#2c3998' />
            <stop offset='1' stopColor='#6c2de6' />
          </linearGradient>
          <linearGradient id='pixel-gradient-1' x1='0' x2='1' y1='0' y2='1'>
            <stop stopColor='#6c2de6' />
            <stop offset='1' stopColor='#de41b8' />
          </linearGradient>
          <linearGradient id='pixel-gradient-2' x1='0' x2='1' y1='0' y2='1'>
            <stop stopColor='#de41b8' />
            <stop offset='1' stopColor='#ff6d77' />
          </linearGradient>
        </defs>
      </svg>}
      <div className='mascot'>
        <div className='mascot-hair' />
        <div className='mascot-face'>
          <span className='mascot-eye mascot-eye-left' />
          <span className='mascot-eye mascot-eye-right' />
          <span className='mascot-cheek mascot-cheek-left' />
          <span className='mascot-cheek mascot-cheek-right' />
          <span className='mascot-mouth' />
        </div>
        <div className='mascot-sweater'>
          <span />
        </div>
        <div className='mascot-legs'>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
